import json
import unittest
from unittest import mock

import requests.models
from flask_restx import marshal

from blueprints.services.room_service import *
from blueprints.swagger_models.rooms import room_model, room_list_model
from blueprints.swagger_models.plants import plant_model


class RoomServiceTest(unittest.TestCase):
    @mock.patch("blueprints.services.room_service.getRoomDtos")
    def test_room_service_get_rooms_returns_empty_array(self, get_room_dtos_mock):
        expected_result = []
        get_room_dtos_mock.return_value = []

        result = get_rooms()

        self.assertEqual(result, expected_result)
        get_room_dtos_mock.assert_called()

    @mock.patch("blueprints.services.room_service.getRoomDtos")
    def test_room_service_get_rooms_returns_array(self, get_room_dtos_mock):
        expected_result = [
                           {"id": 1, "name": "test1"},
                           {"id": 2, "name": "test2"}
                           ]

        room_models = []
        for result in expected_result:
            room_models.append(make_room(result["id"], result["name"]))

        get_room_dtos_mock.return_value = room_models

        result = get_rooms()
        new_result = json.loads(json.dumps(marshal(result, room_model)))

        self.assertEqual(new_result, expected_result)
        get_room_dtos_mock.assert_called()

    @mock.patch("blueprints.services.room_service.addRoomDto")
    def test_room_service_add_rooms(self, add_room_dtos_mock):
        expected_result = {"test"}
        add_room_dtos_mock.return_value = {"test"}

        result = post_room("test")

        self.assertEqual(result, expected_result)
        add_room_dtos_mock.assert_called()

    @mock.patch("blueprints.services.room_service.getRoomDtoById")
    @mock.patch("blueprints.services.room_service.getPlants")
    def test_room_service_get_room_by_id_returns_room(self, get_plant_dtos_mock, get_room_dto_by_id_mock):
        # fix representative data
        id = 1
        expected_room_result = {"id": 1, "name": "test1"}
        expected_plants_result = [{"id": 1, "name": "TPlant1", "room_id": 1},
                                  {"id": 2, "name": "TPlant2", "room_id": 2}
                                  ]

        expected_result = {"id": 1,
                           "name": "test1",
                           "plants": [
                               {"id": 1,
                                "name": "TPlant1",
                                "room_id": 1
                                }
                           ]
                           }

        room_plant_models = []
        for plant_result in expected_plants_result:
            if plant_result['room_id'] == expected_room_result['id']:
                room_plant_models.append(
                    make_plant(plant_result['id'], plant_result['name'], plant_result['room_id'])
                )

        get_plant_dtos_mock.return_value = room_plant_models

        get_room_dto_by_id_mock.return_value = make_room_with_plant_list(expected_room_result['id'],
                                                                         expected_room_result['name'],
                                                                         room_plant_models)

        result = get_room_by_id(id)
        new_result = json.loads(json.dumps(marshal(result, room_list_model)))

        self.assertEqual(new_result, expected_result)
        get_room_dto_by_id_mock.assert_called()

    # test for no matching room
    @mock.patch("blueprints.services.room_service.getRoomDtoById")
    @mock.patch("blueprints.services.room_service.getPlants")
    def test_room_service_get_room_by_id_returns_no_room(self, get_plant_dtos_mock, get_room_dto_by_id_mock):
        # fix representative data
        id = 7
        expected_room_result = {"id": 1, "name": "test1"}
        expected_plants_result = [{"id": 1, "name": "TPlant1", "room_id": 1},
                                  {"id": 2, "name": "TPlant2", "room_id": 2}
                                  ]
        mock_resp = requests.models.Response()

        mock_resp.status_code = 404

        get_room_dto_by_id_mock.return_value = mock_resp
        # res = requests

        # result = get_room_by_id(id)
        # new_result = json.loads(json.dumps(marshal(result, room_list_model)))
        #
        # self.assertEqual(new_result, )
        # get_room_dto_by_id_mock.assert_called()

    # test for one matching plant

    # test for many matching plants

    # test for no matching plants

    @mock.patch("blueprints.services.room_service.updateRoomDtoById")
    def test_room_service_update_rooms(self, update_room_by_id_mock):
        expected_result = {"test1"}
        update_room_by_id_mock.return_value = {"test1"}

        result = update_room_by_id(5, "test1")

        self.assertEqual(result, expected_result)
        update_room_by_id_mock.assert_called()


if __name__ == "__main__":
    unittest.main()
