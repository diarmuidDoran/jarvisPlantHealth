import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'shared/constants';

import { mockRoomData, mockSensorData, getSensorByID } from "shared/mocks";

import { useSensors } from 'shared/hooks/use-sensors';

export const useSensorLogic = () => {
   
    const [allRoomData, setRoomData] = useState<any>([]);

    const { sensor, getSensor } = useSensors();
    
    const history = useHistory();

    const onSensorClick = useCallback((id: string) => {
        history.push(`${PATHS.sensors}/${id}`)
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

    const onGetSensorData = useCallback(
        (id: number) => {
          getSensor(id);
        },
        [getSensor]
      );
    
    return {
        sensor,
        onGetSensorData,
    }
}