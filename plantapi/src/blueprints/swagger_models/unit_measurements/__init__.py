# src.blueprints.swagger_models/unit_measurements/__init__.py
from flask_restx import Namespace, fields

namespaceUnitMeasurement = Namespace("unit_measurement", "unit measurement endpoints")

unit_measurement_model = namespaceUnitMeasurement.model(
    "UnitMeasurement",
    {
        "id": fields.Integer(readonly=True, description="Unit measurement identifier"),
        "unit": fields.String(required=True, description="Unit measurement symbol"),
    },
)
