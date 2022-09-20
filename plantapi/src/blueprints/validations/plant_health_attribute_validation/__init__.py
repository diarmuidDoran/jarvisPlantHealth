from blueprints.data_provider.plant_health_attribute_data_provider import (
    getPlantHelathAttributeDtos,
    getPlantHealthAttributeDtoById,
)


def plant_health_attribute_is_valid(plant_id, health_attribute_id):

    for plant_dto in getPlantHelathAttributeDtos():
        if (plant_dto.health_attribute_id == health_attribute_id) and (
            plant_dto.plant_id == plant_id
        ) and (plant_dto.is_deleted is False):
            return False
    return True


def plant_health_attribute_id_is_valid(plant_health_attribute_id):

    plant_dto = getPlantHealthAttributeDtoById(plant_health_attribute_id)
    if plant_dto is None:
        return False

    if plant_dto.id == plant_health_attribute_id:
        return True
    return False
