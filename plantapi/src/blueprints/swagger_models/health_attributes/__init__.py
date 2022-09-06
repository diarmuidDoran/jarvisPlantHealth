# src.blueprints.swagger_models/health_attributes/__init__.py
from flask_restx import Namespace, fields

namespaceHealthAttribute = Namespace("health_attributes", "health attribute endpoints")

health_attribute_model = namespaceHealthAttribute.model(
    "HealthAttributes",
    {
        "id": fields.Integer(readonly=True, description="Health Attribute identifier"),
        "name": fields.String(required=True, description="Health Attribute name"),
    },
)
