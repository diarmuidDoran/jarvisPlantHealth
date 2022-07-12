# blueprints/models/plants/__init__.py
from flask_restx import Namespace, fields

namespacePlantHealthAttribute = Namespace('plant_health_attributes', 'plant health endpoints')

plant_health_attribute_model = namespacePlantHealthAttribute.model('Plant Health Attributes', {
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

