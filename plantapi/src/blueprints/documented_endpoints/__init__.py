# blueprints.documented_endpoints/__init__.py
from flask import Blueprint
from flask_restx import Api
from blueprints.documented_endpoints.plants import namespacePlant as plants_ns
from blueprints.documented_endpoints.health_attributes import (namespaceHealthAttribute as health_attributes_ns,
)
from blueprints.documented_endpoints.rooms import namespaceRoom as rooms_ns
from blueprints.documented_endpoints.user_accounts import namespaceUser as users_ns
from blueprints.documented_endpoints.sensors import namespaceSensor as sensors_ns
from blueprints.documented_endpoints.unit_measurements import (
    namespaceUnitMeasurement as unit_measurement_ns,
)
from blueprints.documented_endpoints.notifications import (
    namespaceNotify as notifications_ns,
)

blueprint = Blueprint("documented_api", __name__, url_prefix="/documented_api")

api_extension = Api(
    blueprint,
    title="J.A.R.V.I.S Plant Flask RESTx Doc",
    version="1.0",
    description="Flask RESTx extension\
        auto generated documentation",
    doc="/doc",
)

api_extension.add_namespace(rooms_ns)
api_extension.add_namespace(plants_ns)
api_extension.add_namespace(health_attributes_ns)
api_extension.add_namespace(users_ns)
api_extension.add_namespace(notifications_ns)
api_extension.add_namespace(sensors_ns)
api_extension.add_namespace(unit_measurement_ns)
