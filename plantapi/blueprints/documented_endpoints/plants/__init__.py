# blueprints/documented_endpoints/plants/__init__.py
from http import HTTPStatus
from flask import request
from flask_restx import Resource
from pyparsing import empty
from sqlalchemy import null

from blueprints.services.plant_service import *
from blueprints.services.plant_health_attribute_service import *
from blueprints.validations.plant_health_attribute_validation import plant_health_attribute_is_valid
from blueprints.validations.plant_validation import plant_is_valid
from blueprints.swagger_models.plants import namespacePlant, plant_plant_health_attribute_list_model, plant_model, \
    plant_health_attribute_model, plant_list_model

plant_example = {'id': 1, 'name': 'Plant name', 'room_id': 1}

plant_health_attribute_example = {'plant_health_attribute_id': 1, 'upper_required_value': 1.00,
                                  'lower_required_value': 0.50, 'unit_measurement_id': 1,
                                  'plant_id': 1, 'health_attribute_id': 1}


@namespacePlant.route('')
class plants(Resource):
    """Get plants list and create new plants"""

    @namespacePlant.response(500, 'Internal Server error')
    @namespacePlant.marshal_list_with(plant_model)
    def get(self):
        plant_list = getPlants()
        return plant_list

    @namespacePlant.response(400, 'Plant with the given name already exists')
    @namespacePlant.response(500, 'Internal Server error')
    @namespacePlant.expect(plant_model)
    @namespacePlant.marshal_with(plant_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new plant"""
        data = request.get_json()
        name = data.get('name')
        room_id = data.get('room_id')

        if plant_is_valid(name) is not True:
            namespacePlant.abort(400, 'Plant with the given name already exists')
        add_plant = postPlant(name, room_id)

        return add_plant, 201


@namespacePlant.route('/<int:plant_id>')
class plant(Resource):
    """Read, update and delete a specific plant"""

    @namespacePlant.response(404, 'Plant not found')
    @namespacePlant.response(500, 'Internal Server error')
    @namespacePlant.marshal_with(plant_list_model)
    def get(self, plant_id):
        plant_search = getPlantById(plant_id)
        return plant_search

    @namespacePlant.response(400, 'Plant with the given name already exists')
    @namespacePlant.response(404, 'Plant not found')
    @namespacePlant.response(500, 'Internal Server error')
    @namespacePlant.expect(plant_model, validate=True)
    @namespacePlant.marshal_with(plant_model)
    def put(self, plant_id):
        """Update specific plant information"""
        data = request.get_json()
        new_name = data.get('name')
        new_room_id = data.get('room_id')

        if plant_is_valid(new_name) is not True:
            namespacePlant.abort(400, 'Plant with the given name already exists')

        updated_plant = updatePlantById(plant_id, new_name, new_room_id)

        return updated_plant, 201

    @namespacePlant.response(204, 'Request Success (No Content)')
    @namespacePlant.response(404, 'Entity not found')
    @namespacePlant.response(500, 'Internal Server error')
    def delete(self, plant_id):
        """Delete a specific plant entity"""
        delete_plant = deletePlantById(plant_id)

        return delete_plant, 204


@namespacePlant.route('/<int:plant_id>/plant_health_attributes')
class plant_health_attributes(Resource):
    """Read list of health attributes for a specific plant"""

    @namespacePlant.response(404, 'Sensor not found')
    @namespacePlant.response(500, 'Internal Server error')
    @namespacePlant.marshal_with(plant_plant_health_attribute_list_model)
    def get(self, plant_id):
        """List with all a specific plants health attributes"""
        plants_plant_health_attribute_list = getPlantHealthAttributesByPlantId(plant_id)

        return plants_plant_health_attribute_list

    @namespacePlant.response(400, 'Plant with the given name already exists')
    @namespacePlant.response(500, 'Internal Server error')
    @namespacePlant.expect(plant_health_attribute_model)
    @namespacePlant.marshal_with(plant_health_attribute_model, code=HTTPStatus.CREATED)
    def post(self, plant_id):
        """Create a new plant health attribute for a specific plant"""
        data = request.get_json()
        upper_required_value = data.get('upper_required_value')
        lower_required_value = data.get('lower_required_value')
        unit_measurement_id = data.get('unit_measurement_id')
        plant_id = plant_id
        health_attribute_id = data.get('health_attribute_id')

        if plant_health_attribute_is_valid(plant_id, health_attribute_id) is not True:
            namespacePlant.abort(400, 'Plant health attribute already exists')

        add_plant_health_attribute = postPlantHealthAttribute(upper_required_value, lower_required_value,
                                                              unit_measurement_id, plant_id, health_attribute_id)
        return add_plant_health_attribute, 201


@namespacePlant.route('/<int:plant_id>/plant_health_attributes/<int:plant_health_attribute_id>')
class plant_health_attribute(Resource):

    """Read, update and delete a specific plant health attribute"""

    @namespacePlant.response(404, 'Plant health attribute not found')
    @namespacePlant.response(500, 'Internal Server error')
    @namespacePlant.marshal_with(plant_health_attribute_model)
    def get(self, plant_id, plant_health_attribute_id):
        """Get specific plant health attribute information"""
        plant_health_attribute = {}
        for plantHealthAttributes in getPlantHealthAttributes():
            if (plantHealthAttributes.plant_id == plant_id) and (plantHealthAttributes.id == plant_health_attribute_id):
                plant_health_attribute = getPlantHealthAttributesById(plant_health_attribute_id)

        if plant_health_attribute:
            return plant_health_attribute, 201
        else:
            namespacePlant.abort(400, 'This specific plant health attribute is not associated to this plant '
                                      'or does not yet exist')

    @namespacePlant.response(404, 'Plant health attribute not found')
    @namespacePlant.response(500, 'Internal Server error')
    @namespacePlant.expect(plant_health_attribute_model, validate=True)
    @namespacePlant.marshal_with(plant_health_attribute_model)
    def put(self, plant_id, plant_health_attribute_id):
        """Update specific plant health attribute information"""

        data = request.get_json()
        upper_required_value = data.get('upper_required_value')
        lower_required_value = data.get('lower_required_value')
        unit_measurement_id = data.get('unit_measurement_id')
        plant_id = plant_id
        health_attribute_id = data.get('health_attribute_id')

        if plant_health_attribute_is_valid(plant_id, health_attribute_id) is not True:
            updated_plant = updatePlantHealthAttributeById(plant_health_attribute_id, upper_required_value,
                                                           lower_required_value, unit_measurement_id, plant_id,
                                                           health_attribute_id)
        else:
            namespacePlant.abort(404, 'Plant health attribute not found')

        return updated_plant

    @namespacePlant.response(204, 'Request Success (No Content)')
    @namespacePlant.response(404, 'Entity not found')
    @namespacePlant.response(500, 'Internal Server error')
    def delete(self, plant_id, plant_health_attribute_id):
        """Delete a specific plant entity"""

        delete_plant_health_attribute = deletePlantHealthAttributeById(plant_id, plant_health_attribute_id)
        if delete_plant_health_attribute:
            return 'delete_plant_health_attribute', 204
        else:
            namespacePlant.response(404, 'Entity not found')
