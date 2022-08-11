import { ChangeEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'shared/constants';

import { mockSensorData } from "shared/mocks";

export const useSensorsLogic = () => {

    const [allSensorData, setSensorData] = useState<any>([]);

    const history = useHistory();

    const onSensorClick = useCallback((id: string) => {
        history.push(`${PATHS.sensors}/${id}`)
    }, [history]);

    const onAddSensorClick = useCallback(() => {
        let path = "/add-sensor";
        history.push(path);
      }, [history]);

    const sortSensorDataByNameDesc = [...mockSensorData].sort((a, b) => {
            if(a.name > b.name){
                return 1;
            }
            if(a.name < b.name){
                return -1;
            }
            return 0;
    }); 

    const onGetSensorData = useCallback(() => {
        setSensorData(sortSensorDataByNameDesc);
    }, [setSensorData]);
    
    return {

        allSensorData,
        onGetSensorData,
        onSensorClick,
        onAddSensorClick,
    }
}