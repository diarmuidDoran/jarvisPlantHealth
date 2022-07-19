class Sensor_Reading(object):
    id = 0
    sensor_reading = 0.00
    time_stamp = '2022-07-21 00:00:00'
    sensor_id = 0

    # The class "constructor" - an initializer
    def __init__(self, id, sensor_reading, time_stamp, sensor_id):
        self.id = id
        self.sensor_reading = sensor_reading
        self.time_stamp = time_stamp
        self.sensor_id = sensor_id


def make_sensor_reading(id, sensor_reading, time_stamp, sensor_id):
    sensor_reading = Sensor_Reading(id, sensor_reading, time_stamp, sensor_id)
    return sensor_reading


def make_new_sensor_reading(sensor_reading, time_stamp, sensor_id):
    sensor_reading = Sensor_Reading(sensor_reading=sensor_reading, time_stamp=time_stamp, sensor_id=sensor_id)
    return sensor_reading
