from src.blueprints.data_provider.health_attribute_data_provider import *
from src.blueprints.models.health_attributes import *


def get_health_attributes():
    health_attribute_models = []
    for healthAttributeDto in get_health_attribute_dtos():
        health_attribute_models.append(
            make_health_attribute(healthAttributeDto.id, healthAttributeDto.name)
        )
    return health_attribute_models
