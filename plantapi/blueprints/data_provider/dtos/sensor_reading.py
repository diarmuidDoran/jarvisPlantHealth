from sqlalchemy import Column, DECIMAL, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from blueprints.data_provider.engine import Base
from datetime import datetime


class Sensor_Reading(Base):
    __tablename__ = "sensor_reading"

    id = Column('id', Integer, primary_key=True, autoincrement=True)
    sensor_reading = Column('sensor_reading', DECIMAL(precision=10, scale=2))
    time_stamp = Column('time_stamp', DateTime(), default=datetime.utcnow())
    sensor_id = Column('sensor_id', Integer, ForeignKey("sensor.id"), nullable=False)

    sensor = relationship("Sensor", back_populates="sensor_readings")

    def __init__(self, sensor_reading, time_stamp, sensor_id):
        self.sensor_reading = sensor_reading
        self.time_stamp = time_stamp
        self.sensor_id = sensor_id

    def __repr__(self):
        return f"Sensor(id={self.id!r}, sensor_name={self.sensor_reading!r}, time_stamp={self.time_stamp!r}, " \
               f"sensor_id={self.sensor_id!r})"
