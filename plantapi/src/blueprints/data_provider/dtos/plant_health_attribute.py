from sqlalchemy import Column, Integer, ForeignKey, DECIMAL, Boolean, Table
from sqlalchemy.orm import relationship
from src.blueprints.data_provider.engine import Base

# sensor_plant_health_attribute_table = Table(
#     "sensor_plant_health_attribute",
#     Base.metadata,
#     Column(
#         "plant_health_attribute_id",
#         ForeignKey("plant_health_attribute.id", ondelete="CASCADE"),
#     ),
#     Column("sensor_id", ForeignKey("sensor.id", ondelete="CASCADE")),
# )


class Sensor_Plant_Health_Attribute(Base):
    __tablename__ = "sensor_plant_health_attribute"
    id = Column("id", Integer, primary_key=True)
    plant_health_attribute_id = Column(
        "plant_health_attribute_id",
        ForeignKey("plant_health_attribute.id", primary_key=True),
    )
    sensor_id = Column("sensor_id", ForeignKey("sensor.id", primary_key=True))
    is_deleted = Column(
        "is_deleted",
        Boolean,
    )

    plant_health_attribute = relationship(
        "Plant_Health_Attribute", back_populates="sensor_b"
    )
    sensor = relationship("Sensor", back_populates="plant_health_attribute_d")

    def __init__(
        self,
        plant_health_attribute_id,
        sensor_id,
        is_deleted,
    ):
        self.plant_health_attribute_id = plant_health_attribute_id
        self.sensor_id = sensor_id
        self.is_deleted = is_deleted


class Plant_Health_Attribute(Base):
    __tablename__ = "plant_health_attribute"
    id = Column("id", Integer, primary_key=True)
    upper_required_value = Column(
        "upper_required_value", DECIMAL(precision=10, scale=2)
    )
    lower_required_value = Column(
        "lower_required_value", DECIMAL(precision=10, scale=2)
    )
    unit_measurement_id = Column(
        "unit_measurement_id",
        Integer,
        ForeignKey("unit_measurement.id", ondelete="CASCADE"),
        nullable=False,
    )
    plant_id = Column(
        "plant_id", Integer, ForeignKey("plant.id", ondelete="CASCADE"), nullable=False
    )
    health_attribute_id = Column(
        "health_attribute_id",
        Integer,
        ForeignKey("health_attribute.id", ondelete="CASCADE"),
        nullable=False,
    )
    is_deleted = Column(
        "is_deleted",
        Boolean,
    )

    # child relationship connections
    plants_c = relationship("Plant", back_populates="plant_health_attributes")
    health_attributes = relationship(
        "Health_Attribute", back_populates="plant_health_attributes_b"
    )
    unit_measurements = relationship(
        "Unit_Measurement", back_populates="plant_health_attributes_c"
    )

    # parent relationship connections
    notifications = relationship(
        "Notification",
        back_populates="plant_health_attributes_d",
        cascade="all, delete",
        passive_deletes=False,
    )

    # many to many child relationship
    sensor_b = relationship(
        "Sensor_Plant_Health_Attribute",
        back_populates="plant_health_attribute",
    )

    def __init__(
        self,
        upper_required_value,
        lower_required_value,
        unit_measurement_id,
        plant_id,
        health_attribute_id,
        is_deleted,
    ):
        self.upper_required_value = upper_required_value
        self.lower_required_value = lower_required_value
        self.unit_measurement_id = unit_measurement_id
        self.plant_id = plant_id
        self.health_attribute_id = health_attribute_id
        self.is_deleted = is_deleted

    def __repr__(self):
        return (
            f"Plant(plant_health_attribute_id={self.id!r}, upper_required_value={self.upper_required_value!r},"
            f"lower_required_value={self.lower_required_value!r}, "
            f"unit_measurement_id={self.unit_measurement_id!r}, plant_id={self.plant_id!r},"
            f"health_attribute_id={self.health_attribute_id!r})"
            f"health_attribute_id={self.is_deleted!r})"
        )
