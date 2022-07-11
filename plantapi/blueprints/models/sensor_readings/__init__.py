# blueprints/models/sensors/__init__.py
from flask_restx import Namespace, fields
namespaceSensorReading = Namespace('sensors', 'sensor endpoints')

sensor_reading_model = namespaceSensorReading.model('Sensor', {
    'sensor_reading_id': fields.Integer(
        readonly=True,
        description='Sensor identifier'
    ),
    'sensor_reading': fields.Float(
        required=True,
        description='Value output from sensor'
    ),
    'time_stamp': fields.DateTime(
        required=True,
        description='Time notification was issued'
    ),
    'sensor_id': fields.Integer(
        required=True,
        description='User_account identifier'
    )
})