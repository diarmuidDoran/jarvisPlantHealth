import {AxiosRequestConfig} from "axios";
import {get, post } from 'api/api';
import { NotificationResponse, NotificationRequest } from "./notification-api-types";

export const getNotifications = (config?: AxiosRequestConfig) => {
    return get<NotificationResponse[]>('/notifications', config);
}

export const getNotification = (notification: number, config?: AxiosRequestConfig) => {
    return get<NotificationResponse>(`/notifications/${notification}`, config);
}

export const addNotification = (data: NotificationRequest, config?: AxiosRequestConfig) => {
    return post<NotificationResponse>('/notifications', data, config);
}
