from datetime import datetime
from email.message import EmailMessage
from html import escape
import os
import smtplib

from flask import request
from flask_smorest import Blueprint, abort
from marshmallow import ValidationError
from werkzeug.exceptions import HTTPException
from werkzeug.utils import secure_filename

from schemas.mail_schema import JobApplicationSchema, MailSchema

mail_bp = Blueprint("mail", __name__, url_prefix="/api", description="Endpoints para envio de correos")

SITE_TAGLINE = "Consultoria integral empresarial"
SITE_URL = os.getenv("SITE_URL", "https://habitatempresarial.com").rstrip("/")
BRAND_LOGO_URL = os.getenv("BRAND_LOGO_URL", f"{SITE_URL}/images/logo_nube.png")
MAX_CV_BYTES = int(os.getenv("MAX_CV_BYTES", 5 * 1024 * 1024))


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


def _ensure_mail_config(mail_config):
    if not mail_config["email_address"] or not mail_config["email_password"]:
        abort(500, message="Faltan EMAIL_ADDRESS o EMAIL_PASSWORD en la configuracion del servidor")


def _send_message(msg, mail_config):
    with smtplib.SMTP(mail_config["smtp_server"], mail_config["smtp_port"]) as smtp:
        smtp.starttls()
        smtp.login(mail_config["email_address"], mail_config["email_password"])
        smtp.send_message(msg)


def _build_summary_card(label, value, href=None, accent=False):
    text_color = "#2563eb" if accent else "#0f172a"
    safe_label = _escape_text(label)
    safe_value = value or "No especificado"
    content = (
        f'<a href="{escape(href, quote=True)}" '
        f'style="color: {text_color}; text-decoration: none; font-weight: 700;">{safe_value}</a>'
        if href
        else f'<span style="color: {text_color}; font-weight: 700;">{safe_value}</span>'
    )
    return f"""
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border: 1px solid #d9e5f4; border-radius: 16px;">
            <tr>
                <td style="padding: 18px 20px;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; line-height: 1.4; font-weight: 800; text-transform: uppercase; letter-spacing: 0.16em; color: #64748b;">{safe_label}</p>
                    <div style="font-size: 16px; line-height: 1.5;">{content}</div>
                </td>
            </tr>
        </table>
    """


def _build_cards_grid(summary_cards):
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

    return cards_html


def _build_email_shell(title, eyebrow, description, body_html, current_year):
    return f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{_escape_text(title)}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #eef4fb; font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 700px; margin: 0 auto;">
        <tr>
            <td>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="overflow: hidden; border-radius: 24px; background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 52%, #2563eb 100%); box-shadow: 0 24px 64px rgba(15, 23, 42, 0.16);">
                    <tr>
                        <td style="padding: 26px 30px 0 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="right" valign="middle" style="font-size: 11px; line-height: 1.4; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.76);">
                                        Habitat Empresarial
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 28px 30px 34px 30px;">
                            <p style="margin: 0 0 14px 0; font-size: 11px; line-height: 1.4; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase; color: #bfdbfe;">{_escape_text(eyebrow)}</p>
                            <h1 style="margin: 0; font-size: 34px; line-height: 1.08; font-weight: 800; letter-spacing: -0.03em; color: #ffffff;">{_escape_text(title)}</h1>
                            <p style="margin: 18px 0 0 0; max-width: 520px; font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.82);">
                                {_escape_text(description)}
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td style="padding-top: 20px;">
                {body_html}
            </td>
        </tr>

        <tr>
            <td style="padding: 16px 8px 0 8px; text-align: center;">
                <p style="margin: 0 0 6px 0; font-size: 12px; line-height: 1.6; color: #64748b;">Enviado automaticamente desde la web</p>
                <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #94a3b8;">&copy; {current_year} Habitat Empresarial. Todos los derechos reservados.</p>
            </td>
        </tr>
    </table>
</body>
</html>
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

    body_html = f"""
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%); border: 1px solid #d9e5f4; border-radius: 24px; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);">
            <tr>
                <td style="padding: 28px 28px 12px 28px;">
                    <p style="margin: 0 0 6px 0; font-size: 12px; line-height: 1.4; font-weight: 800; text-transform: uppercase; letter-spacing: 0.16em; color: #2563eb;">Formulario de contactenos</p>
                    <h2 style="margin: 0; font-size: 24px; line-height: 1.15; font-weight: 800; letter-spacing: -0.02em; color: #0f172a;">Datos enviados desde la web</h2>
                </td>
            </tr>
            <tr>
                <td style="padding: 8px 28px 8px 28px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        {_build_cards_grid(summary_cards)}
                    </table>
                </td>
            </tr>
            <tr>
                <td style="padding: 8px 28px 28px 28px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fbff; border: 1px solid #d9e5f4; border-radius: 18px;">
                        <tr>
                            <td style="padding: 22px 22px 18px 22px;">
                                <p style="margin: 0 0 10px 0; font-size: 12px; line-height: 1.4; font-weight: 800; text-transform: uppercase; letter-spacing: 0.16em; color: #64748b;">Mensaje</p>
                                <div style="font-size: 15px; line-height: 1.8; color: #334155;">{_format_message_html(mensaje)}</div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    """

    return _build_email_shell(
        "Nueva consulta",
        SITE_TAGLINE,
        "Has recibido un nuevo mensaje desde el formulario principal del sitio web.",
        body_html,
        current_year,
    )


def _build_job_application_email_html(nombre, telefono, email, mensaje, cv_filename, current_year):
    summary_cards = [
        _build_summary_card("Postulante", nombre),
        _build_summary_card("Email", email, href=f"mailto:{email}", accent=True),
        _build_summary_card("Telefono", telefono, href=f"tel:{telefono}" if telefono else None),
        _build_summary_card("CV adjunto", _escape_text(cv_filename), accent=True),
    ]

    message_block = (
        _format_message_html(mensaje)
        if mensaje
        else '<span style="color: #64748b;">No se especifico area de interes.</span>'
    )

    body_html = f"""
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%); border: 1px solid #d9e5f4; border-radius: 24px; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);">
            <tr>
                <td style="padding: 28px 28px 12px 28px;">
                    <p style="margin: 0 0 6px 0; font-size: 12px; line-height: 1.4; font-weight: 800; text-transform: uppercase; letter-spacing: 0.16em; color: #2563eb;">Bolsa de empleo</p>
                    <h2 style="margin: 0; font-size: 24px; line-height: 1.15; font-weight: 800; letter-spacing: -0.02em; color: #0f172a;">Nueva postulacion recibida</h2>
                </td>
            </tr>
            <tr>
                <td style="padding: 8px 28px 8px 28px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        {_build_cards_grid(summary_cards)}
                    </table>
                </td>
            </tr>
            <tr>
                <td style="padding: 8px 28px 28px 28px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fbff; border: 1px solid #d9e5f4; border-radius: 18px;">
                        <tr>
                            <td style="padding: 22px 22px 18px 22px;">
                                <p style="margin: 0 0 10px 0; font-size: 12px; line-height: 1.4; font-weight: 800; text-transform: uppercase; letter-spacing: 0.16em; color: #64748b;">Mensaje / Area de interes</p>
                                <div style="font-size: 15px; line-height: 1.8; color: #334155;">{message_block}</div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    """

    return _build_email_shell(
        "Nueva postulacion",
        SITE_TAGLINE,
        "Has recibido una solicitud desde la seccion Bolsa de empleo. El CV se adjunta en este correo.",
        body_html,
        current_year,
    )


def _validate_pdf_upload(file_storage):
    if not file_storage or not file_storage.filename:
        abort(400, message="Debes adjuntar tu CV en formato PDF")

    filename = secure_filename(file_storage.filename)
    if not filename.lower().endswith(".pdf"):
        abort(400, message="El CV debe ser un archivo PDF")

    file_bytes = file_storage.read()
    file_storage.seek(0)

    if not file_bytes:
        abort(400, message="El archivo PDF esta vacio")

    if len(file_bytes) > MAX_CV_BYTES:
        max_mb = MAX_CV_BYTES // (1024 * 1024)
        abort(413, message=f"El CV no debe superar {max_mb} MB")

    if not file_bytes.startswith(b"%PDF-"):
        abort(400, message="El archivo adjunto no parece ser un PDF valido")

    return filename, file_bytes


@mail_bp.route("/send-email", methods=["POST"])
@mail_bp.arguments(MailSchema)
@mail_bp.response(200, description="Correo enviado correctamente")
def send_email(data):
    """
    Enviar correo de contacto desde el sitio web de Habitat
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
        _ensure_mail_config(mail_config)

        msg = EmailMessage()
        msg["Subject"] = f"Nueva consulta web - {nombre}"
        msg["From"] = mail_config["mail_sender"]
        msg["To"] = mail_config["mail_recipient"]
        msg["Reply-To"] = email

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

        _send_message(msg, mail_config)

        return {"success": True, "message": "Correo enviado correctamente"}

    except HTTPException:
        raise
    except Exception as e:
        print("Error al enviar correo:", repr(e))
        abort(500, message=f"No se pudo enviar el correo: {str(e)}")


@mail_bp.route("/send-job-application", methods=["POST"])
@mail_bp.response(200, description="Postulacion enviada correctamente")
def send_job_application():
    """
    Enviar postulacion de Bolsa de empleo con CV PDF adjunto
    """

    try:
        data = JobApplicationSchema().load(request.form.to_dict())
    except ValidationError as error:
        abort(400, message="Datos invalidos", errors=error.messages)

    nombre = (data.get("nombre") or "").strip()
    telefono = (data.get("telefono") or "").strip()
    email = (data.get("email") or "").strip()
    mensaje = (data.get("mensaje") or "").strip()
    cv_filename, cv_bytes = _validate_pdf_upload(request.files.get("cv"))

    telefono_text = telefono or "No especificado"
    mensaje_text = mensaje or "No especificado"
    mail_config = _get_mail_config()
    current_year = datetime.now().year

    try:
        _ensure_mail_config(mail_config)

        msg = EmailMessage()
        msg["Subject"] = f"Nueva postulacion - {nombre}"
        msg["From"] = mail_config["mail_sender"]
        msg["To"] = mail_config["mail_recipient"]
        msg["Reply-To"] = email

        msg.set_content(
            f"""
Nueva postulacion recibida

Nombre: {nombre}
Telefono: {telefono_text}
Email: {email}
Mensaje / Area de interes: {mensaje_text}
CV adjunto: {cv_filename}

Notificacion automatica - Bolsa de empleo
"""
        )

        msg.add_alternative(
            _build_job_application_email_html(
                _escape_text(nombre),
                _escape_text(telefono),
                _escape_text(email),
                mensaje,
                cv_filename,
                current_year,
            ),
            subtype="html",
        )

        msg.add_attachment(
            cv_bytes,
            maintype="application",
            subtype="pdf",
            filename=cv_filename,
        )

        _send_message(msg, mail_config)

        return {"success": True, "message": "Postulacion enviada correctamente"}

    except HTTPException:
        raise
    except Exception as e:
        print("Error al enviar postulacion:", repr(e))
        abort(500, message=f"No se pudo enviar la postulacion: {str(e)}")
