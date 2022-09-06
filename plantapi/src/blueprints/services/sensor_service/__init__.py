from src.blueprints.data_provider.sensor_data_provider import *
from src.blueprints.models.sensors import *


def getSensors():
    sensorModels = []
    for sensorDto in getSensorDtos():
        if sensorDto.is_deleted == False:
            sensorModels.append(
                make_sensor(
                    sensorDto.id,
                    sensorDto.sensor_name,
                    sensorDto.call_frequency,
                    sensorDto.connection_pin,
                    sensorDto.is_deleted,
                )
            )
    return sensorModels


def postSensor(sensor_name, call_frequency, connection_pin):
    new_sensor = addSensorDto(sensor_name, call_frequency, connection_pin)
    return new_sensor


def getSensorById(id):
    sensorDto = getSensorDtoById(id)
    try:
        return make_sensor(
            sensorDto.id,
            sensorDto.sensor_name,
            sensorDto.call_frequency,
            sensorDto.connection_pin,
            sensorDto.is_deleted,
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
        sensorDto.connection_pin,
        sensorDto.is_deleted,
        sensorDto.sensor_readings,
    )


def getSensorPlantHealthAttribute():

    sensor_plant_health_attribute_models = []
    for sensor_plant_health_attribute_dto in getSensorPlantHealthAttributeDto():
        sensor_plant_health_attribute_models.append(
            make_sensor_plant_health_attribute_list(
                sensor_plant_health_attribute_dto.id,
                sensor_plant_health_attribute_dto.plant_health_attribute_id,
                sensor_plant_health_attribute_dto.sensor_id,
                sensor_plant_health_attribute_dto.is_deleted,
            )
        )
    return sensor_plant_health_attribute_models


def postSensorPlantHealthAttribute(sensor_id, plant_health_attribute_id):
    addSensorPlantHealthAttributeDto(sensor_id, plant_health_attribute_id)

def deleteSensorpostSensorPlantHealthAttributeRelationship(sensor_plant_health_attribute_id, ):
    deleteSensorpostSensorPlantHealthAttributeRelationshipDto(sensor_plant_health_attribute_id)