# blueprints/swagger_models/user_accounts/__init__.py
from flask_restx import Namespace, fields

namespaceNotify = Namespace("notifications", "notification endpoints")

notification_model = namespaceNotify.model(
    "Notification",
    {
        "id": fields.Integer(readonly=True, description="Notification identifier"),
        "notification_details": fields.String(
            required=True, description="Notification details"
        ),
        "time_stamp": fields.DateTime(
            required=True, description="Time notification was issued"
        ),
        "plant_health_attribute_id": fields.Integer(
            required=True, description="User_account identifier"
        ),
    },
)

notification_list_model = namespaceNotify.model(
    "NotificationList",
    {
        "notifications": fields.Nested(
            notification_model, description="List of notifications", as_list=True
        ),
        "total_records": fields.Integer(
            description="Total number of notifications",
        ),
    },
)
