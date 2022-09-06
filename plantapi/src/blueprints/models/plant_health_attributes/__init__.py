class Plant_Health_Attribute(object):
    id = 0
    upper_required_value = 0
    lower_required_value = 0
    unit_measurement_id = 0
    plant_id = 0
    health_attribute_id = 0
    is_deleted = bool
    sensor = {}

    # The class "constructor" - an initializer
    def __init__(
        self,
        id,
        upper_required_value,
        lower_required_value,
        unit_measurement_id,
        plant_id,
        health_attribute_id,
        is_deleted,
        sensor_b,
    ):
        self.id = id
        self.upper_required_value = upper_required_value
        self.lower_required_value = lower_required_value
        self.unit_measurement_id = unit_measurement_id
        self.plant_id = plant_id
        self.health_attribute_id = health_attribute_id
        self.is_deleted = is_deleted
        self.sensor = sensor_b


def make_plant_health_attribute(
    id,
    upper_required_value,
    lower_required_value,
    unit_measurement_id,
    plant_id,
    health_attribute_id,
    is_deleted,
    sensor,
):

    plant_health_attribute = Plant_Health_Attribute(
        id,
        upper_required_value,
        lower_required_value,
        unit_measurement_id,
        plant_id,
        health_attribute_id,
        is_deleted,
        sensor,
    )

    return plant_health_attribute


def make_new_plant_health_attribute(
    id,
    upper_required_value,
    lower_required_value,
    unit_measurement_id,
    plant_id,
    health_attribute_id,
):

    plant_health_attribute = Plant_Health_Attribute(
        id,
        upper_required_value,
        lower_required_value,
        unit_measurement_id,
        plant_id,
        health_attribute_id,
        is_deleted=False,
    )
    return plant_health_attribute
