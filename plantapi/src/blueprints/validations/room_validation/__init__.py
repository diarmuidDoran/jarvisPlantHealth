from src.blueprints.data_provider.room_data_provider import getRoomDtos


def room_is_valid(room_name):

    for roomDto in getRoomDtos():
        if roomDto.name.casefold() == room_name.casefold():
            return False
    return True
