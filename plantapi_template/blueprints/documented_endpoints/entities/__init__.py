# blueprints/documented_endpoints/entities/__init__.py
from flask import request
from flask_restx import Namespace, Resource, fields
from http import HTTPStatus

namespace1 = Namespace('entities', 'Entities fake endpoints')

entity_model = namespace1.model('Entity', {
    'id': fields.Integer(
        readonly=True,
        description='Entity identifier'
    ),
    'name': fields.String(
        required=True,
        description='Entity name'
    )
})

entity_list_model = namespace1.model('EntityList', {
    'entities': fields.Nested(
        entity_model,
        description='List of entities',
        as_list=True
    ),
    'total_records': fields.Integer(
        description='Total number of entities',
    ),
})

entity_example = {'id': 1, 'name': 'Entity name'}

@namespace1.route('')
class entities(Resource):
    """Get entities list and create new entities"""

    @namespace1.response(500, 'Internal Server error')
    @namespace1.marshal_list_with(entity_list_model)
    def get(self):
        """List with all the entities"""
        entity_list = [entity_example]

        return {
            'entities': entity_list,
            'total_records': len(entity_list)
        }

    @namespace1.response(400, 'Entity with the given name already exists')
    @namespace1.response(500, 'Internal Server error')
    @namespace1.expect(entity_model)
    @namespace1.marshal_with(entity_model, code=HTTPStatus.CREATED)
    def post(self):
        """Create a new entity"""

        if request.json['name'] == 'Entity name':
            namespace1.abort(400, 'Entity with the given name already exists')

        return entity_example, 201


@namespace1.route('/<int:entity_id>')
class entity(Resource):
    """Read, update and delete a specific entity"""

    @namespace1.response(404, 'Entity not found')
    @namespace1.response(500, 'Internal Server error')
    @namespace1.marshal_with(entity_model)
    def get(self, entity_id):
        """Get entity_example information"""

        return entity_example

    @namespace1.response(400, 'Entity with the given name already exists')
    @namespace1.response(404, 'Entity not found')
    @namespace1.response(500, 'Internal Server error')
    @namespace1.expect(entity_model, validate=True)
    @namespace1.marshal_with(entity_model)
    def put(self, entity_id):
        """Update entity information"""

        if request.json['name'] == 'Entity name':
            namespace1.abort(400, 'Entity with the given name already exists')

        return entity_example

    @namespace1.response(204, 'Request Success (No Content)')
    @namespace1.response(404, 'Entity not found')
    @namespace1.response(500, 'Internal Server error')
    def delete(self, entity_id):
        """Delete a specific entity"""

        return '', 204
