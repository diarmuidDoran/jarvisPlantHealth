from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from blueprints.data_provider.dtos.extentions import Base


class Plant(Base):
    __tablename__ = "plant"
    id = Column('plant_id', Integer, primary_key=True)
    name = Column('name', String(255))
    roomID = Column('room_id', Integer, ForeignKey("room.room_id"), nullable=False)

    room = relationship("Room", back_populates="plants")

    def __repr__(self):
        return f"Plant(plant_id={self.id!r}, name={self.name!r})"

