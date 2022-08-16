import {AxiosRequestConfig} from "axios";
import {get} from 'api/api';
import { SensorResponse, SensorByIDResponse } from "./sensor-api-types";

export const getSensors = (config?: AxiosRequestConfig) => {
    return get<SensorResponse[]>('/sensors', config);
}

export const getSensor = (sensor: number, config?: AxiosRequestConfig) => {
    return get<SensorByIDResponse>(`/sensors/${sensor}`, config);
}
