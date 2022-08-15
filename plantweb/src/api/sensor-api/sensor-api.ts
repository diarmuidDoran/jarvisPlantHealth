import {AxiosRequestConfig} from "axios";
import {get} from 'api/api';
import { SensorResponse, RoomByIDResponse } from "./sensor-api-types";

export const getRooms = (config?: AxiosRequestConfig) => {
    return get<RoomResponse[]>('/rooms', config);
}

export const getRoom = (room: number, config?: AxiosRequestConfig) => {
    return get<RoomByIDResponse>(`/rooms/${room}`, config);
}

