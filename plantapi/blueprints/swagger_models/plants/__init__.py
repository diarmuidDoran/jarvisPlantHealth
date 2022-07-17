# blueprints/swagger_models/plants/__init__.py
from flask_restx import Namespace, fields

namespacePlant = Namespace('plants', 'plant endpoints')

plant_model = namespacePlant.model('Plant', {
    'plant_id': fields.Integer(
        readonly=True,
        description='Plant identifier'
    ),
    'name': fields.String(
        required=True,
        description='Plant name'
    ),
    'room_id': fields.Integer(
        required=True,
        description='Room identifier'
    )
})

plant_list_model = namespacePlant.model('PlantList', {
    'plants': fields.Nested(
        plant_model,
        description='List of plants',
        as_list=True
    ),
    'total_records': fields.Integer(
        description='Total number of plants',
    ),
})

plant_health_attribute_model = namespacePlant.model('Plant Health Attributes', {
    'plant_health_attribute_id': fields.Integer(
        readonly=True,
        description='Plant health identifier'
    ),
    'upper_health_attribute': fields.Float(
        required=True,
        description='Upper Required Value'
    ),
    'lower_required_value': fields.Float(
        required=True,
        description='Lower Required identifier'
    ),
    'unit_measurement_id': fields.Integer(
        required=True,
        description='Unit Measurement ID'
    ),
    'plant_id': fields.Integer(
        required=True,
        description='Unit Measurement ID'
    ),
    'health_attribute_id': fields.Integer(
        required=True,
        description='Health Attribute ID'
    )
})

plant_health_attribute_list_model = namespacePlant.model('HealthAttributeList', {
    'plants': fields.Nested(
        plant_health_attribute_model,
        description='List of plants health attributes',
        as_list=True
    )
})
