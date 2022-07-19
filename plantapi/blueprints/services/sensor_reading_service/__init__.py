from blueprints.data_provider.sensor_reading_data_provider import *
from blueprints.models.sensor_readings import *


def getSensorReadings():
    sensorReadingModels = []
    for sensor_reading_dto in getSensorReadingDtos():
        sensorReadingModels.append(make_sensor_reading(sensor_reading_dto.id, sensor_reading_dto.sensor_reading,
                                                       sensor_reading_dto.time_stamp, sensor_reading_dto.sensor_id))
    return sensorReadingModels


def postSensorReading(sensor_reading, time_stamp, sensor_id):
    new_sensor_reading = addSensorReadingDto(sensor_reading, time_stamp, sensor_id)
    return new_sensor_reading
