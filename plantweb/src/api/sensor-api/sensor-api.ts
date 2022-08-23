import { AxiosRequestConfig } from "axios";
import { get, post, deleteCall } from "api/api";
import {
  SensorResponse,
  SensorPlantHealthAttributeResponse,
  SensorRequest,
  SensorSensorReadingsResponse,
  SensorReadingRequest,
} from "./sensor-api-types";

export const getSensors = (config?: AxiosRequestConfig) => {
  return get<SensorResponse[]>("/sensors", config);
};

export const getSensorPlantHealthAttributes = (config?: AxiosRequestConfig) => {
  return get<SensorPlantHealthAttributeResponse[]>("/sensors/sensor_plant_health_attribute_relationship", config);
};

export const getSensor = (sensor: number, config?: AxiosRequestConfig) => {
  return get<SensorResponse>(`/sensors/${sensor}`, config);
};

export const addSensor = (data: SensorRequest, config?: AxiosRequestConfig) => {
  return post<SensorResponse>("/sensors", data, config);
};

export const deleteSensor = (sensor: number, config?: AxiosRequestConfig) => {
  return deleteCall(`/sensors/${sensor}`, config);
};

export const getSensorSensorReadings = (sensor: number, config?: AxiosRequestConfig) => {
  return get<SensorSensorReadingsResponse>(`/sensors/${sensor}/readings`, config);
};

export const addSensorReading = (sensor: number, data: SensorReadingRequest, config?: AxiosRequestConfig) => {
  return post<SensorResponse>(`/sensors/${sensor}/readings`, data, config);
};

export const addSensorPlantHealthAttributeRelationship = (sensor: number, plant_health_attribute: number, config?: AxiosRequestConfig) => {
  return post<SensorResponse>(`/sensors/${sensor}/sensor_plant_health_attribute_relationship/${plant_health_attribute}`, config);
};