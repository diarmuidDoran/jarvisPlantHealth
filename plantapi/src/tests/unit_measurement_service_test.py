import unittest
from unittest import mock
from src.blueprints.services.unit_measurement_service import *


class UnitMeasurementServiceTest(unittest.TestCase):
    @mock.patch(
        "src.blueprints.services.unit_measurement_service.get_unit_measurement_dtos"
    )
    def test_unit_measurement_service_get_unit_measurements_returns_empty_array(
        self, get_unit_measurement_dtos_mock
    ):
        expected_result = []
        get_unit_measurement_dtos_mock.return_value = []

        result = get_unit_measurements()

        self.assertEqual(result, expected_result)
        get_unit_measurement_dtos_mock.assert_called()


if __name__ == "__main__":
    unittest.main()
