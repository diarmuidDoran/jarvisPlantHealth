# blueprints/documented_endpoints/sensors/__init__.py
from http import HTTPStatus
from flask import request
from flask_restx import Resource

from blueprints.models.sensors import namespaceSensor, sensor_list_model, sensor_model, sensor_reading_list_model

sensor_example = {'id': 1, 'sensor_name': 'sensor name', 'call_frequency': '5 * * * *'}


@namespaceSensor.route('')
class sensors(Resource):
    """Get rooms list and create new sensors"""

    @namespaceSensor.response(500, 'Internal Server error')
    @namespaceSensor.marshal_list_with(sensor_model)
    def get(self):
        """List with all the sensors"""
        sensor_list = [sensor_example]

        return {
            'sensors': sensor_list,
            'total_records': len(sensor_list)
        }

    @namespaceSensor.response(400, 'Sensor with the given name already exists')
    @namespaceSensor.response(500, 'Internal Server error')
    @namespaceSensor.expect(sensor_model)
    @namespaceSensor.marshal_with(sensor_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new sensor"""

        if request.json['name'] == 'Sensor name':
            namespaceSensor.abort(400, 'Sensor with the given name already exists')

        return sensor_example, 201


@namespaceSensor.route('/<int:sensor_id>')
class sensor(Resource):
    """Read, update and delete a specific sensor"""

    @namespaceSensor.response(404, 'Sensor not found')
    @namespaceSensor.response(500, 'Internal Server error')
    @namespaceSensor.marshal_with(sensor_model)
    def get(self, sensor_id):
        """Get sensor_example information"""

        return sensor_example

    @namespaceSensor.response(204, 'Request Success (No Content)')
    @namespaceSensor.response(404, 'Sensor not found')
    @namespaceSensor.response(500, 'Internal Server error')
    def delete(self, sensor_id):
        """Delete a specific sensor"""

        return '', 204


@namespaceSensor.route('/<int:sensor_id>/readings')
class sensor_readings(Resource):
    """Read list of readings logged off a specific sensor"""

    @namespaceSensor.response(404, 'Sensor not found')
    @namespaceSensor.response(500, 'Internal Server error')
    @namespaceSensor.marshal_with(sensor_reading_list_model)
    def get(self, sensor_id):
        """Get sensor_example information"""

        """List with all the sensors"""
        sensor_list = [sensor_example]

        return {
            'sensors': sensor_list,
            'total_records': len(sensor_list)
        }
