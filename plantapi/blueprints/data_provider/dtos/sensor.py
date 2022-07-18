from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from blueprints.data_provider.engine import Base


class Sensor(Base):
    __tablename__ = "sensor"

    id = Column('id', Integer, primary_key=True, autoincrement=True)
    sensor_name = Column('sensor_name', String(255))
    call_frequency = Column('call_frequency', String(255))

    sensor_readings = relationship("Sensor_Reading", back_populates="sensor",)

    def __init__(self, sensor_name, call_frequency):
        self.sensor_name = sensor_name
        self.call_frequency = call_frequency

    def __repr__(self):
        return f"Sensor(id={self.id!r}, sensor_name={self.sensor_name!r}, call_frequency={self.call_frequency!r})"
