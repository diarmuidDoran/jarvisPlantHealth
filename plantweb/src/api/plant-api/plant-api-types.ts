import {Plant, PlantHelathAttribute, } from 'shared/types';

export type PlantResponse = Plant;

export type PlantRequest = {
    name: string;
    room_id: number;
}

export type PlantPlantHealthAttributeResponse = {
    id: number;
    name: string;
    room_id: number;
    plant_health_attributes: PlantHelathAttribute[];
}

export type PlantHealthAttributeResponse = PlantHelathAttribute;

export type PlantHealthAttributeRequest = {
    upper_required_value: number;
    lower_required_value: number;
    unit_measurement_id: number;
    plant_id: number;
    health_attribute_id: number;
}