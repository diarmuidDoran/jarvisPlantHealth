class Health_Attribute(object):
    id = 0
    name = ""

    # The class "constructor" - an initializer
    def __init__(self, id, name):
        self.id = id
        self.name = name


def make_health_attribute(id, name):
    health_attribute = Health_Attribute(id, name)
    return health_attribute
