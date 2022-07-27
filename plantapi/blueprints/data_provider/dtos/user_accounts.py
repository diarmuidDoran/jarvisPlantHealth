from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from blueprints.data_provider.engine import Base

plant_user_table = Table(
    "plant_user",
    Base.metadata,
    Column("plant_id", ForeignKey("plant.id", ondelete="CASCADE"), primary_key=True),
    Column("user_id", ForeignKey("user_account.id", ondelete="CASCADE"), primary_key=True)
)

class User_Account(Base):
    __tablename__ = "user_account"
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    user_name = Column('user_name', String(255))
    first_name = Column('first_name', String(255))
    last_name = Column('last_name', String(255))
    email = Column('email', String(255))
    password = Column('password', String(255))

    plants_b = relationship("Plant", secondary=plant_user_table, back_populates="users", cascade="all, delete")

    def __init__(self, user_name, first_name, last_name, email, password):
        self.user_name = user_name
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

    def __repr__(self):
        return f"User_Account(id={self.id!r}, user_name={self.user_name!r}, first_name={self.first_name!r}," \
               f"last_name={self.email!r}, first_name={self.email!r}, password={self.password!r},)"
