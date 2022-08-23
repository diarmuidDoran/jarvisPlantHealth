import {SensorReading} from 'shared/types/sensor-reading-types'

export type SensorResponse = {
    id: number;
    sensor_name: string;
    call_frequency: string;
}

export type SensorSensorReadingsResponse = {
    sensor_name: string;
    call_frequency: string;
    sensor_readings: SensorReading[];
}

export type SensorRequest = {
    sensor_name: string;
    call_frequency: string;
}

export type SensorReadingRequest = {
    sensor_reading: number;
    time_stamp: string;
}

export type SensorPlantHealthAttributeResponse = {
    id: number;
    plant_health_attribute_id: number;
    sensor_id: number;
}