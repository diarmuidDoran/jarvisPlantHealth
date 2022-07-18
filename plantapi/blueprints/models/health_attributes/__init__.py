class Room(object):
    id = 0
    name = ""

    # The class "constructor" - an initializer
    def __init__(self, id, name):
        self.id = id
        self.name = name


def make_health_attribute(id, name):
    room = Room(id, name)
    return room
