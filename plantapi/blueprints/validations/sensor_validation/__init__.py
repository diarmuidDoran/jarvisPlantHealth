from blueprints.data_provider.sensor_data_provider import (
    getSensorDtos,
    getSensorDtoById,
)


def sensor_is_valid(sensor_name):

    for sensorDto in getSensorDtos():
        if sensorDto.sensor_name.casefold() == sensor_name.casefold():
            return False
    return True


def sensor_id_is_valid(sensor_id):

    sensor_dto = getSensorDtoById(sensor_id)
    if sensor_dto.id == sensor_id:
        return True
    return False
