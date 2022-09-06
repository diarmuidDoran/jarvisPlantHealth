# src.blueprints.documented_endpoints/plants/__init__.py
from http import HTTPStatus
from flask import request
from flask_restx import Resource

from src.blueprints.services.plant_service import *
from src.blueprints.services.plant_health_attribute_service import *
from src.blueprints.services.sensor_service import (
    getSensorPlantHealthAttribute,
)
from src.blueprints.validations.plant_health_attribute_validation import (
    plant_health_attribute_is_valid,
)
from src.blueprints.validations.plant_validation import (
    plant_is_valid,
    plant_id_is_valid,
    plant_new_name_is_valid,
)
from src.blueprints.swagger_models.plants import (
    namespacePlant,
    plant_plant_health_attribute_list_model,
    plant_model,
    plant_health_attribute_model,
    plant_list_model,
    plant_health_attribute_sensor_model,
    plant_plant_health_attribute_sensor_list_model,
    plant_health_attribute_request_model,
    plant_model_request,
)
from src.blueprints.validations.user_account_validation import user_id_is_valid


@namespacePlant.route("")
class plants(Resource):
    """Get plants list and create new plants"""

    @namespacePlant.response(500, "Internal Server error")
    @namespacePlant.marshal_list_with(plant_model)
    def get(self):
        plant_list = getPlants()
        return plant_list

    @namespacePlant.response(400, "Plant with the given name already exists")
    @namespacePlant.response(500, "Internal Server error")
    @namespacePlant.expect(plant_model_request)
    @namespacePlant.marshal_with(plant_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new plant"""
        data = request.get_json()
        name = data.get("name")
        room_id = data.get("room_id")
        is_delete = False

        if plant_is_valid(name) is not True:
            namespacePlant.abort(400, "Plant with the given name already exists")

        add_plant = postPlant(name, room_id, is_delete)

        return add_plant, 201


@namespacePlant.route("/<int:plant_id>")
class plant(Resource):
    """Read, update and delete a specific plant"""

    @namespacePlant.response(404, "Plant not found")
    @namespacePlant.response(500, "Internal Server error")
    @namespacePlant.marshal_with(plant_list_model)
    def get(self, plant_id):
        if getPlantById(plant_id) is None:
            namespacePlant.abort(404, "Plant not found")

        plant_search = getPlantById(plant_id)
        return plant_search

    @namespacePlant.response(400, "Plant with the given name already exists")
    @namespacePlant.response(404, "Plant not found")
    @namespacePlant.response(500, "Internal Server error")
    @namespacePlant.expect(plant_model_request, validate=True)
    @namespacePlant.marshal_with(plant_model)
    def put(self, plant_id):

        if getPlantById(plant_id) is None:
            namespacePlant.abort(404, "Plant not found")

        """Update specific plant information"""
        data = request.get_json()
        id = data.get("id")
        new_name = data.get("name")
        new_room_id = data.get("room_id")

        if plant_new_name_is_valid(id, new_name) is not True:
            namespacePlant.abort(400, "Plant with the given name already exists")

        updated_plant = updatePlantById(plant_id, new_name, new_room_id)

        return updated_plant, 201

    @namespacePlant.response(204, "Request Success (No Content)")
    @namespacePlant.response(404, "Plant not found")
    @namespacePlant.response(500, "Internal Server error")
    def delete(self, plant_id):

        if getPlantById(plant_id) is None:
            namespacePlant.abort(404, "Plant not found")

        """Delete a specific plant entity"""
        delete_plant = deletePlantById(plant_id)
        # if the plant is deleted, delete all associated plant health attributes
        if getPlantById(plant_id) is None:
            plant_health_attributes_list = getPlantHealthAttributes()
            sensor_plant_health_attribute_relationships = (
                getSensorPlantHealthAttribute()
            )
            for plant_health_attribute in plants_health_attributes_list:
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

        return delete_plant, 204


@namespacePlant.route("/<int:plant_id>/plant_user_relationship/<int:user_id>")
class plant_user_relationship(Resource):
    """Post and Delete plant to user relationships"""

    @namespacePlant.response(404, "Plant id or user_id not found")
    @namespacePlant.response(400, "Plant id and User id already share a relationship")
    @namespacePlant.response(201, "Relationship added")
    @namespacePlant.response(500, "Internal Server error")
    def post(self, plant_id, user_id):
        """Create a new plant user relationship"""

        if (plant_id_is_valid(plant_id) is not True) or (
            user_id_is_valid(user_id) is not True
        ):
            namespacePlant.abort(404, "Plant id or user_id not found")

        postPlantUser(plant_id, user_id)

        return 201


@namespacePlant.route("/<int:plant_id>/plant_health_attributes")
class plant_health_attributes(Resource):
    """Read list of health attributes for a specific plant"""

    @namespacePlant.response(404, "Plant not found")
    @namespacePlant.response(500, "Internal Server error")
    @namespacePlant.marshal_with(plant_plant_health_attribute_sensor_list_model)
    def get(self, plant_id):

        if getPlantById(plant_id) is None:
            namespacePlant.abort(404, "Plant not found")

        """List with all a specific plants health attributes"""
        plant_health_attributes_list = getPlantHealthAttributes()
        plants_plant_health_attribute_list = getPlantHealthAttributesByPlantId(
            plant_id, plant_health_attributes_list
        )

        return plants_plant_health_attribute_list

    @namespacePlant.response(404, "Plant not found")
    @namespacePlant.response(400, "Plant health attribute already exists")
    @namespacePlant.response(500, "Internal Server error")
    @namespacePlant.expect(plant_health_attribute_request_model)
    @namespacePlant.marshal_with(plant_health_attribute_model, code=HTTPStatus.CREATED)
    def post(self, plant_id):

        if getPlantById(plant_id) is None:
            namespacePlant.abort(404, "Plant not found")

        """Create a new plant health attribute for a specific plant"""
        data = request.get_json()
        upper_required_value = data.get("upper_required_value")
        lower_required_value = data.get("lower_required_value")
        unit_measurement_id = data.get("unit_measurement_id")
        plant_id = plant_id
        health_attribute_id = data.get("health_attribute_id")

        if plant_health_attribute_is_valid(plant_id, health_attribute_id) is not True:
            namespacePlant.abort(400, "Plant health attribute already exists")

        add_plant_health_attribute = postPlantHealthAttribute(
            upper_required_value,
            lower_required_value,
            unit_measurement_id,
            plant_id,
            health_attribute_id,
        )
        return add_plant_health_attribute, 201


@namespacePlant.route(
    "/<int:plant_id>/plant_health_attributes/<int:plant_health_attribute_id>"
)
class plant_health_attribute(Resource):

    """Read, update and delete a specific plant health attribute"""

    @namespacePlant.response(
        404,
        "This specific plant health attribute is not associated to this plant "
        "or does not yet exist",
    )
    @namespacePlant.response(500, "Internal Server error")
    @namespacePlant.marshal_with(plant_health_attribute_sensor_model)
    def get(self, plant_id, plant_health_attribute_id):
        """Get specific plant health attribute information"""
        plant_health_attribute = {}
        for plantHealthAttribute in getPlantHealthAttributes():
            if (plantHealthAttribute.plant_id == plant_id) and (
                plantHealthAttribute.id == plant_health_attribute_id
            ):
                plant_health_attribute = getPlantHealthAttributesById(
                    plant_health_attribute_id
                )

        if plant_health_attribute:
            return plant_health_attribute, 201
        else:
            namespacePlant.abort(
                404,
                "This specific plant health attribute is not associated to this plant "
                "or does not yet exist",
            )

    @namespacePlant.response(404, "Plant health attribute not found")
    @namespacePlant.response(500, "Internal Server error")
    @namespacePlant.expect(plant_health_attribute_request_model, validate=True)
    @namespacePlant.marshal_with(plant_health_attribute_model)
    def put(self, plant_id, plant_health_attribute_id):
        """Update specific plant health attribute information"""

        data = request.get_json()
        upper_required_value = data.get("upper_required_value")
        lower_required_value = data.get("lower_required_value")
        unit_measurement_id = data.get("unit_measurement_id")
        plant_id = plant_id
        health_attribute_id = data.get("health_attribute_id")

        if plant_health_attribute_is_valid(plant_id, health_attribute_id) is not True:
            updated_plant = updatePlantHealthAttributeById(
                plant_health_attribute_id,
                upper_required_value,
                lower_required_value,
                unit_measurement_id,
                plant_id,
                health_attribute_id,
            )
            return updated_plant
        else:
            namespacePlant.abort(404, "Plant health attribute not found")

    @namespacePlant.response(204, "Request Success (No Content)")
    @namespacePlant.response(404, "Entity not found")
    @namespacePlant.response(500, "Internal Server error")
    def delete(self, plant_id, plant_health_attribute_id):
        """Delete a specific plant entity"""

        if getPlantById(plant_id) is None:
            namespacePlant.abort(404, "Plant not found")

        if getPlantHealthAttributesById(plant_health_attribute_id) is None:
            namespacePlant.abort(404, "Plant Health attribute not found")

        delete_plant_health_attribute = deletePlantHealthAttributeById(
            plant_health_attribute_id
        )
        # if the plant health attributes is deleted, delete all associated sensor relationships
        sensor_plant_health_attribute_relationships = getSensorPlantHealthAttribute()
        for (
            sensor_plant_health_attribute
        ) in sensor_plant_health_attribute_relationships:
            if (
                sensor_plant_health_attribute.plant_health_attribute_id
                == plant_health_attribute_id
            ) and (sensor_plant_health_attribute.is_deleted == False):
                deleteSensorpostSensorPlantHealthAttributeRelationship(sensor_plant_health_attribute.id)

        return delete_plant_health_attribute, 204
