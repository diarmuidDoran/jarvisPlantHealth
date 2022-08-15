export type SensorResponse = {
    id: number;
    sensor_name: string;
    call_frequency: string;
}

export type SensroReading = {
    id: number;
    sensor_reading: number;
    time_stamp: number; 
}

export type SensorByIDResponse = {
    sensor_name: string;
    call_frequency: string;
    sensor_readings: [SensroReading]
}