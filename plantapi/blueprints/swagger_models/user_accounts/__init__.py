# blueprints/swagger_models/user_accounts/__init__.py
from flask_restx import Namespace, fields

from blueprints.swagger_models.plants import plant_model, plant_ids_model

namespaceUser = Namespace("user_accounts", "userAccount endpoints")

user_model = namespaceUser.model(
    "UserAccount",
    {
        "id": fields.Integer(readonly=True, description="User identifier"),
        "user_name": fields.String(required=True, description="User account name"),
        "first_name": fields.String(required=True, description="User first name"),
        "last_name": fields.String(required=True, description="User last name"),
        "email": fields.String(required=True, description="User email address"),
        "password": fields.String(
            required=True, description="Users password to be encrypted"
        ),
    },
)

user_plant_model = namespaceUser.model(
    "UserAccountAndPlants",
    {
        "id": fields.Integer(readonly=True, description="Plant identifier"),
        "user_name": fields.String(required=True, description="User account name"),
        "first_name": fields.String(required=True, description="User first name"),
        "last_name": fields.String(required=True, description="User last name"),
        "email": fields.String(required=True, description="User email address"),
        "password": fields.String(
            required=True, description="Users password to be encrypted"
        ),
        "plants": fields.Nested(
            plant_ids_model, description="List of plants by id", as_list=True
        ),
    },
)

user_list_model = namespaceUser.model(
    "UserList",
    {
        "user_accounts": fields.Nested(
            user_model, description="List of user_accounts", as_list=True
        ),
        "total_records": fields.Integer(
            description="Total number of user_accounts",
        ),
    },
)

user_plant_list_model = namespaceUser.model(
    "UserPlantList",
    {
        "user_name": fields.String(required=True, description="User account name"),
        "plants": fields.Nested(
            plant_model, description="List of plants", as_list=True
        ),
    },
)
