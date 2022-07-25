from blueprints.data_provider.room_data_provider import *
from blueprints.models.plants import make_plant
from blueprints.models.rooms import *

def getRooms():
    roomModels = []
    for roomDto in getRoomDtos():
        roomModels.append(make_room(roomDto.id, roomDto.name))
    return roomModels


def postRoom(name):
    new_room = addRoomDto(name)
    return new_room

def getRoomById(id):
    roomDto = getRoomDtoById(id)
    roomPlantModels = []
    for roomPlantDto in getPlants():
        if roomPlantDto.room_id == id:
            roomPlantModels.append(make_plant(roomPlantDto.id, roomPlantDto.name, roomPlantDto.room_id))
    return make_room_with_plant_list(roomDto.id,
                     roomDto.name,
                     roomPlantModels)


def deleteRoomById(id):
    deleteRoomDtoById(id)


def updateRoomById(id, new_name):
    update_room = updateRoomDtoById(id, new_name)
    return update_room
