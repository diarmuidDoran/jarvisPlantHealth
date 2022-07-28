from sqlalchemy import select
from sqlalchemy.orm import Session
from blueprints.data_provider.engine import engine
from blueprints.data_provider.dtos.sensor import Sensor

session = Session(engine)


def getSensorDtos():

    stmt = select(Sensor)
    return session.scalars(stmt)


def addSensorDto(sensor_name, call_frequency):

    new_sensor = Sensor(sensor_name, call_frequency)

    session.add(new_sensor)
    session.commit()
    return new_sensor


def getSensorDtoById(sensor_id):

    return session.query(Sensor).get(sensor_id)


def deleteSensorDtoById(sensor_id):
    sensor = getSensorDtoById(sensor_id)
    session.delete(sensor)
    session.commit()

    return {"Sensor " + sensor.name + " deleted"}
