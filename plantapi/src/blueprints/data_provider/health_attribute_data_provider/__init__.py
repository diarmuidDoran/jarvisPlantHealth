from sqlalchemy import select
from sqlalchemy.orm import Session
from src.blueprints.data_provider.engine import engine
from src.blueprints.data_provider.dtos.health_attribute import Health_Attribute

session = Session(engine)


def get_health_attribute_dtos():

    stmt = select(Health_Attribute)
    return session.scalars(stmt)
