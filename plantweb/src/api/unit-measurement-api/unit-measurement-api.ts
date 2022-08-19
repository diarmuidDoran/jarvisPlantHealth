import {AxiosRequestConfig} from "axios";
import {get} from 'api/api';
import { UnitMeasurementResponse } from "./unit-measurement-api-types";

export const getUnitMeasurements = (config?: AxiosRequestConfig) => {
    return get<UnitMeasurementResponse[]>('/unit_measurement', config);
}
