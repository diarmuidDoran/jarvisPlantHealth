from blueprints.services.plant_service import getPlants


class Room(object):
    id = 0
    name = ""

    # The class "constructor" - an initializer
    def __init__(self, id, name):
        self.id = id
        self.name = name


class Room_Plants(object):
    id = 0
    name = ""
    plants = getPlants()

    # The class "constructor" - an initializer
    def __init__(self, id, name, plants):
        self.id = id
        self.name = name
        self.plants = plants


def make_room(id, name):
    room = Room(id, name)
    return room


def make_room_with_plant_list(id, name, plants):
    room_data = Room_Plants(id, name, plants)
    return room_data


def make_new_room(name):
    room = Room(name=name)
    return room