class Unit_Measurement(object):
    id = 0
    unit = ""

    # The class "constructor" - an initializer
    def __init__(self, id, unit):
        self.id = id
        self.unit = unit


def make_unit_measurement(id, unit):
    unit_measurement = Unit_Measurement(id, unit)
    return unit_measurement
