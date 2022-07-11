# blueprints/documented_endpoints/plants/__init__.py
from http import HTTPStatus
from flask import request
from flask_restx import Resource

from blueprints.models.plants import namespacePlant, plant_list_model, plant_model

plant_example = {'id': 1, 'name': 'Plant name', 'room_id': 1}


@namespacePlant.route('')
class plants(Resource):
    """Get plants list and create new plants"""

    @namespacePlant.response(500, 'Internal Server error')
    @namespacePlant.marshal_list_with(plant_model)
    def get(self):
        """List with all the plants"""
        plant_list = [plant_example]

        return {
            'plants': plant_list,
            'total_records': len(plant_list)
        }

    @namespacePlant.response(400, 'Plant with the given name already exists')
    @namespacePlant.response(500, 'Internal Server error')
    @namespacePlant.expect(plant_model)
    @namespacePlant.marshal_with(plant_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new plant"""

        if request.json['name'] == 'Plant name':
            namespacePlant.abort(400, 'Plant with the given name already exists')

        return plant_example, 201


@namespacePlant.route('/<int:plant_id>')
class plant(Resource):
    """Read, update and delete a specific plant"""

    @namespacePlant.response(404, 'Plant not found')
    @namespacePlant.response(500, 'Internal Server error')
    @namespacePlant.marshal_with(plant_model)
    def get(self, plant_id):
        """Get plant_example information"""

        return plant_example

    @namespacePlant.response(400, 'Plant with the given name already exists')
    @namespacePlant.response(404, 'Plant not found')
    @namespacePlant.response(500, 'Internal Server error')
    @namespacePlant.expect(plant_model, validate=True)
    @namespacePlant.marshal_with(plant_model)
    def put(self, plant_id):
        """Update specific plant information"""

        if request.json['name'] == 'Plant name':
            namespacePlant.abort(400, 'Plant with the given name already exists')

        return plant_example

    @namespacePlant.response(204, 'Request Success (No Content)')
    @namespacePlant.response(404, 'Entity not found')
    @namespacePlant.response(500, 'Internal Server error')
    def delete(self, entity_id):
        """Delete a specific plant entity"""

        return '', 204
