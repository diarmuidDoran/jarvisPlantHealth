import {AxiosRequestConfig} from "axios";
import {get, post, put, deleteCall} from 'api/api';
import { RoomResponse, RoomByIDResponse, AddEditRoom } from "./room-api-types";

export const getRooms = (config?: AxiosRequestConfig) => {
    return get<RoomResponse[]>('/rooms', config);
}

export const getRoom = (room: number, config?: AxiosRequestConfig) => {
    return get<RoomByIDResponse>(`/rooms/${room}`, config);
}

export const addRoom = (config?: AxiosRequestConfig) => {
    return post<AddEditRoom>('/rooms', config);
}

export const editRoom = (room: number, config?: AxiosRequestConfig) => {
    return put<AddEditRoom>(`/rooms/${room}`, config);
}

export const deleteRoom = (room: number, config?: AxiosRequestConfig) => {
    return deleteCall(`/rooms/${room}`, config);
}

