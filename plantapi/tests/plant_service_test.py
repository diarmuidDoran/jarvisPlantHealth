import json
import unittest
from unittest import mock
from flask_restx import marshal
from blueprints.services.plant_service import *
from blueprints.swagger_models.plants import plant_model


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
            {"id": 2, "name": "TPlant2", "room_id": 2}
        ]

        plant_models = []
        for result in expected_result:
            plant_models.append(make_plant(result["id"], result["name"], result["room_id"]))

        get_plant_dtos_mock.return_value = plant_models

        result = getPlants()
        new_result = json.loads(json.dumps(marshal(result, plant_model)))

        self.assertEqual(new_result, expected_result)
        get_plant_dtos_mock.assert_called()