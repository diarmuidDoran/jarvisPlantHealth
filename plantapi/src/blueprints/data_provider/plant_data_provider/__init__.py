from sqlalchemy import select
from sqlalchemy.orm import Session
from src.blueprints.data_provider.engine import engine
from src.blueprints.data_provider.dtos.plant import Plant
from src.blueprints.data_provider.dtos.user_accounts import (
    User_Account,
    plant_user_table,
)

session = Session(engine)


def getPlantDtos():

    stmt = select(Plant)
    return session.scalars(stmt)


def addPlantDto(name, room_id, is_delete):

    new_plant = Plant(name, room_id, is_delete)

    session.add(new_plant)
    session.commit()
    return new_plant


def getPlantDtoById(plant_id):

    """stmt = select(Plant).where(Plant.id == plant_id)"""
    """return session.query(Plant).filter(Plant.id == plant_id)"""
    return session.query(Plant).get(plant_id)


def deletePlantDtoById(plant_id):

    plant = getPlantDtoById(plant_id)

    plant.is_deleted = True
    session.commit()

    return {"Plant " + plant.name + " deleted"}


def updatePlantDtoById(plant_id, new_name, new_room_id):
    plant_to_update = getPlantDtoById(plant_id)

    plant_to_update.name = new_name
    plant_to_update.room_id = new_room_id

    session.commit()

    return plant_to_update


def addPlantUserDto(plant_id, user_id):

    user = session.query(User_Account).get(user_id)
    plant = session.query(Plant).get(plant_id)

    user.plants_b.append(plant)

    session.commit()
