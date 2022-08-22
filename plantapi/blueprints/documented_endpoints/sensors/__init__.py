# blueprints/documented_endpoints/sensors/__init__.py
from http import HTTPStatus
from flask import request
from flask_restx import Resource

# from blueprints.swagger_models.sensor_readings import namespaceSensorReading
from blueprints.services.sensor_reading_service import postSensorReading
from blueprints.services.sensor_service import *
from blueprints.swagger_models.sensors import (
    namespaceSensor,
    sensor_model,
    sensor_reading_list_model,
    sensor_reading_model,
    sensor_reading_model_response,
    sensor_plant_health_attributes_model,
)
from blueprints.validations.plant_health_attribute_validation import (
    plant_health_attribute_id_is_valid,
)
from blueprints.validations.sensor_reading_validation import (
    sensor_reading_time_is_valid,
)
from blueprints.validations.sensor_validation import sensor_is_valid, sensor_id_is_valid

sensor_example = {
    "sensor_id": 1,
    "sensor_name": "Sensor name",
    "call_frequency": "5 * * * *",
}

sensor_reading_example = {
    "sensor_reading_id": 1,
    "sensor_reading": 1.00,
    "timestamp": ("08/07/22 09:00", "%d/%m/%y %H:%M"),
    "sensor_id": 1,
}


@namespaceSensor.route("")
class sensors(Resource):
    """Get rooms list and create new sensors"""

    @namespaceSensor.response(500, "Internal Server error")
    @namespaceSensor.marshal_list_with(sensor_model)
    def get(self):
        """List with all the sensors"""
        sensor_list = getSensors()
        return sensor_list

    @namespaceSensor.response(400, "Sensor with the given name already exists")
    @namespaceSensor.response(500, "Internal Server error")
    @namespaceSensor.expect(sensor_model)
    @namespaceSensor.marshal_with(sensor_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new sensor"""
        data = request.get_json()
        sensor_name = data.get("sensor_name")
        call_frequency = data.get("call_frequency")

        if sensor_is_valid(sensor_name) is not True:
            namespaceSensor.abort(400, "Sensor with the given name already exists")

        add_sensor = postSensor(sensor_name, call_frequency)

        return add_sensor, 201


@namespaceSensor.route("/<int:sensor_id>")
class sensor(Resource):
    """Read, update and delete a specific sensor"""

    @namespaceSensor.response(404, "Sensor not found")
    @namespaceSensor.response(500, "Internal Server error")
    @namespaceSensor.marshal_with(sensor_model)
    def get(self, sensor_id):
        """Get sensor_example information"""
        if getSensorById(sensor_id) is None:
            namespaceSensor.abort(404, "Sensor not found")

        return getSensorById(sensor_id)

    @namespaceSensor.response(204, "Request Success (No Content)")
    @namespaceSensor.response(404, "Sensor not found")
    @namespaceSensor.response(500, "Internal Server error")
    def delete(self, sensor_id):
        """Delete a specific sensor"""
        if getSensorById(sensor_id) is None:
            namespaceSensor.abort(404, "Sensor not found")
        delete_sensor = deleteSensorById(sensor_id)

        return delete_sensor, 204


@namespaceSensor.route("/<int:sensor_id>/readings")
class sensor_readings(Resource):
    """Read list of readings logged off a specific sensor"""

    @namespaceSensor.response(404, "Sensor not found")
    @namespaceSensor.response(500, "Internal Server error")
    @namespaceSensor.marshal_with(sensor_reading_list_model)
    def get(self, sensor_id):
        if getSensorById(sensor_id) is None:
            namespaceSensor.abort(404, "Sensor not found")
        """List with all a specific sensors readings"""
        sensor_reading_list = getSensorReadingsById(sensor_id)

        return sensor_reading_list

    @namespaceSensor.response(404, "Sensor not found")
    @namespaceSensor.response(400, "Sensor reading already exists")
    @namespaceSensor.response(500, "Internal Server error")
    @namespaceSensor.expect(sensor_reading_model)
    @namespaceSensor.marshal_with(
        sensor_reading_model_response, code=HTTPStatus.CREATED
    )
    def post(self, sensor_id):
        if getSensorById(sensor_id) is None:
            namespaceSensor.abort(404, "Sensor not found")
        """Create a new sensor reading"""
        data = request.get_json()
        sensor_reading = data.get("sensor_reading")
        time_stamp = data.get("time_stamp")

        if sensor_reading_time_is_valid(time_stamp) is not True:
            namespaceSensor.abort(
                400, "The sensor has already logged data for this time"
            )

        add_sensor_reading = postSensorReading(sensor_reading, time_stamp, sensor_id)

        return add_sensor_reading, 201


@namespaceSensor.route("/sensor_plant_health_attribute_relationship")
class sensor_plant_health_attribute_relationships(Resource):
    """Read list of sensor plant health relationships"""

    @namespaceSensor.response(500, "Internal Server error")
    @namespaceSensor.marshal_with(sensor_plant_health_attributes_model)
    def get(self):
        """List with all the sensor plant health relationships"""
        sensor_plant_health_attributes = getSensorPlantHelathAttribute()
        return sensor_plant_health_attributes


@namespaceSensor.route(
    "/<int:sensor_id>/sensor_plant_health_attribute_relationship/<int:plant_health_attribute_id>"
)
class sensor_plant_health_attribute_relationship(Resource):
    """Post sensor to plant_health_attribute relationships"""

    @namespaceSensor.response(404, "Sensor id or plant_health_attribute_id not found")
    @namespaceSensor.response(
        400, "Sensor id and Plant Health Attribute id already share a relationship"
    )
    @namespaceSensor.response(201, "Relationship added")
    @namespaceSensor.response(500, "Internal Server error")
    def post(self, sensor_id, plant_health_attribute_id):
        """Create a new sensor plant health attribute relationship"""

        if (sensor_id_is_valid(sensor_id) is not True) or (
            plant_health_attribute_id_is_valid(plant_health_attribute_id) is not True
        ):
            namespaceSensor.abort(404, "Plant id or user_id not found")

        postSensorPlantHelathAttribute(sensor_id, plant_health_attribute_id)

        return 201
