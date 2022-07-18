from flask import request
from sqlalchemy import select
from sqlalchemy.orm import Session
from blueprints.data_provider.engine import engine
from blueprints.data_provider.dtos.plant import Plant

session = Session(engine)


def getPlantDtos():

    stmt = select(Plant)
    return session.scalars(stmt)


def addPlantDto(name, room_id):

    new_plant = Plant(name, room_id)

    session.add(new_plant)
    session.commit()
    return new_plant


def getPlantDtoById(plant_id):

    '''stmt = select(Plant).where(Plant.id == plant_id)'''
    """return session.query(Plant).filter(Plant.id == plant_id)"""
    return session.query(Plant).get(plant_id)


def deletePlantDtoById(plant_id):
    plant = getPlantDtoById(plant_id)
    session.delete(plant)
    session.commit()

    return {'Plant ' + plant.name + ' deleted'}

def updatePlantDtoById(plant_id):
    plant_to_update = getPlantDtoById(plant_id)
    data = request.get_json()

    plant_to_update.name = data.get('name')
    plant_to_update.room_id = data.get('room_id')

    session.commit()

    return plant_to_update
