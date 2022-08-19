import { Plant, UserAccount } from "shared/types";

export type UserAccountResponse = UserAccount;

export type UserAccountPlantsResponse = {
    user_name: string;
    plants: Plant[];
}

export type UserAccountRequest = {
    user_name: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}