from typing import List
from blueprints.data_provider.room_data_provider import *
from blueprints.models.rooms import *

def getRooms():
    roomModels = []
    for roomDto in getRoomDtos():
        roomModels.append(make_room(roomDto.id, roomDto.name))
    return roomModels


def postRoom():
    roomDto = addRoomDto()
    return roomDto

def getRoomById(id):
    roomDto = getRoomDtoById(id)
    return make_room(roomDto.id, roomDto.name)


def deleteRoomById(id):
    deleteRoomDtoById(id)

def updateRoomById(id):
    update_room = updateRoomDtoById(id)
    return update_room
