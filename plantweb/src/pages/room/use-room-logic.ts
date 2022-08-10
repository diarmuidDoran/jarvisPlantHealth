import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'shared/constants';

import { mockRoomData, getRoomByID, getPlantByRoomID } from "shared/mocks";
import { usePlants } from 'shared/hooks/use-plants'

export const useRoomLogic = () => {

    const [allRoomData, setRoomData] = useState<any>([]);
    const [selectedRoomID, setSelectedRoomID] = useState();

    const [room, setRoom] = useState<any>(undefined);
    const [plants, setPlant] = useState<any>(undefined);

    const onGetRoom = useCallback((id: string) => {
        const room = getRoomByID(id);
        setRoom(room);
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

    const onGetRoomData = useCallback(() => {
        setRoomData(sortRoomDataByNameDesc);
    }, [setRoomData])
    
    return {
        room,
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