from marshmallow import Schema, fields

class MailSchema(Schema):
    nombre = fields.String(required=True)
    empresa = fields.String(allow_none=True)
    telefono = fields.String(allow_none=True)
    email = fields.Email(required=True)
    mensaje = fields.String(required=True)


class JobApplicationSchema(Schema):
    nombre = fields.String(required=True)
    telefono = fields.String(allow_none=True)
    email = fields.Email(required=True)
    mensaje = fields.String(allow_none=True)
