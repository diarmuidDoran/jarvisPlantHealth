from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship
from blueprints.data_provider.engine import Base


class Room(Base):
    __tablename__ = "room"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    name = Column("name", String(255))
    is_deleted = Column(
        "is_deleted",
        Boolean,
    )

    plants = relationship(
        "Plant",
        back_populates="room",
        order_by="Plant.name",
    )

    def __init__(self, name, is_deleted):
        self.name = name
        self.is_deleted = is_deleted

    def __repr__(self):
        return f"Room(id={self.id!r}, name={self.name!r}, is_deleted={self.is_deleted!r})"
