from blueprints.data_provider.plant_data_provider import *
from blueprints.models.plants import *


def getPlants():
    plantModels = []
    for plantDto in getPlantDtos():
        plantModels.append(make_plant(plantDto.id, plantDto.name, plantDto.room_id))
    return plantModels


def postPlant(name, room_id):
    plantDto = addPlantDto(name, room_id)
    return plantDto


def getPlantById(id):
    plantDto = getPlantDtoById(id)
    return make_plant(plantDto.id, plantDto.name, plantDto.room_id)


def deletePlantById(id):
    deletePlantDtoById(id)


def updatePlantById(plant_id, new_name, new_room_id):
    update_plant = updatePlantDtoById(plant_id, new_name, new_room_id)
    return update_plant


def getPlantHealthAttributesByPlantId(plant_id):

    plantDto = getPlantDtoById(plant_id)
    return make_plant_with_plant_health_attribute_list(plantDto.id, plantDto.name, plantDto.room_id,
                                                       plantDto.plant_health_attributes)


