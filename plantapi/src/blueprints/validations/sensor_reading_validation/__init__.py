from blueprints.data_provider.sensor_reading_data_provider import (
    getSensorReadingDtos,
)


def sensor_reading_time_is_valid(time_stamp):

    for sensorDto in getSensorReadingDtos():
        if sensorDto.time_stamp is time_stamp:
            return False
    return True
