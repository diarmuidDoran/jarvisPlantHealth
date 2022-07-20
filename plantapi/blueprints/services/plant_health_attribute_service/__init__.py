from blueprints.data_provider.plant_health_attribute_data_provider import *
from blueprints.models.plant_health_attributes import *


def getPlantHealthAttributes():
    health_attribute_models = []
    for plant_health_attribute_dto in getPlantHelathAttributeDtos():
        health_attribute_models.append(make_plant_health_attribute(plant_health_attribute_dto. id,
                                                                   plant_health_attribute_dto.upper_required_value,
                                                                   plant_health_attribute_dto.lower_required_value,
                                                                   plant_health_attribute_dto.unit_measurement_id,
                                                                   plant_health_attribute_dto.plant_id,
                                                                   plant_health_attribute_dto.health_attribute_id))
    return health_attribute_models

def postPlantHealthAttribute(upper_required_value, lower_required_value, unit_measurement_id, plant_id,
                             health_attribute_id):
    plantHealthAttributeDto = addPlantHealthAttributeDto(upper_required_value, lower_required_value,
                                                         unit_measurement_id, plant_id, health_attribute_id)
    return plantHealthAttributeDto


def getPlantHealthAttributeById(plant_health_attribute_id, plant_id):
    plantHealthAttributeDto = getPlantHealthAttributeDtoById(id)
    return make_plant_health_attribute(plantHealthAttributeDto.id, plantHealthAttributeDto.upper_required_value,
                                       plantHealthAttributeDto.lower_required_value,
                                       plantHealthAttributeDto.unit_measurement_id,
                                       plantHealthAttributeDto.plant_id,
                                       plantHealthAttributeDto.health_attribute_id)


def deletePlantHealthAttributeById(id):
    deletePlantHealthAttributeDtoById(id)


def updatePlantHealthAttributeById(plant_health_attribute_id, upper_required_value, lower_required_value,
                                   unit_measurement_id, plant_id, health_attribute_id):

    update_plant_health_attribute = updatePlantHealthAttributeDtoById(plant_health_attribute_id, upper_required_value,
                                                                      lower_required_value, unit_measurement_id,
                                                                      plant_id, health_attribute_id)
    return update_plant_health_attribute
