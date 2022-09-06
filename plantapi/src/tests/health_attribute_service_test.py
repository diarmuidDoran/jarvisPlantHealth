import json
import unittest
from unittest import mock

from flask_restx import marshal

from src.blueprints.services.health_attribute_service import *
from src.blueprints.swagger_models.health_attributes import *


class HealthAttributeServiceTest(unittest.TestCase):
    @mock.patch(
        "src.blueprints.services.health_attribute_service.get_health_attribute_dtos"
    )
    def test_health_attribute_get_health_attribute_returns_empty_array(
        self, get_health_attributes_dtos_mock
    ):
        expected_result = []
        get_health_attributes_dtos_mock.return_value = []

        result = get_health_attributes()

        self.assertEqual(result, expected_result)
        get_health_attributes_dtos_mock.assert_called()

    @mock.patch(
        "src.blueprints.services.health_attribute_service.get_health_attribute_dtos"
    )
    def test_room_service_get_rooms_returns_array(
        self, get_health_attributes_dtos_mock
    ):
        expected_result = [{"id": 1, "name": "test1"}, {"id": 2, "name": "test2"}]

        health_attribute_models = []
        for result in expected_result:
            health_attribute_models.append(
                make_health_attribute(result["id"], result["name"])
            )

        get_health_attributes_dtos_mock.return_value = health_attribute_models

        result = get_health_attributes()
        new_result = json.loads(json.dumps(marshal(result, health_attribute_model)))

        self.assertEqual(new_result, expected_result)
        get_health_attributes_dtos_mock.assert_called()
