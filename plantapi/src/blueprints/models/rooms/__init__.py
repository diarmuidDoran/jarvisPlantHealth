from blueprints.services.plant_service import getPlants


class Room(object):
    id = 0
    name = ""
    is_deleted = bool

    # The class "constructor" - an initializer
    def __init__(self, id, name, is_deleted):
        self.id = id
        self.name = name
        self.is_deleted = is_deleted



class Room_Plants(object):
    id = 0
    name = ""
    is_deleted = bool
    plants = []

    # The class "constructor" - an initializer
    def __init__(self, id, name, is_deleted, plants):
        self.id = id
        self.name = name
        self.is_deleted = is_deleted
        self.plants = plants



def make_room(id, name, is_deleted):
    room = Room(id, name, is_deleted)
    return room


def make_room_with_plant_list(id, name, is_deleted, plants):
    room_data = Room_Plants(id, name, is_deleted, plants)
    return room_data


def make_new_room(name):
    room = Room(name=name, is_deleted=False)
    return room
