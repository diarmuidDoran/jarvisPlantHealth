import { SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';
import { useSensorsLogic } from 'pages/sensors/use-sensors-logic';
import { Rooms } from 'pages/rooms';

import { mockSensorData,} from "shared/mocks";

export const useAddSensorLogic = () => {
    const [sensor, setSensor] = useState('');
    const [sensorName, setSensorName] = useState('')
    const [sensorCallFrequency, setSensorCallFrequency] = useState('')

    const onGetSensorName= useCallback(() => {
        setSensorName('');
    }, [setSensorName])

    const onGetSensorCallFrequency= useCallback(() => {
        setSensorCallFrequency('');
    }, [setSensorCallFrequency])


    const handleSensorChange = (event: SelectChangeEvent) => {
        setSensor(event.target.value as string)
    };

    return {
        sensor,
        sensorName,
        sensorCallFrequency,
        handleSensorChange,
        onGetSensorName,
        onGetSensorCallFrequency,
       
    }
}