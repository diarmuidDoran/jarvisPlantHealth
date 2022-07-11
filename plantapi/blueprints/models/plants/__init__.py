# blueprints/models/plants/__init__.py
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
