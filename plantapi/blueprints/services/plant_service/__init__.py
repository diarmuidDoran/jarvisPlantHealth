from blueprints.data_provider.plant_data_provider import *
from blueprints.data_provider.plant_health_attribute_data_provider import *
from blueprints.models.plants import *
from blueprints.models.plant_health_attributes import *
from blueprints.services.sensor_service import getSensorPlantHealthAttribute, getSensorById


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
    try:
        return make_plant(plantDto.id, plantDto.name, plantDto.room_id)
    except AttributeError:
        return None


def deletePlantById(id):
    deletePlantDtoById(id)


def updatePlantById(plant_id, new_name, new_room_id):
    update_plant = updatePlantDtoById(plant_id, new_name, new_room_id)
    return update_plant


def getPlantHealthAttributesByPlantId(plant_id):
    plantDto = getPlantDtoById(plant_id)

    plant_health_attribute_model = make_plant_with_plant_health_attribute_list(
        plantDto.id, plantDto.name, plantDto.room_id, plantDto.plant_health_attributes)

    sensor_plant_health_attributes = getSensorPlantHealthAttribute()

    sensor = {}
    for plant_health_attribute in plant_health_attribute_model.plant_health_attributes:
        for sensor_plant_health_attribute in sensor_plant_health_attributes:
            if sensor_plant_health_attribute.plant_health_attribute_id == plant_health_attribute.id:
                sensor = (getSensorById(sensor_plant_health_attribute.sensor_id))

        plant_health_attribute.sensor = sensor

    return plant_health_attribute_model


def getPlantHealthAttributesById(plant_health_attribute_id):

    plantHealthAttributeDto = getPlantHealthAttributeDtoById(plant_health_attribute_id)

    sensor = {}

    sensor_plant_health_attributes = getSensorPlantHealthAttribute()
    for sensor_plant_health_attribute in sensor_plant_health_attributes:
        if sensor_plant_health_attribute.plant_health_attribute_id == plant_health_attribute_id:
            sensor = (getSensorById(sensor_plant_health_attribute.sensor_id))

    return make_plant_health_attribute(
        plantHealthAttributeDto.id,
        plantHealthAttributeDto.upper_required_value,
        plantHealthAttributeDto.lower_required_value,
        plantHealthAttributeDto.unit_measurement_id,
        plantHealthAttributeDto.plant_id,
        plantHealthAttributeDto.health_attribute_id,
        sensor,
    )


def postPlantUser(plant_id, user_id):
    addPlantUserDto(plant_id, user_id)
