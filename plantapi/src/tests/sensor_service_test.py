import json
import unittest
from unittest import mock

from flask_restx import marshal

from blueprints.services.sensor_reading_service import postSensorReading
from blueprints.services.sensor_service import *
from blueprints.swagger_models.sensors import *


class SensorServiceTest(unittest.TestCase):
    @mock.patch("blueprints.services.sensor_service.getSensorDtos")
    def test_sensor_service_get_sensors_returns_empty_array(self, get_sensor_dtos_mock):
        expected_result = []
        get_sensor_dtos_mock.return_value = []

        result = getSensors()

        self.assertEqual(result, expected_result)
        get_sensor_dtos_mock.assert_called()

    @mock.patch("blueprints.services.sensor_service.getSensorDtos")
    def test_sensor_service_get_sensors_returns_array(self, get_sensor_dtos_mock):
        expected_result = [
            {
                "id": 1,
                "sensor_name": "TestSensor",
                "call_frequency": "5*****",
                "connection_pin": 1
            },
            {
                "id": 2,
                "sensor_name": "TestSensor2",
                "call_frequency": "5*****",
                "connection_pin": 2
            },
        ]

        sensor_models = []
        for result in expected_result:
            sensor_models.append(
                make_sensor(
                    result["id"], result["sensor_name"], result["call_frequency"], result["connection_pin"], False
                )
            )

        get_sensor_dtos_mock.return_value = sensor_models

        result = getSensors()
        new_result = json.loads(json.dumps(marshal(result, sensor_model)))

        self.assertEqual(new_result, expected_result)
        get_sensor_dtos_mock.assert_called()

    @mock.patch("blueprints.services.sensor_service.addSensorDto")
    def test_sensor_service_post_sensor(self, add_sensor_dtos_mock):
        expected_result = {"TestSensor", "5*****", 1}
        add_sensor_dtos_mock.return_value = {"TestSensor", "5*****", 1}

        result = postSensor("TestSensor", "5*****", 1)

        self.assertEqual(result, expected_result)
        add_sensor_dtos_mock.assert_called()

    @mock.patch("blueprints.services.sensor_service.getSensorDtoById")
    def test_sensor_service_get_sensor_by_id_returns_sensor(self, get_sensor_dto_mock):
        id = 1
        expected_result = {
            "id": 1,
            "sensor_name": "TestSensor",
            "call_frequency": "5*****",
            "connection_pin": 1
        }

        get_sensor_dto_mock.return_value = make_sensor(
            expected_result["id"],
            expected_result["sensor_name"],
            expected_result["call_frequency"],
            expected_result["connection_pin"],
            False
        )

        result = getSensorById(id)
        new_result = json.loads(json.dumps(marshal(result, sensor_model)))

        self.assertEqual(new_result, expected_result)
        get_sensor_dto_mock.assert_called()

    @mock.patch("blueprints.services.sensor_reading_service.addSensorReadingDto")
    def test_sensor_reading_service_post_sensor_sensor_reading(
        self, add_sensor_reading_dtos_mock
    ):
        id = 1

        expected_result = {12, "2022-07-29 13:32:19"}
        add_sensor_reading_dtos_mock.return_value = {12, "2022-07-29 13:32:19"}

        result = postSensorReading(12, "2022-07-29 13:32:19", id)

        self.assertEqual(result, expected_result)
        add_sensor_reading_dtos_mock.assert_called()
