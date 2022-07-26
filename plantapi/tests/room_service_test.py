import unittest
from unittest import mock
from blueprints.services.room_service import *


class RoomServiceTest(unittest.TestCase):

    @mock.patch('blueprints.services.unit_measurement_service.get_unit_measurement_dtos')
    def test_room_service_get_unit_measurements_returns_empty_array(self, getRoomDtos_mock):
            expected_result = []
            get_unit_measurement_dtos_mock.return_value = []

            result = getRooms()

            self.assertEqual(result, expected_result)
            get_unit_measurement_dtos_mock.assert_called()

if __name__ == '__main__':
    unittest.main()