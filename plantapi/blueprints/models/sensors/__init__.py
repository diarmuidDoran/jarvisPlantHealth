# blueprints/models/sensors/__init__.py
from flask_restx import Namespace, fields

from blueprints.models.sensor_readings import sensor_reading_model

namespaceSensor = Namespace('sensors', 'sensor endpoints')

sensor_model = namespaceSensor.model('Sensor', {
    'sensor_id': fields.Integer(
        readonly=True,
        description='Sensor identifier'
    ),
    'sensor_name': fields.String(
        required=True,
        description='Sensor name'
    ),
    'call_frequency': fields.String(
        required=True,
        description='Room identifier'
    )
})

sensor_list_model = namespaceSensor.model('SensorList', {
    'sensors': fields.Nested(
        sensor_model,
        description='List of sensors',
        as_list=True
    ),
    'total_records': fields.Integer(
        description='Total number of sensors',
    ),
})

sensor_reading_list_model = namespaceSensor.model('SensorReadingList', {
    'sensor_name': fields.String(
        required=True,
        description='Sensor name'
    ),
    'call_frequency': fields.String(
        required=True,
        description='Room identifier'
    ),
    'sensor_readings': fields.Nested(
        sensor_reading_model,
        description='List of sensor readings',
        as_list=True
    ),
})

