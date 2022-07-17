class Room(object):
    id = 0
    name = ""

    # The class "constructor" - It's actually an initializer
    def __init__(self, id, name):
        self.id = id
        self.name = name


def make_room(id, name):
    room = Room(id, name)
    return room

def make_new_room(name):
    room = Room(name=name)
    return room