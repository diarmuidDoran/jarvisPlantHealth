# blueprints/swagger_models/rooms/__init__.py
from flask_restx import Namespace, fields

from blueprints.swagger_models.plants import plant_model

namespaceRoom = Namespace("rooms", "room endpoints")

room_model = namespaceRoom.model(
    "Room",
    {
        "id": fields.Integer(readonly=True, description="Room identifier"),
        "name": fields.String(required=True, description="Room name"),
    },
)

room_list_model = namespaceRoom.model(
    "RoomList",
    {
        "id": fields.Integer(readonly=True, description="Room identifier"),
        "name": fields.String(required=True, description="Room name"),
        "plants": fields.Nested(
            plant_model, description="List of plants", as_list=True
        ),
    },
)
