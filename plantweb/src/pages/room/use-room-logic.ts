import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'shared/constants';

import { mockRoomData, getRoomByID, getPlantByRoomID } from "shared/mocks";

import { useRooms } from "shared/hooks/use-rooms";

export const useRoomLogic = () => {

    const { room, getRoom } = useRooms();
    const [allRoomData, setRoomData] = useState<any>([]);

    const [roomOld, setRoom] = useState<any>(undefined);
    const [plants, setPlant] = useState<any>(undefined);

    const onGetRoom = useCallback((id: string) => {
        const roomOld = getRoomByID(id);
        setRoom(roomOld);
    }, [setRoom, getRoomByID])

    const onGetRoomPlants = useCallback((id: string) => {
        const plants = getPlantByRoomID(id);
        setPlant(plants);
    }, [setPlant, getPlantByRoomID])
    
    const history = useHistory();

    const onRoomsClick = useCallback(() => {
        history.push(`${PATHS.rooms}`)
    }, [history]);

    const onRoomClick = useCallback((id: string) => {
        history.push(`${PATHS.rooms}/${id}`)
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
        roomOld,
        plants,
        allRoomData,
        onGetRoom,
        onGetRoomPlants,
        onGetRoomData,
        onRoomClick,
        onRoomPlantClick,
        onRoomsClick,
    }
}