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