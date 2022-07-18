from blueprints.data_provider.plant_data_provider import *
from blueprints.models.plants import *


def getPlants():
    plantModels = []
    for plantDto in getPlantDtos():
        plantModels.append(make_plant(plantDto.id, plantDto.name, plantDto.room_id))
    return plantModels


def postPlant():
    plantDto = addPlantDto()
    return plantDto


def getPlantById(id):
    plantDto = getPlantDtoById(id)
    return make_plant(plantDto.id, plantDto.name, plantDto.room_id)


def deletePlantById(id):
    deletePlantDtoById(id)


def updatePlantById(id):
    update_plant = updatePlantDtoById(id)
    return update_plant
