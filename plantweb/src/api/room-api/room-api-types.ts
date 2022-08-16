import { Plant } from "shared/types";

export type RoomResponse = {
    id: number;
    name: string;
}

export type RoomByIDResponse = {
    id: number;
    name: string;
    plants: [Plant]
}

export type AddEditRoom = {
    name: string;
}