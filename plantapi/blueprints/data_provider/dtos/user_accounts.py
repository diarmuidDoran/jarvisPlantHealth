from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from blueprints.data_provider.engine import Base

association_table = Table(
    "plant_user",
    Base.metadata,
    Column("plant_id", ForeignKey("plant.id"), primary_key=True),
    Column("user_id", ForeignKey("user_account.id"), primary_key=True)
)

class User_Account(Base):
    __tablename__ = "user_account"
    id = Column('id', Integer, primary_key=True)
    user_name = Column('user_name', String(255))
    first_name = Column('first_name', String(255))
    last_name = Column('last_name', String(255))
    email = Column('email', String(255))
    password = Column('password', String(255))

    plants_b = relationship("Plant", secondary=association_table, back_populates="users")
