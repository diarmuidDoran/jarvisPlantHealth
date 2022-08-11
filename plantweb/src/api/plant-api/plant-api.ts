import {AxiosRequestConfig} from "axios";
import {get} from 'api/api';
import { PlantResponse } from "./plant-api-types";

export const getPlants = (config?: AxiosRequestConfig) => {
    return get<PlantResponse[]>('/plants', config);
}

export const getPlant = (plant: number, config?: AxiosRequestConfig) => {
    return get<PlantResponse>(`/plants/${plant}`, config);
}

