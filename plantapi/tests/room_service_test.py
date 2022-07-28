import unittest
from unittest import mock
from blueprints.services.room_service import *


class RoomServiceTest(unittest.TestCase):

    @mock.patch('blueprints.services.room_service.getRoomDtos')
    def test_room_service_get_rooms_returns_empty_array(self, get_room_dtos_mock):
        expected_result = []
        get_room_dtos_mock.return_value = []

        result = get_rooms()

        self.assertEqual(result, expected_result)
        get_room_dtos_mock.assert_called()

    # Make one with return values
    @mock.patch('blueprints.services.room_service.getRoomDtos')
    def test_room_service_get_rooms_returns_array(self, get_room_dtos_mock):
        expected_result = [
            {'id': 1,
             'name': 'test1'
             }
        ]
        get_room_dtos_mock.return_value = [
            {'id': 1,
             'name': 'test1'
             }
        ]

        result = get_rooms()

        self.assertEqual(result, expected_result)
        get_room_dtos_mock.assert_called()


    @mock.patch('blueprints.services.room_service.addRoomDto')
    def test_room_service_add_rooms(self, add_room_dtos_mock):
        expected_result = {'test'}
        add_room_dtos_mock.return_value = {'test'}

        result = post_room('test')

        self.assertEqual(result, expected_result)
        add_room_dtos_mock.assert_called()


    @mock.patch('blueprints.services.room_service.getRoomDtoById')
    @mock.patch('blueprints.services.room_service.getPlants')
    def test_room_service_get_room_by_id_returns_room(self, get_plants_mock, get_room_dto_by_id_mock):
        # fix representative data
        expected_result = {'test-room'}
        get_room_dto_by_id_mock.return_value = {'test-room'}
        get_plants_mock.return_value = [1]

        id = 1
        result = get_room_by_id(id)

        self.assertEqual(result, expected_result)
        get_room_dto_by_id_mock.assert_called()

        # test for no matching room
        # test for one matching plant
        #test for many matching plants
        #test for no matching plants

    @mock.patch('blueprints.services.room_service.updateRoomDtoById')
    def test_room_service_update_rooms(self, update_room_by_id_mock):
        expected_result = {'test1'}
        update_room_by_id_mock.return_value = {'test1'}

        result = update_room_by_id(5, 'test1')

        self.assertEqual(result, expected_result)
        update_room_by_id_mock.assert_called()


if __name__ == '__main__':
    unittest.main()
