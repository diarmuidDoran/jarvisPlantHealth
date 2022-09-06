from src.blueprints.data_provider.plant_data_provider import *
from src.blueprints.data_provider.plant_health_attribute_data_provider import *
from src.blueprints.models.plants import *
from src.blueprints.models.plant_health_attributes import *
from src.blueprints.services.sensor_service import (
    getSensorPlantHealthAttribute,
    getSensorById,
)


def getPlants():
    plantModels = []
    for plantDto in getPlantDtos():
        if plantDto.is_deleted == False:
            plantModels.append(
                make_plant(
                    plantDto.id, plantDto.name, plantDto.room_id, plantDto.is_deleted
                )
            )
    return plantModels


def postPlant(name, room_id, is_delete):
    plantDto = addPlantDto(name, room_id, is_delete)
    return plantDto


def getPlantById(id):
    plantDto = getPlantDtoById(id)
    try:
        if plantDto.is_deleted == False:
            return make_plant(
                plantDto.id, plantDto.name, plantDto.room_id, plantDto.is_deleted
            )
    except AttributeError:
        return None


def deletePlantById(id):
    deletePlantDtoById(id)


def updatePlantById(plant_id, new_name, new_room_id):
    update_plant = updatePlantDtoById(plant_id, new_name, new_room_id)
    return update_plant


def getPlantHealthAttributesByPlantId(plant_id, plant_health_attributes_list):
    plantDto = getPlantDtoById(plant_id)

    plant_health_attributes_models = []

    for plant_health_attribute_dto in plantDto.plant_health_attributes:
        if plant_health_attribute_dto.is_deleted == False:
            plant_health_attributes_models.append(
                make_plant_health_attribute(
                    plant_health_attribute_dto.id,
                    plant_health_attribute_dto.upper_required_value,
                    plant_health_attribute_dto.lower_required_value,
                    plant_health_attribute_dto.unit_measurement_id,
                    plant_health_attribute_dto.plant_id,
                    plant_health_attribute_dto.health_attribute_id,
                    plant_health_attribute_dto.is_deleted,
                    plant_health_attribute_dto.sensor_b,
                )
            )

    plant_health_attribute_model = make_plant_with_plant_health_attribute_list(
        plantDto.id,
        plantDto.name,
        plantDto.room_id,
        plant_health_attributes_models,
        plantDto.is_deleted,
    )

    sensor_plant_health_attributes = getSensorPlantHealthAttribute()

    for plant_health_attribute in plant_health_attribute_model.plant_health_attributes:
        sensor = {}
        for sensor_plant_health_attribute in sensor_plant_health_attributes:
            if (
                sensor_plant_health_attribute.plant_health_attribute_id
                == plant_health_attribute.id
            ):
                sensor = getSensorById(sensor_plant_health_attribute.sensor_id)

        plant_health_attribute.sensor = sensor

    return plant_health_attribute_model


def getPlantHealthAttributesById(plant_health_attribute_id):

    plantHealthAttributeDto = getPlantHealthAttributeDtoById(plant_health_attribute_id)

    sensor = {}

    sensor_plant_health_attributes = getSensorPlantHealthAttribute()
    for sensor_plant_health_attribute in sensor_plant_health_attributes:
        if (
            sensor_plant_health_attribute.plant_health_attribute_id
            == plant_health_attribute_id
        ):
            sensor = getSensorById(sensor_plant_health_attribute.sensor_id)

    return make_plant_health_attribute(
        plantHealthAttributeDto.id,
        plantHealthAttributeDto.upper_required_value,
        plantHealthAttributeDto.lower_required_value,
        plantHealthAttributeDto.unit_measurement_id,
        plantHealthAttributeDto.plant_id,
        plantHealthAttributeDto.health_attribute_id,
        plantHealthAttributeDto.is_deleted,
        sensor,
    )


def postPlantUser(plant_id, user_id):
    addPlantUserDto(plant_id, user_id)
