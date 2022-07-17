from sqlalchemy import select
from sqlalchemy.orm import Session
from blueprints.data_provider.engine import engine
from blueprints.data_provider.dtos.plant import Plant

session = Session(engine)

def getPlants():

    stmt = select(Plant)

    for plant in session.scalars(stmt):
        print(plant)

