from blueprints.data_provider.sensor_data_provider import *
from blueprints.models.sensors import *


def getSensors():
    sensorModels = []
    for sensorDto in getSensorDtos():
        sensorModels.append(make_sensor(sensorDto.id, sensorDto.sensor_name, sensorDto.call_frequency))
    return sensorModels


def postSensor(sensor_name, call_frequency):
    new_sensor = addSensorDto(sensor_name, call_frequency)
    return new_sensor

def getSensorById(id):
    sensorDto = getSensorDtoById(id)
    return make_sensor(sensorDto.id,
                     sensorDto.sensor_name,
                     sensorDto.call_frequency)


def deleteSensorById(id):
    deleteSensorDtoById(id)
