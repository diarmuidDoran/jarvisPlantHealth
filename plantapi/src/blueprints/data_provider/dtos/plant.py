from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from blueprints.data_provider.dtos.user_accounts import plant_user_table
from blueprints.data_provider.engine import Base


class Plant(Base):
    __tablename__ = "plant"
    id = Column("id", Integer, primary_key=True)
    name = Column("name", String(255))
    room_id = Column(
        "room_id", Integer, ForeignKey("room.id", ondelete="CASCADE"), nullable=False
    )
    is_deleted = Column(
        "is_deleted",
        Boolean,
    )

    room = relationship("Room", back_populates="plants")

    users = relationship(
        "User_Account",
        secondary=plant_user_table,
        back_populates="plants_b",
        passive_deletes=False,
    )

    plant_health_attributes = relationship(
        "Plant_Health_Attribute",
        back_populates="plants_c",
        cascade="all, delete",
        passive_deletes=False,
    )

    def __init__(self, name, room_id, is_deleted):
        self.name = name
        self.room_id = room_id
        self.is_deleted = is_deleted

    def __repr__(self):
        return f"Plant(plant_id={self.id!r}, name={self.name!r}, room_id={self.room_id!r}, is_deleted={self.is_deleted!r})"
