from sqlalchemy import select
from sqlalchemy.orm import Session
from blueprints.data_provider.engine import engine
from blueprints.data_provider.dtos.unit_measurement import Unit_Measurement

session = Session(engine)


def get_unit_measurement_dtos():

    stmt = select(Unit_Measurement)
    return session.scalars(stmt)
