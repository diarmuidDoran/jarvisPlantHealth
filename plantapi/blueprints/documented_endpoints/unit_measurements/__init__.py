# blueprints/documented_endpoints/health_attributes/__init__.py
from http import HTTPStatus
from flask_restx import Resource
from markupsafe import escape
from blueprints.services.unit_measurement_service import get_unit_measurement_dtos
from blueprints.swagger_models.unit_measurements import (
    namespaceUnitMeasurement,
    unit_measurement_model,
)


@namespaceUnitMeasurement.route("")
class unit_measurements(Resource):
    """Get unit measurement list"""

    @namespaceUnitMeasurement.response(500, "Internal Server error")
    @namespaceUnitMeasurement.marshal_list_with(unit_measurement_model)
    def get(self):
        unit_measurement = get_unit_measurement_dtos()
        return unit_measurement
