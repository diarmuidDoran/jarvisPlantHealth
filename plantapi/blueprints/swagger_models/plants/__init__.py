# blueprints/swagger_models/plants/__init__.py
from flask_restx import Namespace, fields

from blueprints.swagger_models.sensors import sensor_model

namespacePlant = Namespace("plants", "plant endpoints")

plant_model = namespacePlant.model(
    "Plant",
    {
        "id": fields.Integer(readonly=True, description="Plant identifier"),
        "name": fields.String(required=True, description="Plant name"),
        "room_id": fields.Integer(required=True, description="Room identifier"),
    },
)

plant_ids_model = namespacePlant.model(
    "Plant ID list",
    {
        "id": fields.Integer(required=True, description="Plant identifier"),
    },
)

plant_health_attribute_model = namespacePlant.model(
    "Plant Health Attributes",
    {
        "id": fields.Integer(readonly=True, description="Plant health identifier"),
        "upper_required_value": fields.Float(
            required=True, description="Upper Required Value"
        ),
        "lower_required_value": fields.Float(
            required=True, description="Lower Required identifier"
        ),
        "unit_measurement_id": fields.Integer(
            required=True, description="Unit Measurement ID"
        ),
        "plant_id": fields.Integer(required=True, description="Unit Measurement ID"),
        "health_attribute_id": fields.Integer(
            required=True, description="Health Attribute ID"
        ),
    },
)


plant_health_attribute_sensor_model = namespacePlant.model(
    "Plant Health Attributes Sensors",
    {
        "id": fields.Integer(readonly=True, description="Plant health identifier"),
        "upper_required_value": fields.Float(
            required=True, description="Upper Required Value"
        ),
        "lower_required_value": fields.Float(
            required=True, description="Lower Required identifier"
        ),
        "unit_measurement_id": fields.Integer(
            required=True, description="Unit Measurement ID"
        ),
        "plant_id": fields.Integer(required=True, description="Unit Measurement ID"),
        "health_attribute_id": fields.Integer(
            required=True, description="Health Attribute ID"
        ),
        "sensor": fields.Nested(
            sensor_model,
            description="Associated sensor",
        ),
    },
)

plant_plant_health_attribute_list_model = namespacePlant.model(
    "PlantHealthAttributeList",
    {
        "id": fields.Integer(readonly=True, description="Plant identifier"),
        "name": fields.String(required=True, description="Plant name"),
        "room_id": fields.Integer(required=True, description="Room identifier"),
        "plant_health_attributes": fields.Nested(
            plant_health_attribute_model,
            description="List of plants health attributes",
            as_list=True,
        ),
    },
)

plant_plant_health_attribute_sensor_list_model = namespacePlant.model(
    "PlantHealthAttributeList",
    {
        "id": fields.Integer(readonly=True, description="Plant identifier"),
        "name": fields.String(required=True, description="Plant name"),
        "room_id": fields.Integer(required=True, description="Room identifier"),
        "plant_health_attributes": fields.Nested(
            plant_health_attribute_sensor_model,
            description="List of plants health attributes",
            as_list=True,
        ),
    },
)


plant_list_model = namespacePlant.model(
    "PlantList",
    {
        "id": fields.Integer(readonly=True, description="Plant identifier"),
        "name": fields.String(required=True, description="Plant name"),
        "room_id": fields.Integer(required=True, description="Room identifier"),
    },
)


plant_user_relationship_model = namespacePlant.model(
    "PlantUserRelationship",
    {
        "id": fields.Integer(
            readonly=True, description="Plant User relationship identifier"
        ),
        "plant_id": fields.Integer(required=True, description="Plant identifier"),
        "user_id": fields.Integer(required=True, description="User Account identifier"),
    },
)

plant_health_attribute_sensor_relationship_model = namespacePlant.model(
    "PlantHealthAttributeSensorRelationship",
    {
        "id": fields.Integer(
            readonly=True,
            description="Plant-health-attribute Sensor relationship identifier",
        ),
        "plant_health_attribute_id": fields.Integer(
            required=True, description="Plant Health Attribute identifier"
        ),
        "sensor_id": fields.Integer(required=True, description="Sensor identifier"),
    },
)
