import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

from blueprints import config

print(os.environ.get("DATABASE_CONNECTION"))
engine = create_engine(os.environ.get("DATABASE_CONNECTION"), echo=True, future=True)

# declarative base class
Base = declarative_base()

from blueprints.data_provider.dtos.health_attribute import Health_Attribute
from blueprints.data_provider.dtos.sensor import Sensor
