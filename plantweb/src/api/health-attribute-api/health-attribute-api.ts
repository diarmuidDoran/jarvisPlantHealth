import {AxiosRequestConfig} from "axios";
import {get} from 'api/api';
import { HealthAttributeResponse } from "./health-attribute-api-types";

export const getHealthAttributes = (config?: AxiosRequestConfig) => {
    return get<HealthAttributeResponse[]>('/health_attributes', config);
}
