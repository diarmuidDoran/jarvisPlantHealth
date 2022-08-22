from blueprints.services.plant_health_attribute_service import getPlantHealthAttributes


class Plant(object):
    id = 0
    name = ""
    room_id = 0

    # The class "constructor" - an initializer
    def __init__(self, id, name, room_id):
        self.id = id
        self.name = name
        self.room_id = room_id


class Plant_Plant_Health_Attribute(object):
    id = 0
    name = ""
    room_id = 0
    plant_health_attributes = []

    # The class "constructor" - an initializer
    def __init__(self, id, name, room_id, plant_health_attributes):
        self.id = id
        self.name = name
        self.room_id = room_id
        self.plant_health_attributes = plant_health_attributes


def make_plant(id, name, room_id):
    plant = Plant(id, name, room_id)
    return plant


def make_new_plant(name, room_id):
    plant = Plant(name=name, room_id=room_id)
    return plant


def make_plant_with_plant_health_attribute_list(
    id, name, room_id, plant_health_attributes
):
    plant_health_attribute_data = Plant_Plant_Health_Attribute(
        id,
        name,
        room_id,
        plant_health_attributes,
    )
    return plant_health_attribute_data
