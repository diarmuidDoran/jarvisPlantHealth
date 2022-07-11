# blueprints/documented_endpoints/rooms/__init__.py
from http import HTTPStatus
from flask import request
from flask_restx import Resource

from blueprints.models.rooms import room_list_model, namespaceRoom, room_model

room_example = {'id': 1, 'name': 'Room name'}


@namespaceRoom.route('')
class rooms(Resource):
    """Get rooms list and create new rooms"""

    @namespaceRoom.response(500, 'Internal Server error')
    @namespaceRoom.marshal_list_with(room_list_model)
    def get(self):
        """List with all the rooms"""
        room_list = [room_example]

        return {
            'rooms': room_list,
            'total_records': len(room_list)
        }

    @namespaceRoom.response(400, 'Entity with the given name already exists')
    @namespaceRoom.response(500, 'Internal Server error')
    @namespaceRoom.expect(room_model)
    @namespaceRoom.marshal_with(room_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new room"""

        if request.json['name'] == 'Room name':
            namespaceRoom.abort(400, 'Room with the given name already exists')

        return room_example, 201


@namespaceRoom.route('/<int:room_id>')
class room(Resource):
    """Read, update and delete a specific room"""

    @namespaceRoom.response(404, 'Room not found')
    @namespaceRoom.response(500, 'Internal Server error')
    @namespaceRoom.marshal_with(room_model)
    def get(self, room_id):
        """Get room_example information"""

        return room_example

    @namespaceRoom.response(400, 'Room with the given name already exists')
    @namespaceRoom.response(404, 'Room not found')
    @namespaceRoom.response(500, 'Internal Server error')
    @namespaceRoom.expect(room_model, validate=True)
    @namespaceRoom.marshal_with(room_model)
    def put(self, entity_id):
        """Update room information"""

        if request.json['name'] == 'Room name':
            namespaceRoom.abort(400, 'Room with the given name already exists')

        return room_example

    @namespaceRoom.response(204, 'Request Success (No Content)')
    @namespaceRoom.response(404, 'Room not found')
    @namespaceRoom.response(500, 'Internal Server error')
    def delete(self, entity_id):
        """Delete a specific entity"""

        return '', 204