# blueprints.documented_endpoints/user_accounts/__init__.py
from flask import request
from flask_restx import Resource
from http import HTTPStatus

from blueprints.services.notification_service import (
    getNotifications,
    getNotificationById,
    postNotification,
)
from blueprints.swagger_models.notifications import (
    namespaceNotify,
    notification_model,
)
from blueprints.validations.notification_validation import notification_is_valid

notification_example = {
    "id": 1,
    "notification_details": "Notification details",
    "timestamp": ("08/07/22 09:00", "%d/%m/%y %H:%M"),
    "user_account_id": 1,
    "plant_health_attribute_id": 1,
}


@namespaceNotify.route("")
class notifications(Resource):
    """Get user_notification list and create new notification"""

    @namespaceNotify.response(500, "Internal Server error")
    @namespaceNotify.marshal_list_with(notification_model)
    def get(self):
        """List with all the notifications"""
        notifications = getNotifications()
        return notifications

    @namespaceNotify.response(400, "Notification with the given name already exists")
    @namespaceNotify.response(500, "Internal Server error")
    @namespaceNotify.expect(notification_model)
    @namespaceNotify.marshal_with(notification_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new notification"""
        data = request.get_json()
        notification_details = data.get("notification_details")
        time_stamp = data.get("time_stamp")
        plant_health_attribute_id = data.get("plant_health_attribute_id")

        if notification_is_valid(notification_details, time_stamp) is not True:
            namespaceNotify.abort(
                400, "Notification with the given name already exists"
            )

        add_notification = postNotification(
            notification_details, time_stamp, plant_health_attribute_id
        )

        return add_notification, 201


@namespaceNotify.route("/<int:notification_id>")
class notification(Resource):
    """Read, update and delete a specific notification"""

    @namespaceNotify.response(404, "Notification not found")
    @namespaceNotify.response(500, "Internal Server error")
    @namespaceNotify.marshal_with(notification_model)
    def get(self, notification_id):
        """Get notifications for a specific user account"""
        notification = getNotificationById(notification_id)
        return notification
