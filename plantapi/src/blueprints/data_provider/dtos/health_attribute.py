from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from src.blueprints.data_provider.engine import Base


class Health_Attribute(Base):
    __tablename__ = "health_attribute"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    name = Column("name", String(255))

    plant_health_attributes_b = relationship(
        "Plant_Health_Attribute",
        back_populates="health_attributes",
        cascade="all, delete",
        passive_deletes=True,
    )

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"Health_Attribute(id={self.id!r}, name={self.name!r})"
