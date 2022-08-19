import {AxiosRequestConfig} from "axios";
import {get, post, put, deleteCall} from 'api/api';
import { PlantResponse, PlantRequest, PlantPlantHealthAttributeResponse, PlantHealthAttributeResponse, PlantHealthAttributeRequest } from "./plant-api-types";

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

export const getPlantPlantHealthAttributes = (plant: number, config?: AxiosRequestConfig) => {
    return get<PlantPlantHealthAttributeResponse>(`/plants/${plant}/plant_health_attributes`, config);
}

export const getPlantPlantHealthAttribute = (plant: number, plant_health_attribute: number, config?: AxiosRequestConfig) => {
    return get<PlantHealthAttributeResponse>(`/plants/${plant}/plant_health_attributes/${plant_health_attribute}`, config);
}

export const addPlantPlantHealthAttribute = (plant: number, data: PlantHealthAttributeRequest, config?: AxiosRequestConfig) => {
    return post<PlantHealthAttributeResponse>(`/plants/${plant}/plant_health_attributes}`, data, config);
}

export const editPlantPlantHealthAttribute = (plant: number, plant_health_attribute: number, data: PlantHealthAttributeRequest, config?: AxiosRequestConfig) => {
    return put<PlantHealthAttributeResponse>(`/plants/${plant}/plant_health_attributes/${plant_health_attribute}}`, data, config);
}

export const deletePlantPlantHealthAttribute = (plant: number, plant_health_attribute: number, config?: AxiosRequestConfig) => {
    return deleteCall<PlantHealthAttributeResponse>(`/plants/${plant}/plant_health_attributes/${plant_health_attribute}}`, config);
}