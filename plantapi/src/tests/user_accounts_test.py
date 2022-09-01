import json
import unittest
from unittest import mock

from flask_restx import marshal

from blueprints.services.user_account_service import *
from blueprints.swagger_models.user_accounts import *


class UserAccountServiceTest(unittest.TestCase):
    @mock.patch("blueprints.services.user_account_service.get_user_account_dtos")
    def test_user_account_service_get_user_account_returns_empty_array(
        self, get_user_account_dtos_mock
    ):
        expected_result = []
        get_user_account_dtos_mock.return_value = []

        result = get_user_accounts()

        self.assertEqual(result, expected_result)
        get_user_account_dtos_mock.assert_called()

    @mock.patch("blueprints.services.user_account_service.get_user_account_dtos")
    def test_user_account_service_get_user_account_returns_array(
        self, get_user_account_dtos_mock
    ):
        expected_result = [
            {
                "id": 1,
                "user_name": "test1",
                "first_name": "test",
                "last_name": "1",
                "email": "test1@gmail.com",
                "password": "test1test1",
            },
            {
                "id": 2,
                "user_name": "test2",
                "first_name": "test",
                "last_name": "2",
                "email": "test1=2@gmail.com",
                "password": "test2test2",
            },
        ]

        user_models = []
        for result in expected_result:
            user_models.append(
                make_user_account(
                    result["id"],
                    result["user_name"],
                    result["first_name"],
                    result["last_name"],
                    result["email"],
                    result["password"],
                )
            )

        get_user_account_dtos_mock.return_value = user_models

        result = get_user_accounts()
        new_result = json.loads(json.dumps(marshal(result, user_model)))

        self.assertEqual(new_result, expected_result)
        get_user_account_dtos_mock.assert_called()

    @mock.patch("blueprints.services.user_account_service.add_user_account_dto")
    def test_user_account_service_post_rooms(self, add_user_account_dtos_mock):
        expected_result = {"test1", "test", "1", "test1@gmail.com", "test1test1"}
        add_user_account_dtos_mock.return_value = {
            "test1",
            "test",
            "1",
            "test1@gmail.com",
            "test1test1",
        }

        result = post_user_account(
            "test1", "test", "1", "test1@gmail.com", "test1test1"
        )

        self.assertEqual(result, expected_result)
        add_user_account_dtos_mock.assert_called()

    @mock.patch("blueprints.services.user_account_service.get_user_account_dto_by_id")
    def test_user_account_service_get_user_account_by_id_returns_user_account(
        self, get_user_account_dto_mock
    ):
        id = 1
        expected_user_account_result = {
            "id": 1,
            "user_name": "test1",
            "first_name": "test",
            "last_name": "1",
            "email": "test1@gmail.com",
            "password": "test1test1",
        }

        get_user_account_dto_mock.return_value = make_user_account(
            expected_user_account_result["id"],
            expected_user_account_result["user_name"],
            expected_user_account_result["first_name"],
            expected_user_account_result["last_name"],
            expected_user_account_result["email"],
            expected_user_account_result["password"],
        )

        result = get_user_account_by_id(id)
        new_result = json.loads(json.dumps(marshal(result, user_model)))

        self.assertEqual(new_result, expected_user_account_result)
        get_user_account_dto_mock.assert_called()

    @mock.patch(
        "blueprints.services.user_account_service.update_user_account_dto_by_id"
    )
    def test_user_account_service_update_user_account_by_id(
        self, update_user_by_id_mock
    ):
        expected_result = {
            "id": 1,
            "user_name": "update1",
            "first_name": "update",
            "last_name": "1",
            "email": "update1@gmail.com",
            "password": "update1test1",
        }

        update_user_by_id_mock.return_value = {
            "id": 1,
            "user_name": "update1",
            "first_name": "update",
            "last_name": "1",
            "email": "update1@gmail.com",
            "password": "update1test1",
        }

        result = update_user_account_by_id(
            1, "update1", "update", "1", "update1@gmail.com", "update1test1"
        )

        self.assertEqual(result, expected_result)
        update_user_by_id_mock.assert_called()

    # double check!!!!!!
    def user_account_by_id_with_plant_results(
        self,
        id,
        expected_user_account_result,
        expected_plant_results,
        expected_result,
        get_user_account_dto_mock,
        get_user_account_dto_by_id_mock,
    ):
        get_user_account_dto_mock.return_value = make_user_account(
            expected_user_account_result["id"],
            expected_user_account_result["user_name"],
            expected_user_account_result["first_name"],
            expected_user_account_result["last_name"],
            expected_user_account_result["email"],
            expected_user_account_result["password"],
        )
        get_user_account_dto_by_id_mock.return_value = {
            "id": 1,
            "user_name": expected_user_account_result["user_name"],
            "plants_b": [{"id": 1, "name": "string", "room_id": 1}],
        }

        result = get_user_account_plants_by_id(id)
        new_result = json.loads(json.dumps(marshal(result, user_plant_list_model)))

        self.assertEqual(new_result, expected_result)
        get_user_account_dto_by_id_mock.assert_called()

    @mock.patch("blueprints.services.user_account_service.get_user_account_dtos")
    @mock.patch("blueprints.services.user_account_service.get_user_account_dto_by_id")
    def test_user_account_service_get_user_by_id_returns_user_account_with_no_plants(
        self,
        get_user_account_dto_by_id_mock,
        get_user_account_dto_mock,
    ):
        # test for no matching plants
        id = 1

        expected_user_account_result = {
            "id": 1,
            "user_name": "test1",
            "first_name": "test",
            "last_name": "1",
            "email": "test1@gmail.com",
            "password": "test1test1",
        }

        expected_plant_results = []

        # plant_models = []
        # for plantDto in getPlantDtos():
        #     if plantDto.id == expected_user_account_result[]
        #     plant_models.append(make_plant(plantDto.id, plantDto.name, plantDto.room_id))
        # return plant_models

        expected_result = {"user_name": "test1", "plants": []}

        self.user_account_by_id_with_plant_results(
            id,
            expected_user_account_result,
            expected_plant_results,
            expected_result,
            get_user_account_dto_mock,
            get_user_account_dto_by_id_mock,
        )
