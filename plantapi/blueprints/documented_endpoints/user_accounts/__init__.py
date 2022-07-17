# blueprints/documented_endpoints/user_accounts/__init__.py
from http import HTTPStatus

from flask import request
from flask_restx import Resource

from blueprints.swagger_models.user_accounts import namespaceUser, user_list_model, user_model, user_plant_list_model

user_example = {'id': 1, 'user_name': 'User Name', 'first_name': 'User', 'last_name': 'Name',
                'email': 'user.name@gmail.com', 'password': 'pa55w0rd'}


@namespaceUser.route('')
class user_accounts(Resource):
    """Get user_accounts list and create new user"""

    @namespaceUser.response(500, 'Internal Server error')
    @namespaceUser.marshal_list_with(user_model)
    def get(self):
        """List with all the user_accounts"""
        user_account_list = [user_example]

        return {
            'user_accounts': user_account_list,
            'total_records': len(user_account_list)
        }

    @namespaceUser.response(400, 'User account with the given name already exists')
    @namespaceUser.response(500, 'Internal Server error')
    @namespaceUser.expect(user_model)
    @namespaceUser.marshal_with(user_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new user_account"""

        if request.json['name'] == 'User account name':
            namespaceUser.abort(400, 'User with the given name already exists')

        return user_example, 201


@namespaceUser.route('/<int:user_account_id>')
class user(Resource):
    """Read, update and delete a specific user"""

    @namespaceUser.response(404, 'User account not found')
    @namespaceUser.response(500, 'Internal Server error')
    @namespaceUser.marshal_with(user_model)
    def get(self, user_account_id):
        """Get user_example information"""

        return user_example

    @namespaceUser.response(400, 'User with the given name already exists')
    @namespaceUser.response(404, 'User not found')
    @namespaceUser.response(500, 'Internal Server error')
    @namespaceUser.expect(user_model, validate=True)
    @namespaceUser.marshal_with(user_model)
    def put(self, user_account_id):
        """Update entity information"""

        if request.json['name'] == 'User account name':
            namespaceUser.abort(400, 'User account with the given name already exists')

        return user_example

    @namespaceUser.response(204, 'Request Success (No Content)')
    @namespaceUser.response(404, 'Entity not found')
    @namespaceUser.response(500, 'Internal Server error')
    def delete(self, user_account_id):
        """Delete a specific entity"""

        return '', 204


@namespaceUser.route('/<int:user_account_id>/plants')
class user_plants(Resource):
    """Read list of plants owned by a specific user account"""

    @namespaceUser.response(404, 'User account not found')
    @namespaceUser.response(500, 'Internal Server error')
    @namespaceUser.marshal_with(user_plant_list_model)
    def get(self, user_account_id):
        """Get user_account_example information"""

        return user_example
