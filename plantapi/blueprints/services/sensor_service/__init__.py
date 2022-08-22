from blueprints.data_provider.sensor_data_provider import *
from blueprints.models.sensors import *


def getSensors():
    sensorModels = []
    for sensorDto in getSensorDtos():
        sensorModels.append(
            make_sensor(sensorDto.id, sensorDto.sensor_name, sensorDto.call_frequency)
        )
    return sensorModels


def postSensor(sensor_name, call_frequency):
    new_sensor = addSensorDto(sensor_name, call_frequency)
    return new_sensor


def getSensorById(id):
    sensorDto = getSensorDtoById(id)
    try:
        return make_sensor(
            sensorDto.id, sensorDto.sensor_name, sensorDto.call_frequency
        )
    except AttributeError:
        return None


def deleteSensorById(id):
    deleteSensorDtoById(id)


def getSensorReadingsById(id):
    sensorDto = getSensorDtoById(id)
    return make_sensor_with_sensor_readings_list(
        sensorDto.id,
        sensorDto.sensor_name,
        sensorDto.call_frequency,
        sensorDto.sensor_readings,
    )


def getSensorPlantHelathAttribute():

    sensor_plant_health_attribute_models = []
    for sensor_plant_health_attribute_dto in getSensorPlantHealthAttributeDto():
        sensor_plant_health_attribute_models.append(
            make_sensor_plant_health_attribute_list(
                sensor_plant_health_attribute_dto.id,
                sensor_plant_health_attribute_dto.plant_health_attribute_id,
                sensor_plant_health_attribute_dto.sensor_id,
            )
        )
    return sensor_plant_health_attribute_models


def postSensorPlantHelathAttribute(sensor_id, plant_health_attribute_id):
    addSensorPlantHealthAttributeDto(sensor_id, plant_health_attribute_id)
