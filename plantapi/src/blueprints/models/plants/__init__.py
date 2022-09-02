from blueprints.services.plant_health_attribute_service import getPlantHealthAttributes


class Plant(object):
    id = 0
    name = ""
    room_id = 0
    is_deleted = bool

    # The class "constructor" - an initializer
    def __init__(self, id, name, room_id, is_deleted):
        self.id = id
        self.name = name
        self.room_id = room_id
        self.is_deleted = is_deleted


class Plant_Plant_Health_Attribute(object):
    id = 0
    name = ""
    room_id = 0
    is_deleted = bool
    plant_health_attributes = []

    # The class "constructor" - an initializer
    def __init__(self, id, name, room_id, plant_health_attributes, is_deleted):
        self.id = id
        self.name = name
        self.room_id = room_id
        self.is_deleted = is_deleted
        self.plant_health_attributes = plant_health_attributes


def make_plant(id, name, room_id, is_deleted):
    plant = Plant(id, name, room_id, is_deleted)
    return plant


def make_new_plant(name, room_id):
    plant = Plant(id, name=name, room_id=room_id, is_deleted=False)
    return plant


def make_plant_with_plant_health_attribute_list(
    id, name, room_id, is_deleted, plant_health_attributes
):
    plant_health_attribute_data = Plant_Plant_Health_Attribute(
        id,
        name,
        room_id,
        is_deleted,
        plant_health_attributes,
    )
    return plant_health_attribute_data
