import {AxiosRequestConfig} from "axios";
import {get, post, put, deleteCall} from 'api/api';
import { RoomResponse, RoomByIDResponse, RoomRequest } from "./room-api-types";

export const getRooms = (config?: AxiosRequestConfig) => {
    return get<RoomResponse[]>('/rooms', config);
}

export const getRoom = (room: number, config?: AxiosRequestConfig) => {
    return get<RoomByIDResponse>(`/rooms/${room}`, config);
}

export const addRoom = (data: RoomRequest, config?: AxiosRequestConfig) => {
    return post<RoomResponse>('/rooms', data, config);
}

export const editRoom = (room: number, data: RoomRequest, config?: AxiosRequestConfig) => {
    return put<RoomResponse>(`/rooms/${room}`, data, config);
}

export const deleteRoom = (room: number, config?: AxiosRequestConfig) => {
    return deleteCall(`/rooms/${room}`, config);
}

