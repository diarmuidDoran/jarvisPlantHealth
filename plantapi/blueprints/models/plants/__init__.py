class Plant(object):
    id = 0
    name = ""
    room_id = 0

    # The class "constructor" - an initializer
    def __init__(self, id, name, room_id):
        self.id = id
        self.name = name
        self.room_id = room_id


def make_plant(id, name, room_id):
    plant = Plant(id, name, room_id)
    return plant


def make_new_plant(name, room_id):
    plant = Plant(name=name, roomID=room_id)
    return plant