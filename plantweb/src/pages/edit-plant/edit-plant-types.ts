import {PlantHelathAttribute, Sensor } from 'shared/types'

export type EditPlantHealthAttibute = PlantHelathAttribute & {
    sensor?: Sensor;
}

export type SensorReading = {
    sensorName: string;
    sensorId: number;
    id: number;
    timeStamp: Date;
    sensorReading: number;
}