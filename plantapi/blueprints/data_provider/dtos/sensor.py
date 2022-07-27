from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from blueprints.data_provider.engine import Base

from blueprints.data_provider.dtos.plant_health_attribute import sensor_plant_health_attribute_table


class Sensor(Base):
    __tablename__ = "sensor"

    id = Column('id', Integer, primary_key=True, autoincrement=True)
    sensor_name = Column('sensor_name', String(255))
    call_frequency = Column('call_frequency', String(255))

    sensor_readings = relationship("Sensor_Reading", back_populates="sensor",
                                   cascade="all, delete", passive_deletes=True,)

    plant_health_attributes_d = relationship("Plant_Health_Attribute", secondary=sensor_plant_health_attribute_table,
                                             back_populates="sensor_b", cascade="all, delete")

    def __init__(self, sensor_name, call_frequency):
        self.sensor_name = sensor_name
        self.call_frequency = call_frequency

    def __repr__(self):
        return f"Sensor(id={self.id!r}, sensor_name={self.sensor_name!r}, call_frequency={self.call_frequency!r})"
