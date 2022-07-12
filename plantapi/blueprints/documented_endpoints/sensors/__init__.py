# blueprints/documented_endpoints/sensors/__init__.py
from http import HTTPStatus
from flask import request
from flask_restx import Resource

#from blueprints.models.sensor_readings import namespaceSensorReading
from blueprints.models.sensors import namespaceSensor, sensor_model, sensor_reading_list_model, sensor_reading_model

sensor_example = {'sensor_id': 1, 'sensor_name': 'Sensor name', 'call_frequency': '5 * * * *'}

sensor_reading_example = {'sensor_reading_id': 1, 'sensor_reading': 1.00,
                          'timestamp': ("08/07/22 09:00", "%d/%m/%y %H:%M"), 'sensor_id': 1}


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
        """Get sensor reading example information"""

        """List with all a specific sensors readings"""
        sensor_reading_list = [sensor_reading_example]

        return {
            'sensor_readings': sensor_reading_list,
            'total_records': len(sensor_reading_list)
        }


    @namespaceSensor.response(400, 'Sensor reading already exists')
    @namespaceSensor.response(500, 'Internal Server error')
    @namespaceSensor.expect(sensor_reading_model)
    @namespaceSensor.marshal_with(sensor_reading_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new sensor reading"""

        if request.json['name'] == 'Sensor name' and request.json['time_stamp'] == ("08/07/22 09:00", "%d/%m/%y %H:%M"):
            namespaceSensor.abort(400, 'Sensor with the given name already exists')

        return sensor_example, 201