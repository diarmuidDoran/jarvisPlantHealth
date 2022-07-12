# blueprints/documented_endpoints/plants/plant_health_attributes/__init__.py
from flask_restx import Resource

from blueprints.models.plant_health_attributes import plant_health_attribute_model
from blueprints.models.plants import namespacePlant, plant_model

plant_health_attribute_example = {'plant_health_attribute_id': 1, 'upper_required_value': 1.00,
                                  'lower_required_value': 0.50, 'unit_measurement_id': 'ml',
                                  'plant_id': 1, 'health_attribute_id': 1}
