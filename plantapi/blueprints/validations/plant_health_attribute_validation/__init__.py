from blueprints.data_provider.plant_health_attribute_data_provider import getPlantHelathAttributeDtos


def plant_health_attribute_is_valid(plant_id, health_attribute_id):

    for plant_dto in getPlantHelathAttributeDtos():
        if (plant_dto.health_attribute_id == health_attribute_id) and (plant_dto.plant_id == plant_id):
            return False
    return True