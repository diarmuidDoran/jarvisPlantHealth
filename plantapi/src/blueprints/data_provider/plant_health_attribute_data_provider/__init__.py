from sqlalchemy import select
from sqlalchemy.orm import Session
from src.blueprints.data_provider.engine import engine
from src.blueprints.data_provider.dtos.plant_health_attribute import (
    Plant_Health_Attribute,
)

session = Session(engine)


def getPlantHelathAttributeDtos():

    stmt = select(Plant_Health_Attribute)
    return session.scalars(stmt)


def addPlantHealthAttributeDto(
    upper_required_value,
    lower_required_value,
    unit_measurement_id,
    plant_id,
    health_attribute_id,
):

    new_plant_health_attribute = Plant_Health_Attribute(
        upper_required_value,
        lower_required_value,
        unit_measurement_id,
        plant_id,
        health_attribute_id,
        is_deleted=False,
    )

    session.add(new_plant_health_attribute)
    session.commit()
    return new_plant_health_attribute


def getPlantHealthAttributeDtoById(plant_health_attribute_id):

    return session.query(Plant_Health_Attribute).get(plant_health_attribute_id)


def deletePlantHealthAttributeDtoById(plant_health_attribute_id):

    plant_health_attribute = getPlantHealthAttributeDtoById(plant_health_attribute_id)

    plant_health_attribute.is_deleted = True
    session.commit()
    return "Plant Health Attribute deleted"


def updatePlantHealthAttributeDtoById(
    plant_health_attribute_id,
    upper_required_value,
    lower_required_value,
    unit_measurement_id,
    plant_id,
    health_attribute_id,
):
    plant_health_attribute_to_update = getPlantHealthAttributeDtoById(
        plant_health_attribute_id
    )

    plant_health_attribute_to_update.upper_required_value = upper_required_value
    plant_health_attribute_to_update.lower_required_value = lower_required_value
    plant_health_attribute_to_update.unit_measurement_id = unit_measurement_id
    plant_health_attribute_to_update.plant_id = plant_id
    plant_health_attribute_to_update.health_attribute_id = health_attribute_id

    session.commit()

    return plant_health_attribute_to_update
