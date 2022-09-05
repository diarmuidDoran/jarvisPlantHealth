from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship
from blueprints.data_provider.engine import Base

# from blueprints.data_provider.dtos.plant_health_attribute import (
#     sensor_plant_health_attribute_table,
# )


class Sensor(Base):
    __tablename__ = "sensor"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    sensor_name = Column("sensor_name", String(255))
    call_frequency = Column("call_frequency", String(255))
    is_deleted = Column(
        "is_deleted",
        Boolean,
    )

    sensor_readings = relationship(
        "Sensor_Reading",
        back_populates="sensor",
        cascade="all, delete",
        passive_deletes=False,
    )

    plant_health_attribute_d = relationship(
        "Sensor_Plant_Health_Attribute",
        back_populates="sensor",
    )

    def __init__(self, sensor_name, call_frequency, is_deleted):
        self.sensor_name = sensor_name
        self.call_frequency = call_frequency
        self.is_deleted = is_deleted

    def __repr__(self):
        return f"Sensor(id={self.id!r}, sensor_name={self.sensor_name!r}, call_frequency={self.call_frequency!r}," \
               f"is_deleted={self.is_deleted!r})"
