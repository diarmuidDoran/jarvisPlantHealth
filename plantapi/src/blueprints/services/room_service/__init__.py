from blueprints.data_provider.room_data_provider import *
from blueprints.models.plants import make_plant
from blueprints.models.rooms import *


def get_rooms():
    room_models = []
    for roomDto in getRoomDtos():
        room_models.append(make_room(roomDto.id, roomDto.name))
    return room_models


def post_room(name):
    new_room = addRoomDto(name)
    return new_room


def get_room_by_id(id):
    room_dto = getRoomDtoById(id)
    # if room_dto is empty
    try:
        room_plant_models = []
        for roomPlantDto in getPlants():
            if roomPlantDto.room_id == room_dto.id:
                room_plant_models.append(
                    make_plant(roomPlantDto.id, roomPlantDto.name, roomPlantDto.room_id)
                )
        return make_room_with_plant_list(room_dto.id, room_dto.name, room_plant_models)
    except AttributeError:
        return None


def delete_room_by_id(id):
    deleteRoomDtoById(id)


def update_room_by_id(id, new_name):
    update_room = updateRoomDtoById(id, new_name)
    return update_room
