from blueprints.data_provider.plant_data_provider import (
    getPlantDtos,
    getPlantDtoById,
)


def plant_is_valid(plant_name):

    for plant_dto in getPlantDtos():
        if plant_dto.name.casefold() == plant_name.casefold():
            return False
    return True


def plant_new_name_is_valid(id, new_plant_name):

    for plant_dto in getPlantDtos():
        if (plant_dto.id == id) and (plant_dto.name == new_plant_name.casefold()):
            return True
        elif (plant_dto.id != id) and (plant_dto.name == new_plant_name.casefold()):
            return False
        else:
            return True


def plant_id_is_valid(plant_id):

    plant_dto = getPlantDtoById(plant_id)
    if plant_dto.id == plant_id:
        return True
    return False
