import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'shared/constants';

import { mockRoomData, getRoomByID, getPlantByRoomID } from "shared/mocks";

import { useRooms } from "shared/hooks/use-rooms";

export const useRoomLogic = () => {

    const { room, getRoom } = useRooms();

    const history = useHistory();

    const onRoomsClick = useCallback(() => {
        history.push(`${PATHS.rooms}`)
    }, [history]);

    const onRoomPlantClick = useCallback(
        (id: string) => {
          history.push(`${PATHS.plants}/${id}`);
        },
        [history]
      );

    const sortRoomDataByNameDesc = [...mockRoomData].sort((a, b) => {
            if(a.name > b.name){
                return 1;
            }
            if(a.name < b.name){
                return -1;
            }
            return 0;
    }); 

    const onGetRoomData = useCallback(
        (id: number) => {
          getRoom(id);
        },
        [getRoom]
      );

    return {
        room,
        onGetRoomData,
        onRoomPlantClick,
        onRoomsClick,
    }
}