import json
import unittest
from unittest import mock

from flask_restx import marshal

from src.blueprints.services.notification_service import *
from src.blueprints.swagger_models.notifications import *


class NotificationServiceTest(unittest.TestCase):
    @mock.patch("src.blueprints.services.notification_service.getNotificationDtos")
    def test_notification_service_get_notifications_returns_empty_array(
        self, get_notification_dtos_mock
    ):
        expected_result = []
        get_notification_dtos_mock.return_value = []

        result = getNotifications()

        self.assertEqual(result, expected_result)
        get_notification_dtos_mock.assert_called()

    @mock.patch("src.blueprints.services.notification_service.getNotificationDtos")
    def test_notification_service_get_notifications_returns_array(
        self, get_notification_dtos_mock
    ):
        expected_result = [
            {
                "id": 1,
                "notification_details": "string",
                "time_stamp": "2022-07-29T10:24:04.339000+00:00",
                "plant_health_attribute_id": 1,
            },
            {
                "id": 2,
                "notification_details": "string",
                "time_stamp": "2022-07-29T10:24:04.339000+00:00",
                "plant_health_attribute_id": 2,
            },
        ]

        notification_models = []
        for result in expected_result:
            notification_models.append(
                make_notification(
                    result["id"],
                    result["notification_details"],
                    result["time_stamp"],
                    result["plant_health_attribute_id"],
                )
            )

        get_notification_dtos_mock.return_value = notification_models

        result = getNotifications()
        new_result = json.loads(json.dumps(marshal(result, notification_model)))

        self.assertEqual(new_result, expected_result)
        get_notification_dtos_mock.assert_called()

    @mock.patch("src.blueprints.services.notification_service.addNotificationDto")
    def test_notification_service_post_notification(self, add_notification_dtos_mock):
        expected_result = {"string", "2022-07-29 10:24:04", 1}
        add_notification_dtos_mock.return_value = {
            1,
            "string",
            "2022-07-29 10:24:04",
            1,
        }

        result = postNotification("string", "2022-07-29 10:24:04", 1)

        self.assertEqual(result, expected_result)
        add_notification_dtos_mock.assert_called()

    @mock.patch("src.blueprints.services.notification_service.getNotificationDtoById")
    def test_notification_service_get_notification_by_id_returns_notification(
        self, get_notification_dto_mock
    ):
        id = 1
        expected_result = {
            "id": 1,
            "notification_details": "string",
            "time_stamp": "2022-07-29T10:24:04.339000+00:00",
            "plant_health_attribute_id": 1,
        }

        get_notification_dto_mock.return_value = make_notification(
            expected_result["id"],
            expected_result["notification_details"],
            expected_result["time_stamp"],
            expected_result["plant_health_attribute_id"],
        )

        result = getNotificationById(id)
        new_result = json.loads(json.dumps(marshal(result, notification_model)))

        self.assertEqual(new_result, expected_result)
        get_notification_dto_mock.assert_called()
