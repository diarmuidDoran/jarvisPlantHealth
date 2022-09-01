from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from blueprints import config

engine = create_engine(
    "postgresql://postgres:unopassword@localhost:5432/jarvis_db", echo=True, future=True
)

# declarative base class
Base = declarative_base()

from blueprints.data_provider.dtos.plant import Plant
from blueprints.data_provider.dtos.plant_health_attribute import (
    Plant_Health_Attribute,
    Sensor_Plant_Health_Attribute,
)
from blueprints.data_provider.dtos.health_attribute import Health_Attribute
from blueprints.data_provider.dtos.room import Room
from blueprints.data_provider.dtos.unit_measurement import Unit_Measurement
from blueprints.data_provider.dtos.user_accounts import User_Account, plant_user_table
from blueprints.data_provider.dtos.sensor import Sensor
from blueprints.data_provider.dtos.sensor_reading import Sensor_Reading
from blueprints.data_provider.dtos.notification import Notification
