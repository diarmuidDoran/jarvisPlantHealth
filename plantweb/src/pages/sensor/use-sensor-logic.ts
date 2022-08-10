import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'shared/constants';

import { mockRoomData } from "shared/mocks";
import { usePlants } from 'shared/hooks/use-plants';

export const useSensorLogic = () => {
   
    const [allRoomData, setRoomData] = useState<any>([]);
    
    const [selectedRoomID, setSelectedRoomID] = useState()
    
    const history = useHistory();

    const onRoomClick = useCallback((id: string) => {
        history.push(`${PATHS.rooms}/${id}`)
    }, [history]);

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
        allRoomData,
        onGetRoomData,
        onRoomClick,
    }
}