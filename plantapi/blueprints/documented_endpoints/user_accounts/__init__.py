# blueprints/documented_endpoints/user_accounts/__init__.py
from http import HTTPStatus

from flask_restx import Resource

from blueprints.services.user_account_service import *
from blueprints.swagger_models.user_accounts import (
    namespaceUser,
    user_model,
    user_plant_list_model,
)
from blueprints.validations.user_account_validation import user_account_is_valid


@namespaceUser.route("")
class user_accounts(Resource):
    """Get user_accounts list and create new user"""

    @namespaceUser.response(500, "Internal Server error")
    @namespaceUser.marshal_list_with(user_model)
    def get(self):
        """List with all the user_accounts"""
        user_accounts = get_user_accounts()
        """{
                    'user_accounts': user_accounts,
                    'total_records': len(user_accounts)
                }"""
        return user_accounts

    @namespaceUser.response(400, "User account with the given name already exists")
    @namespaceUser.response(500, "Internal Server error")
    @namespaceUser.expect(user_model)
    @namespaceUser.marshal_with(user_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new user_account"""
        data = request.get_json()
        user_name = data.get("user_name")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        password = data.get("password")

        if user_account_is_valid(user_name, email) is not True:
            namespaceUser.abort(
                400, "User with the given user_name or email already exists"
            )

        add_user_account = post_user_account(
            user_name, first_name, last_name, email, password
        )

        return add_user_account, 201


@namespaceUser.route("/<int:user_account_id>")
class user(Resource):
    """Read, update and delete a specific user"""

    @namespaceUser.response(404, "User account not found")
    @namespaceUser.response(500, "Internal Server error")
    @namespaceUser.marshal_with(user_model)
    def get(self, user_account_id):
        """Get user_example information"""
        if get_user_account_by_id(user_account_id) is None:
            namespaceUser.abort(404, "User account not found")

        user_account = get_user_account_by_id(user_account_id)

        return user_account

    @namespaceUser.response(400, "User with the given name already exists")
    @namespaceUser.response(404, "User not found")
    @namespaceUser.response(500, "Internal Server error")
    @namespaceUser.expect(user_model, validate=True)
    @namespaceUser.marshal_with(user_model)
    def put(self, user_account_id):

        if get_user_account_by_id(user_account_id) is None:
            namespaceUser.abort(404, "User account not found")

        """Update user account information"""

        data = request.get_json()
        new_user_name = data.get("user_name")
        new_first_name = data.get("first_name")
        new_last_name = data.get("last_name")
        new_email = data.get("email")
        new_password = data.get("password")

        if user_account_is_valid(new_user_name, new_email) is not True:
            namespaceUser.abort(
                400, "User with the given user_name or email already exists"
            )

        update_user_account = update_user_account_by_id(
            user_account_id,
            new_user_name,
            new_first_name,
            new_last_name,
            new_email,
            new_password,
        )

        return update_user_account, 201

    @namespaceUser.response(204, "Request Success (No Content)")
    @namespaceUser.response(404, "Entity not found")
    @namespaceUser.response(500, "Internal Server error")
    def delete(self, user_account_id):
        """Delete a specific entity"""
        if get_user_account_by_id(user_account_id) is None:
            namespaceUser.abort(404, "User account not found")
        delete_user_account = delete_user_account_by_id(user_account_id)
        return delete_user_account, 204


@namespaceUser.route("/<int:user_account_id>/plants")
class user_plants(Resource):
    """Read list of plants owned by a specific user account"""

    @namespaceUser.response(404, "User account not found")
    @namespaceUser.response(500, "Internal Server error")
    @namespaceUser.marshal_with(user_plant_list_model)
    def get(self, user_account_id):
        """Get user_account_example information"""
        if get_user_account_by_id(user_account_id) is None:
            namespaceUser.abort(404, "User account not found")

        user_account_plants = get_user_account_plants_by_id(user_account_id)

        return user_account_plants
