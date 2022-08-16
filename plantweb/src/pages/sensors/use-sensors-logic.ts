import { ChangeEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'shared/constants';

import { mockSensorData } from "shared/mocks";

import { useSensors } from "shared/hooks/use-sensors";

export const useSensorsLogic = () => {

    const { sensors, getSensors } = useSensors();

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
        getSensors();
    }, [getSensors]);
    
    return {
        sensors,
        onGetSensorData,
        onSensorClick,
        onAddSensorClick,
    }
}