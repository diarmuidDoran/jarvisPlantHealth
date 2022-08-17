import {Plant} from 'shared/types';

export type PlantResponse = Plant;

export type PlantRequest = {
    name: string;
    room_id: number;
}