# blueprints/documented_endpoints/rooms/__init__.py
from http import HTTPStatus
from flask_restx import Resource
from markupsafe import escape
from blueprints.services.room_service import *

from blueprints.swagger_models.rooms import room_list_model, namespaceRoom, room_model

room_example = {'id': 1, 'name': 'Room name'}


@namespaceRoom.route('')
class rooms(Resource):
    """Get rooms list and create new rooms"""

    @namespaceRoom.response(500, 'Internal Server error')
    @namespaceRoom.marshal_list_with(room_model)
    def get(self):
        rooms = getRooms()
        return rooms


    @namespaceRoom.response(400, 'Entity with the given name already exists')
    @namespaceRoom.response(500, 'Internal Server error')
    @namespaceRoom.expect(room_model)
    @namespaceRoom.marshal_with(room_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new room"""
        add_room = postRoom()
        if request.json['name'] == 'Room name':
            namespaceRoom.abort(400, 'Room with the given name already exists')

        return add_room, 201


@namespaceRoom.route('/<int:room_id>')
class room(Resource):
    """Read, update and delete a specific room"""

    @namespaceRoom.response(404, 'Room not found')
    @namespaceRoom.response(500, 'Internal Server error')
    @namespaceRoom.marshal_with(room_list_model)
    def get(self, room_id):
        """Get room_example information"""
        room = getRoomById(room_id)
        return room

    @namespaceRoom.response(400, 'Room with the given name already exists')
    @namespaceRoom.response(404, 'Room not found')
    @namespaceRoom.response(500, 'Internal Server error')
    @namespaceRoom.expect(room_model, validate=True)
    @namespaceRoom.marshal_with(room_model)
    def put(self, room_id):
        """Update room information"""
        updated_room = updateRoomById(room_id)

        if request.json['name'] == 'Room name':
            namespaceRoom.abort(400, 'Room with the given name already exists')

        return updated_room

    @namespaceRoom.response(204, 'Request Success (No Content)')
    @namespaceRoom.response(404, 'Room not found')
    @namespaceRoom.response(500, 'Internal Server error')
    def delete(self, room_id):
        """Delete a specific room entity"""
        delete_room = deleteRoomById(room_id)
        return '', 204