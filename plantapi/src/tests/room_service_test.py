import json
import unittest
from unittest import mock

from flask_restx import marshal

from src.blueprints.services.room_service import *
from src.blueprints.swagger_models.rooms import room_model, room_list_model


class RoomServiceTest(unittest.TestCase):
    @mock.patch("src.blueprints.services.room_service.getRoomDtos")
    def test_room_service_get_rooms_returns_empty_array(self, get_room_dtos_mock):
        expected_result = []
        get_room_dtos_mock.return_value = []

        result = get_rooms()

        self.assertEqual(result, expected_result)
        get_room_dtos_mock.assert_called()

    @mock.patch("src.blueprints.services.room_service.getRoomDtos")
    def test_room_service_get_rooms_returns_array(self, get_room_dtos_mock):
        expected_result = [{"id": 1, "name": "test1"}, {"id": 2, "name": "test2"}]

        room_models = []
        for result in expected_result:
            room_models.append(make_room(result["id"], result["name"], False))

        get_room_dtos_mock.return_value = room_models

        result = get_rooms()
        new_result = json.loads(json.dumps(marshal(result, room_model)))

        self.assertEqual(new_result, expected_result)
        get_room_dtos_mock.assert_called()

    @mock.patch("src.blueprints.services.room_service.addRoomDto")
    def test_room_service_post_rooms(self, add_room_dtos_mock):
        expected_result = {"test"}
        add_room_dtos_mock.return_value = {"test"}

        result = post_room("test", False)

        self.assertEqual(result, expected_result)
        add_room_dtos_mock.assert_called()

    def room_by_id_results(
        self,
        id,
        expected_plants_result,
        expected_room_result,
        expected_result,
        get_plant_dtos_mock,
        get_room_dto_by_id_mock,
    ):
        room_plant_models = []
        for plant_result in expected_plants_result:
            if plant_result["room_id"] == expected_room_result["id"]:
                room_plant_models.append(
                    make_plant(
                        plant_result["id"],
                        plant_result["name"],
                        plant_result["room_id"],
                        False,
                    )
                )

        get_plant_dtos_mock.return_value = room_plant_models

        get_room_dto_by_id_mock.return_value = make_room_with_plant_list(
            expected_room_result["id"], expected_room_result["name"], False, room_plant_models
        )

        result = get_room_by_id(id)
        new_result = json.loads(json.dumps(marshal(result, room_list_model)))

        self.assertEqual(new_result, expected_result)
        get_room_dto_by_id_mock.assert_called()

    @mock.patch("src.blueprints.services.room_service.getRoomDtoById")
    @mock.patch("src.blueprints.services.room_service.getPlants")
    def test_room_service_get_room_by_id_returns_room(
        self, get_plant_dtos_mock, get_room_dto_by_id_mock
    ):
        # and test for one matching plant
        id = 1
        expected_room_result = {"id": 1, "name": "test1"}
        expected_plants_result = [
            {"id": 1, "name": "TPlant1", "room_id": 1},
            {"id": 2, "name": "TPlant2", "room_id": 2},
        ]

        expected_result = {
            "id": 1,
            "name": "test1",
            "plants": [{"id": 1, "name": "TPlant1", "room_id": 1}],
        }
        self.room_by_id_results(
            id,
            expected_plants_result,
            expected_room_result,
            expected_result,
            get_plant_dtos_mock,
            get_room_dto_by_id_mock,
        )

    @mock.patch("src.blueprints.services.room_service.getRoomDtoById")
    @mock.patch("src.blueprints.services.room_service.getPlants")
    def test_room_service_get_room_by_id_returns_room_with_many_plants(
        self, get_plant_dtos_mock, get_room_dto_by_id_mock
    ):
        # and test for many matching plants
        id = 1
        expected_room_result = {"id": 1, "name": "test1"}
        expected_plants_result = [
            {"id": 1, "name": "TPlant1", "room_id": 1},
            {"id": 2, "name": "TPlant2", "room_id": 1},
            {"id": 3, "name": "TPlant3", "room_id": 1},
            {"id": 4, "name": "TPlant4", "room_id": 1},
        ]

        expected_result = {
            "id": 1,
            "name": "test1",
            "plants": [
                {"id": 1, "name": "TPlant1", "room_id": 1},
                {"id": 2, "name": "TPlant2", "room_id": 1},
                {"id": 3, "name": "TPlant3", "room_id": 1},
                {"id": 4, "name": "TPlant4", "room_id": 1},
            ],
        }

        self.room_by_id_results(
            id,
            expected_plants_result,
            expected_room_result,
            expected_result,
            get_plant_dtos_mock,
            get_room_dto_by_id_mock,
        )

    @mock.patch("src.blueprints.services.room_service.getRoomDtoById")
    @mock.patch("src.blueprints.services.room_service.getPlants")
    def test_room_service_get_room_by_id_returns_room_with_no_plants(
        self, get_plant_dtos_mock, get_room_dto_by_id_mock
    ):
        # test for no matching plants
        id = 1
        expected_room_result = {"id": 1, "name": "test1"}
        expected_plants_result = [
            {"id": 1, "name": "TPlant1", "room_id": 2},
            {"id": 2, "name": "TPlant2", "room_id": 2},
        ]

        expected_result = {"id": 1, "name": "test1", "plants": []}

        self.room_by_id_results(
            id,
            expected_plants_result,
            expected_room_result,
            expected_result,
            get_plant_dtos_mock,
            get_room_dto_by_id_mock,
        )

    @mock.patch("src.blueprints.services.room_service.updateRoomDtoById")
    def test_room_service_update_room_by_id(self, update_room_by_id_mock):
        expected_result = {"test1"}
        update_room_by_id_mock.return_value = {"test1"}

        result = update_room_by_id(5, "test1")

        self.assertEqual(result, expected_result)
        update_room_by_id_mock.assert_called()


if __name__ == "__main__":
    unittest.main()
