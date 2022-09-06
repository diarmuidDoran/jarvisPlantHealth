from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from src.blueprints.data_provider.engine import Base


class Unit_Measurement(Base):
    __tablename__ = "unit_measurement"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    unit = Column("unit", String(255))

    plant_health_attributes_c = relationship(
        "Plant_Health_Attribute",
        back_populates="unit_measurements",
        cascade="all, delete",
        passive_deletes=True,
    )

    def __init__(self, unit):
        self.unit = unit

    def __repr__(self):
        return f"Unit_Measurement(id={self.id!r}, unit={self.unit!r})"
