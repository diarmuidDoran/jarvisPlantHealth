import {AxiosRequestConfig} from "axios";
import {get, post, put, deleteCall} from 'api/api';
import { UserAccountResponse, UserAccountPlantsResponse, UserAccountRequest } from "./user-account-api-types";

export const getUserAccounts = (config?: AxiosRequestConfig) => {
    return get<UserAccountResponse[]>('/user_accounts', config);
}

export const getUserAccount = (user_account: number, config?: AxiosRequestConfig) => {
    return get<UserAccountResponse>(`/user_accounts/${user_account}`, config);
}

export const addUserAccount = (data: UserAccountRequest, config?: AxiosRequestConfig) => {
    return post<UserAccountResponse>('/user_accounts', data, config);
}

export const editUserAccount = (user_account: number, data: UserAccountRequest, config?: AxiosRequestConfig) => {
    return put<UserAccountResponse>(`/user_accounts/${user_account}`, data, config);
}

export const deleteUserAccount = (user_account: number, config?: AxiosRequestConfig) => {
    return deleteCall(`/user_accounts/${user_account}`, config);
}

export const getUserAccountPlant = (user_account: number, config?: AxiosRequestConfig) => {
    return get<UserAccountPlantsResponse>(`/user_accounts/${user_account}/plants`, config);
}

