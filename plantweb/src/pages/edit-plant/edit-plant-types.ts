import {PlantHelathAttribute, Sensor } from 'shared/types'

export type EditPlantHealthAttibute = PlantHelathAttribute & {
    sensor?: Sensor;
}