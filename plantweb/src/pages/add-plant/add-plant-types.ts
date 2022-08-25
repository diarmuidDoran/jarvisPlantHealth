import {PlantHelathAttribute, Sensor} from 'shared/types'

export type AddPlantHealthAttibute = {
    id: number;
    upper_required_value: number;
    lower_required_value: number;
    unit_measurement_id: number;
    plant_id: number;
    health_attribute_id: number;
    sensor?: Sensor;
} 