# blueprints.documented_endpoints/rooms/__init__.py
import os
from http import HTTPStatus
from flask import request
from flask_restx import Resource
from blueprints.services.room_service import *
from blueprints.services.plant_service import *
from blueprints.services.plant_health_attribute_service import *
from blueprints.services.sensor_service import (
    getSensorPlantHealthAttribute, deleteSensorpostSensorPlantHealthAttributeRelationship,
)
from blueprints.validations.room_validation import room_is_valid
from blueprints.swagger_models.rooms import (
    room_list_model,
    namespaceRoom,
    room_model,
)

room_example = {"id": 1, "name": "Room name"}


@namespaceRoom.route("")
class rooms(Resource):
    """Get rooms list and create new rooms"""

    @namespaceRoom.response(500, "Internal Server error")
    @namespaceRoom.marshal_list_with(room_model)
    def get(self):
        rooms = get_rooms()
        return rooms

    @namespaceRoom.response(400, "Entity with the given name already exists")
    @namespaceRoom.response(500, "Internal Server error")
    @namespaceRoom.expect(room_model)
    @namespaceRoom.marshal_with(room_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new room"""
        name = request.json["name"]
        is_deleted = False
        if room_is_valid(name) is not True:
            namespaceRoom.abort(400, "Room with the given name already exists")
        add_room = post_room(name, is_deleted)
        return add_room, 201


@namespaceRoom.route("/<int:room_id>")
class room(Resource):
    """Read, update and delete a specific room"""

    @namespaceRoom.response(404, "Room not found")
    @namespaceRoom.response(500, "Internal Server error")
    @namespaceRoom.marshal_with(room_list_model)
    def get(self, room_id):
        """Get room_example information"""
        room = get_room_by_id(room_id)

        if room is None:
            namespaceRoom.abort(404, "Room not found")

        return room

    @namespaceRoom.response(400, "Room with the given name already exists")
    @namespaceRoom.response(404, "Room not found")
    @namespaceRoom.response(500, "Internal Server error")
    @namespaceRoom.expect(room_model, validate=True)
    @namespaceRoom.marshal_with(room_model)
    def put(self, room_id):
        if get_room_by_id(room_id) is None:
            namespaceRoom.abort(404, "Room not found")
        """Update room information"""
        new_name = request.json["name"]
        if room_is_valid(new_name) is not True:
            namespaceRoom.abort(400, "Room with the given name already exists")
        # get_room_by_id check if it exists
        updated_room = update_room_by_id(room_id, new_name)

        return updated_room

    @namespaceRoom.response(204, "Request Success (No Content)")
    @namespaceRoom.response(404, "Room not found")
    @namespaceRoom.response(500, "Internal Server error")
    def delete(self, room_id):
        if get_room_by_id(room_id) is None:
            namespaceRoom.abort(404, "Room not found")
        """Delete a specific room entity"""
        delete_room = delete_room_by_id(room_id)

        room_plant_models = []
        for roomPlantDto in getPlants():
            if (roomPlantDto.room_id == room_id) and (roomPlantDto.is_deleted == False):
                room_plant_models.append(
                    make_plant(
                        roomPlantDto.id,
                        roomPlantDto.name,
                        roomPlantDto.room_id,
                        roomPlantDto.is_deleted,
                    )
                )
        plant_health_attributes_list = getPlantHealthAttributes()
        sensor_plant_health_attribute_relationships = getSensorPlantHealthAttribute()

        for room_plant in room_plant_models:
            deletePlantById(room_plant.id)
            for plant_health_attribute in plant_health_attributes_list:
                if (plant_health_attribute.plant_id == room_plant.id) and (
                    plant_health_attribute.is_deleted == False
                ):
                    deletePlantHealthAttributeById(plant_health_attribute.id)
                # if the plant health attributes is deleted, delete all associated sensor relationships
                for (
                    sensor_plant_health_attribute
                ) in sensor_plant_health_attribute_relationships:
                    if (
                        sensor_plant_health_attribute.plant_health_attribute_id
                        == plant_health_attribute.id
                    ) and (sensor_plant_health_attribute.is_deleted == False):
                        deleteSensorpostSensorPlantHealthAttributeRelationship(sensor_plant_health_attribute.id)

        return delete_room, 204
