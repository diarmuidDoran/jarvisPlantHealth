from blueprints.data_provider.plant_data_provider import getPlantDtos, getPlantDtoById


def plant_is_valid(plant_name):

    for plant_dto in getPlantDtos():
        if plant_dto.name.casefold() == plant_name.casefold():
            return False
    return True


def plant_id_is_valid(plant_id):

    plant_dto = getPlantDtoById(plant_id)
    if plant_dto.id == plant_id:
        return True
    return False
