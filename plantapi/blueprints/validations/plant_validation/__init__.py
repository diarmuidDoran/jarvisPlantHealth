from blueprints.data_provider.plant_data_provider import getPlantDtos


def plant_is_valid(plant_name):

    for plant_dto in getPlantDtos():
        if plant_dto.name.casefold() == plant_name.casefold():
            return False
    return True
