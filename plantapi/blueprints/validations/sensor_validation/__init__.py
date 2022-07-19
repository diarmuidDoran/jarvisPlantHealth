from blueprints.data_provider.sensor_data_provider import getSensorDtos


def sensor_is_valid(sensor_name):

    for sensorDto in getSensorDtos():
        if sensorDto.name.casefold() == sensor_name.casefold():
            return False
    return True
