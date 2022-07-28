from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from blueprints.data_provider.engine import Base


class Room(Base):
    __tablename__ = "room"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    name = Column("name", String(255))

    plants = relationship(
        "Plant",
        back_populates="room",
        order_by="Plant.id",
        cascade="all, delete",
        passive_deletes=True,
    )

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"Room(id={self.id!r}, name={self.name!r})"
