from sqlalchemy import select
from sqlalchemy.orm import Session
from src.blueprints.data_provider.engine import engine
from src.blueprints.data_provider.dtos.sensor_reading import Sensor_Reading

session = Session(engine)


def getSensorReadingDtos():

    stmt = select(Sensor_Reading)
    return session.scalars(stmt)


def addSensorReadingDto(sensor_reading, time_stamp, sensor_id):

    new_sensor_reading = Sensor_Reading(sensor_reading, time_stamp, sensor_id)

    session.add(new_sensor_reading)
    session.commit()
    return new_sensor_reading
