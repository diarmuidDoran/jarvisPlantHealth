from blueprints.data_provider.unit_measurement_data_provider import *
from blueprints.models.unit_measurements import *


def get_unit_measurements():
    unit_measurement_models = []
    for unitMeasurementDto in get_unit_measurement_dtos():
        unit_measurement_models.append(
            make_unit_measurement(unitMeasurementDto.id, unitMeasurementDto.unit)
        )
    return unit_measurement_models
