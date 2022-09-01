from blueprints.data_provider.sensor_data_provider import (
    getSensorDtos,
    getSensorDtoById,
    getSensorPlantHealthAttributeDto,
)


def sensor_is_valid(sensor_name):

    for sensorDto in getSensorDtos():
        if sensorDto.sensor_name.casefold() == sensor_name.casefold():
            return False
    return True


def sensor_id_is_valid(sensor_id):

    sensor_dto = getSensorDtoById(sensor_id)
    if sensor_dto is None:
        return False

    if sensor_dto.id == sensor_id:
        return True
    return False


def sensor_plant_health_attribute_is_valid(sensor_id, plant_health_attribute_id):
    for sensor_plant_health_attribute in getSensorPlantHealthAttributeDto():
        if (
            sensor_plant_health_attribute.sensor_id == sensor_id
            and sensor_plant_health_attribute.plant_health_attribute_id
            == plant_health_attribute_id
        ):
            return False
    return True
