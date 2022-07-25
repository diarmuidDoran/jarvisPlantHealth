import unittest
from unittest.mock import patch
from unittest import mock
from blueprints.services.unit_measurement_service import *


class UnitMeasurementServiceTest(unittest.TestCase):

    @mock.patch('blueprints.services.unit_measurement_service.get_unit_measurement_dtos')
    def test_unit_measurement_service_get_unit_measurements_returns_empty_array_2(self, get_unit_measurement_dtos_mock):
            expected_result = []
            get_unit_measurement_dtos_mock.return_value = []

            result = get_unit_measurements()

            self.assertEqual(result, expected_result)
            get_unit_measurement_dtos_mock.assert_called()

if __name__ == '__main__':
    unittest.main()