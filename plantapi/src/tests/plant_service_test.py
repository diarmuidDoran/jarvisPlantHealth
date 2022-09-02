import json
import unittest
from unittest import mock
from flask_restx import marshal

from blueprints.services.plant_health_attribute_service import *
from blueprints.services.plant_service import *
from blueprints.swagger_models.plants import plant_model, plant_health_attribute_model


class PlantServiceTest(unittest.TestCase):
    @mock.patch("blueprints.services.plant_service.getPlantDtos")
    def test_plant_service_get_plants_returns_empty_array(self, get_plant_dtos_mock):
        expected_result = []
        get_plant_dtos_mock.return_value = []

        result = getPlants()

        self.assertEqual(result, expected_result)
        get_plant_dtos_mock.assert_called()

    @mock.patch("blueprints.services.plant_service.getPlantDtos")
    def test_plant_service_get_plants_returns_array(self, get_plant_dtos_mock):
        expected_result = [
            {"id": 1, "name": "TPlant1", "room_id": 1},
            {"id": 2, "name": "TPlant2", "room_id": 2},
        ]

        plant_models = []
        for result in expected_result:
            plant_models.append(
                make_plant(result["id"], result["name"], result["room_id"])
            )

        get_plant_dtos_mock.return_value = plant_models

        result = getPlants()
        new_result = json.loads(json.dumps(marshal(result, plant_model)))

        self.assertEqual(new_result, expected_result)
        get_plant_dtos_mock.assert_called()

    @mock.patch("blueprints.services.plant_service.addPlantDto")
    def test_plant_service_post_plant(self, add_plant_dtos_mock):
        expected_result = {"test1", 1}
        add_plant_dtos_mock.return_value = {"test1", 1}

        result = postPlant("test1", 1)

        self.assertEqual(result, expected_result)
        add_plant_dtos_mock.assert_called()

    @mock.patch("blueprints.services.plant_service.getPlantDtoById")
    def test_plant_service_get_plant_by_id_returns_plant(self, get_plant_dto_mock):
        id = 1
        expected_plant_result = {"id": 1, "name": "test1", "room_id": 1}

        get_plant_dto_mock.return_value = make_plant(
            expected_plant_result["id"],
            expected_plant_result["name"],
            expected_plant_result["room_id"],
        )

        result = getPlantById(id)
        new_result = json.loads(json.dumps(marshal(result, plant_model)))

        self.assertEqual(new_result, expected_plant_result)
        get_plant_dto_mock.assert_called()

    @mock.patch("blueprints.services.plant_service.updatePlantDtoById")
    def test_plant_service_update_plant_by_id(self, update_plant_by_id_mock):
        id = 1
        expected_result = {
            "name": "update1",
            "room_id": 1,
        }

        update_plant_by_id_mock.return_value = {"name": "update1", "room_id": 1}

        result = updatePlantById(id, "update1", 1)

        self.assertEqual(result, expected_result)
        update_plant_by_id_mock.assert_called()

    @mock.patch(
        "blueprints.services.plant_health_attribute_service.addPlantHealthAttributeDto"
    )
    def test_plant_health_attribute_service_post_plant_health_attribute(
        self, add_plant_health_attribute_dtos_mock
    ):
        expected_result = {2, 1, 1, 1, 1}
        add_plant_health_attribute_dtos_mock.return_value = {2, 1, 1, 1, 1}

        result = postPlantHealthAttribute(2, 1, 1, 1, 1)

        self.assertEqual(result, expected_result)
        add_plant_health_attribute_dtos_mock.assert_called()

    @mock.patch(
        "blueprints.services.plant_health_attribute_service.getPlantHealthAttributeDtoById"
    )
    def test_plant_health_attribute_service_get_plant_health_attribute_by_id_returns_plant_health_attribute(
        self, get_plant_health_attribute_dto_mock
    ):
        plant_id = 1
        plant_health_attribute_id = 1
        expected_plant_health_attribute_result = {
            "id": 1,
            "upper_required_value": 2,
            "lower_required_value": 1,
            "unit_measurement_id": 1,
            "plant_id": 1,
            "health_attribute_id": 1,
            "sensor_b": []
        }

        get_plant_health_attribute_dto_mock.return_value = make_plant_health_attribute(
            expected_plant_health_attribute_result["id"],
            expected_plant_health_attribute_result["upper_required_value"],
            expected_plant_health_attribute_result["lower_required_value"],
            expected_plant_health_attribute_result["unit_measurement_id"],
            expected_plant_health_attribute_result["plant_id"],
            expected_plant_health_attribute_result["health_attribute_id"],
            expected_plant_health_attribute_result["sensor_b"]
        )

        result = getPlantHealthAttributeById(plant_health_attribute_id, plant_id)
        new_result = json.loads(
            json.dumps(marshal(result, plant_health_attribute_model))
        )

        self.assertEqual(new_result, expected_plant_health_attribute_result)
        get_plant_health_attribute_dto_mock.assert_called()

    @mock.patch(
        "blueprints.services.plant_health_attribute_service.updatePlantHealthAttributeDtoById"
    )
    def test_plant_health_attribute_service_update_plant_health_attribute_by_id(
        self, update_plant_health_attribute_by_id_mock
    ):
        id = 1
        expected_result = {
            "upper_required_value": 2,
            "lower_required_value": 1,
            "unit_measurement_id": 1,
            "plant_id": 1,
            "health_attribute_id": 1,
        }

        update_plant_health_attribute_by_id_mock.return_value = {
            "upper_required_value": 2,
            "lower_required_value": 1,
            "unit_measurement_id": 1,
            "plant_id": 1,
            "health_attribute_id": 1,
        }

        result = updatePlantHealthAttributeById(id, 2, 1, 1, 1, 1)

        self.assertEqual(result, expected_result)
        update_plant_health_attribute_by_id_mock.assert_called()
