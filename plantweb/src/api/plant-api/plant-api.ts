import {AxiosRequestConfig} from "axios";
import {get, post, put, deleteCall} from 'api/api';
import { PlantResponse, PlantRequest } from "./plant-api-types";

export const getPlants = (config?: AxiosRequestConfig) => {
    return get<PlantResponse[]>('/plants', config);
}

export const getPlant = (plant: number, config?: AxiosRequestConfig) => {
    return get<PlantResponse>(`/plants/${plant}`, config);
}

export const addPlant = (data: PlantRequest, config?: AxiosRequestConfig) => {
    return post<PlantResponse>('/plants', data, config);
}

export const editPlant = (plant: number, data: PlantRequest, config?: AxiosRequestConfig) => {
    return put<PlantResponse>(`/plants/${plant}`, data, config);
}

export const deletePlant = (plant: number, config?: AxiosRequestConfig) => {
    return deleteCall(`/plants/${plant}`, config);
}

