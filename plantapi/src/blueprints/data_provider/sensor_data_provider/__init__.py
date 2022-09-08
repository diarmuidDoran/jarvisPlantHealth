from sqlalchemy import select
from sqlalchemy.orm import Session
from blueprints.data_provider.engine import engine
from blueprints.data_provider.dtos.sensor import Sensor
from blueprints.data_provider.dtos.plant_health_attribute import (
    Plant_Health_Attribute,
    Sensor_Plant_Health_Attribute,
    # sensor_plant_health_attribute_table,
)

session = Session(engine)


def getSensorDtos():

    stmt = select(Sensor)
    return session.scalars(stmt)


def addSensorDto(sensor_name, call_frequency, connection_pin):

    new_sensor = Sensor(sensor_name, call_frequency, connection_pin, is_deleted=False)

    session.add(new_sensor)
    session.commit()
    return new_sensor


def getSensorDtoById(sensor_id):

    return session.query(Sensor).get(sensor_id)


def deleteSensorDtoById(sensor_id):
    sensor = getSensorDtoById(sensor_id)
    sensor.is_deleted = True
    session.commit()

    return {"Sensor " + sensor.sensor_name + " deleted"}


def getSensorPlantHealthAttributeDto():
    return session.query(Sensor_Plant_Health_Attribute).filter(
        Sensor_Plant_Health_Attribute.plant_health_attribute_id.isnot(None)
    )

    # sensor_plant_health_attribute_stmt = select(Sensor_Plant_Health_Attribute)
    # return session.scalars(sensor_plant_health_attribute_stmt)


def addSensorPlantHealthAttributeDto(sensor_id, plant_health_attribute_id):

    plant_health_attribute = session.query(Plant_Health_Attribute).get(
        plant_health_attribute_id
    )
    sensor_data = session.query(Sensor).get(sensor_id)

    new_relationship = Sensor_Plant_Health_Attribute(
        plant_health_attribute.id,
        sensor_data.id,
        is_deleted=False,
    )
    session.add(new_relationship)

    session.commit()

def deleteSensorpostSensorPlantHealthAttributeRelationshipDto(sensor_plant_health_attributes_id):
    sensor_plant_health_attribute=session.query(Sensor_Plant_Health_Attribute).get(sensor_plant_health_attributes_id)
    sensor_plant_health_attribute.is_deleted = True

    session.commit()
