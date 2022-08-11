import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'shared/constants';

import { mockRoomData, mockSensorData, getSensorByID } from "shared/mocks";
import { usePlants } from 'shared/hooks/use-plants';

export const useSensorLogic = () => {
   
    const [allRoomData, setRoomData] = useState<any>([]);
    
    const [sensor, setSensor] = useState<any>(undefined);

    const onGetSensor = useCallback((id: string) => {
        const sensor = getSensorByID(id);
        setSensor(sensor);
    }, [setSensor, getSensorByID])
    
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
        sensor,
        allRoomData,
        onGetRoomData,
        onGetSensor,
        onRoomClick,
    }
}