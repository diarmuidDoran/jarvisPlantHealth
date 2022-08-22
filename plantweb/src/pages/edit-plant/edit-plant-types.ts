import {PlantHelathAttribute, } from 'shared/types'

export type EditPlantHealthAttibute = PlantHelathAttribute & {
    sensorName: string;
    sensorId: number;
}