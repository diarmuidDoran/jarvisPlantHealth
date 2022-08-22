class Sensor(object):
    id = 0
    sensor_name = ""
    call_frequency = ""

    # The class "constructor" - an initializer
    def __init__(self, id, sensor_name, call_frequency):
        self.id = id
        self.sensor_name = sensor_name
        self.call_frequency = call_frequency


class Sensor_Sensor_Readings(object):
    id = 0
    sensor_name = ""
    call_frequency = ""
    sensor_readings = []
    plant_health_attributes = []

    # The class "constructor" - an initializer
    def __init__(self, id, sensor_name, call_frequency, sensor_readings):
        self.id = id
        self.sensor_name = sensor_name
        self.call_frequency = call_frequency
        self.sensor_readings = sensor_readings


class Sensor_Plant_Health_Attribute(object):
    id = 0
    plant_health_attribute_id = 0
    sensor_id = 0

    # The class "constructor" - an initializer
    def __init__(self, id, plant_health_attribute_id, sensor_id):
        self.id = id
        self.plant_health_attribute_id = plant_health_attribute_id
        self.sensor_id = sensor_id


def make_sensor(id, sensor_name, call_frequency):
    sensor = Sensor(id, sensor_name, call_frequency)
    return sensor


def make_new_sensor(sensor_name, call_frequency):
    sensor = Sensor(sensor_name=sensor_name, call_frequency=call_frequency)
    return sensor


def make_sensor_with_sensor_readings_list(
    id, sensor_name, call_frequency, sensor_readings
):

    sensor_data = Sensor_Sensor_Readings(
        id, sensor_name, call_frequency, sensor_readings
    )
    return sensor_data


def make_sensor_plant_health_attribute_list(
        id, plant_health_attribute_id, sensor_id
):
    data = Sensor_Plant_Health_Attribute(id, plant_health_attribute_id, sensor_id)
    return data
