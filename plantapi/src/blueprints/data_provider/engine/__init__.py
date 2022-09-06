import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

from src.blueprints import config

# print(os.environ.get("DATABASE_CONNECTION"))
engine = create_engine(os.environ.get("DATABASE_CONNECTION"), echo=True, future=True)

# declarative base class
Base = declarative_base()

from src.blueprints.data_provider.dtos.health_attribute import Health_Attribute
from src.blueprints.data_provider.dtos.sensor import Sensor
