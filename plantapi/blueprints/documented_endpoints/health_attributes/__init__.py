# blueprints/documented_endpoints/health_attributes/__init__.py
from http import HTTPStatus
from flask_restx import Resource
from markupsafe import escape
from blueprints.services.health_attribute_service import get_health_attributes
from blueprints.swagger_models.health_attributes import namespaceHealthAttribute, health_attribute_model


@namespaceHealthAttribute.route('')
class health_attributes(Resource):
    """Get health attribute list"""

    @namespaceHealthAttribute.response(500, 'Internal Server error')
    @namespaceHealthAttribute.marshal_list_with(health_attribute_model)
    def get(self):
        health_attributes = get_health_attributes()
        return health_attributes
