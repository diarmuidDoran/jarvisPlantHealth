import {PlantHealthAttribute, Sensor } from 'shared/types'

export type EditPlantHealthAttibute = PlantHealthAttribute & {
    sensor?: Sensor;
}

export type SensorReading = {
    sensorName: string;
    sensorId: number;
    id: number;
    timeStamp: Date;
    sensorReading: number;
}