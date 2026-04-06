from flask_smorest import Blueprint, abort
import smtplib
from email.message import EmailMessage
from schemas.mail_schema import MailSchema
import os
from datetime import datetime
from html import escape

mail_bp = Blueprint("mail", __name__, url_prefix="/api", description="Endpoints para envio de correos")

SITE_TAGLINE = "Consultoria integral empresarial"


def _get_mail_config():
    email_address = os.getenv("EMAIL_ADDRESS")
    email_password = os.getenv("EMAIL_PASSWORD")

    return {
        "email_address": email_address,
        "email_password": email_password,
        "smtp_server": os.getenv("SMTP_SERVER", "smtp.gmail.com"),
        "smtp_port": int(os.getenv("SMTP_PORT", 587)),
        "mail_sender": os.getenv("MAIL_SENDER", email_address),
        "mail_recipient": os.getenv("MAIL_RECIPIENT", "haylandsebastian5@gmail.com"),
    }


def _escape_text(value):
    return escape((value or "").strip())


def _format_message_html(value):
    sanitized = _escape_text(value)
    return sanitized.replace("\n", "<br>")


def _build_summary_card(label, value, href=None, accent=False):
    text_color = "#2563eb" if accent else "#0f172a"
    content = (
        f'<a href="{escape(href, quote=True)}" '
        f'style="color: {text_color}; text-decoration: none; font-weight: 700;">{value}</a>'
        if href
        else f'<span style="color: {text_color}; font-weight: 700;">{value}</span>'
    )
    return f"""
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border: 1px solid #d9e5f4; border-radius: 18px;">
            <tr>
                <td style="padding: 18px 20px;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; line-height: 1.4; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; color: #64748b;">{label}</p>
                    <div style="font-size: 16px; line-height: 1.5;">{content}</div>
                </td>
            </tr>
        </table>
    """


def _build_contact_email_html(nombre, empresa, telefono, email, mensaje, current_year):
    summary_cards = [
        _build_summary_card("Nombre", nombre),
        _build_summary_card("Email", email, href=f"mailto:{email}", accent=True),
    ]

    if empresa:
        summary_cards.append(_build_summary_card("Empresa", empresa))

    if telefono:
        summary_cards.append(_build_summary_card("Telefono", telefono, href=f"tel:{telefono}"))

    cards_html = ""
    for index, card in enumerate(summary_cards):
        if index % 2 == 0:
            cards_html += "<tr>"
        cards_html += (
            f'<td width="50%" valign="top" style="padding: 0 0 16px 0; '
            f'padding-right: {"8px" if index % 2 == 0 else "0"}; '
            f'padding-left: {"0" if index % 2 == 0 else "8px"};">{card}</td>'
        )
        if index % 2 == 1:
            cards_html += "</tr>"

    if len(summary_cards) % 2 == 1:
        cards_html += '<td width="50%" valign="top" style="padding: 0 0 16px 8px;"></td></tr>'

    return f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva consulta web</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #eef4fb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0f172a;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 680px; margin: 0 auto;">
        <tr>
            <td>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="overflow: hidden; border-radius: 28px; background: linear-gradient(180deg, #0b1932 0%, #102344 52%, #17365f 100%); box-shadow: 0 24px 64px rgba(15, 23, 42, 0.16);">
                    <tr>
                        <td style="padding: 18px 28px 0 28px;">
                            <div style="height: 1px; background: linear-gradient(90deg, rgba(255,255,255,0.12), rgba(59,130,246,0.5), rgba(255,255,255,0.12));"></div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 34px 28px 20px 28px;">
                            <p style="margin: 0 0 14px 0; font-size: 11px; line-height: 1.4; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #60a5fa;">{SITE_TAGLINE}</p>
                            <h1 style="margin: 0; font-size: 34px; line-height: 1.08; font-weight: 800; letter-spacing: -0.03em; color: #ffffff;">Nueva consulta</h1>
                            <p style="margin: 18px 0 0 0; max-width: 480px; font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.8);">
                                Has recibido un nuevo mensaje desde el formulario principal del sitio web.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td style="padding-top: 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%); border: 1px solid #d9e5f4; border-radius: 28px; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);">
                    <tr>
                        <td style="padding: 28px 28px 12px 28px;">
                            <p style="margin: 0 0 6px 0; font-size: 12px; line-height: 1.4; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; color: #2563eb;">Resumen del contacto</p>
                            <h2 style="margin: 0; font-size: 24px; line-height: 1.15; font-weight: 800; letter-spacing: -0.02em; color: #0f172a;">Datos enviados desde la web</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 28px 8px 28px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                {cards_html}
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 28px 28px 28px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fbff; border: 1px solid #d9e5f4; border-radius: 22px;">
                                <tr>
                                    <td style="padding: 22px 22px 18px 22px;">
                                        <p style="margin: 0 0 10px 0; font-size: 12px; line-height: 1.4; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; color: #64748b;">Mensaje</p>
                                        <div style="font-size: 15px; line-height: 1.8; color: #334155;">{_format_message_html(mensaje)}</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td style="padding: 16px 8px 0 8px; text-align: center;">
                <p style="margin: 0 0 6px 0; font-size: 12px; line-height: 1.6; color: #64748b;">Enviado automaticamente desde la web </p>
                <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #94a3b8;">&copy; {current_year} L&M Habitat. Todos los derechos reservados.</p>
            </td>
        </tr>
    </table>
</body>
</html>
    """


@mail_bp.route("/send-email", methods=["POST"])
@mail_bp.arguments(MailSchema)
@mail_bp.response(200, description="Correo enviado correctamente")
def send_email(data):
    """
    Enviar correo de contacto desde el sitio web de L&M Habitat
    """

    nombre = (data.get("nombre") or "").strip()
    empresa = (data.get("empresa") or "").strip()
    telefono = (data.get("telefono") or "").strip()
    email = (data.get("email") or "").strip()
    mensaje = (data.get("mensaje") or "").strip()

    empresa_text = empresa or "No especificada"
    telefono_text = telefono or "No especificado"
    mail_config = _get_mail_config()

    current_year = datetime.now().year

    try:
        if not mail_config["email_address"] or not mail_config["email_password"]:
            abort(500, message="Faltan EMAIL_ADDRESS o EMAIL_PASSWORD en la configuracion del servidor")

        msg = EmailMessage()
        msg["Subject"] = f"Nueva consulta web - {nombre}"
        msg["From"] = mail_config["mail_sender"]
        msg["To"] = mail_config["mail_recipient"]
        msg["Reply-To"] = email

        # ----------- PLAIN TEXT -----------
        msg.set_content(
            f"""
Nueva consulta recibida

Nombre: {nombre}
Empresa: {empresa_text}
Telefono: {telefono_text}
Email: {email}
Mensaje: {mensaje}

Notificacion automatica - Web
"""
        )

        # ----------- HTML -----------
        msg.add_alternative(
            _build_contact_email_html(
                _escape_text(nombre),
                _escape_text(empresa),
                _escape_text(telefono),
                _escape_text(email),
                mensaje,
                current_year,
            ),
            subtype="html",
        )

        # ----------- ENVIO DEL CORREO -----------
        with smtplib.SMTP(mail_config["smtp_server"], mail_config["smtp_port"]) as smtp:
            smtp.starttls()
            smtp.login(mail_config["email_address"], mail_config["email_password"])
            smtp.send_message(msg)

        return {"success": True, "message": "Correo enviado correctamente"}

    except Exception as e:
        print("Error al enviar correo:", repr(e))
        abort(500, message=f"No se pudo enviar el correo: {str(e)}")
