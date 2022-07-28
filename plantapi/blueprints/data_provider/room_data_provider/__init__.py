from sqlalchemy import select
from sqlalchemy.orm import Session
from blueprints.data_provider.engine import engine
from blueprints.data_provider.dtos.room import Room

session = Session(engine)


def getRoomDtos():

    stmt = select(Room)
    return session.scalars(stmt)


def addRoomDto(name):

    new_room = Room(name)

    session.add(new_room)
    session.commit()
    return new_room


def getRoomDtoById(room_id):

    """stmt = select(Room).where(Room.id == room_id)"""
    """return session.query(Room).filter(Room.id == room_id)"""
    return session.query(Room).get(room_id)


def deleteRoomDtoById(room_id):
    room = getRoomDtoById(room_id)
    session.delete(room)
    session.commit()

    return {"Room " + room.name + " deleted"}


def updateRoomDtoById(room_id, new_name):
    room_to_update = getRoomDtoById(room_id)

    room_to_update.name = new_name

    session.commit()

    return room_to_update
