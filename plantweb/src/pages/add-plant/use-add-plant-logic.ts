import { SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';
import { useRoomsLogic } from 'pages/rooms/use-rooms-logic';
import { Rooms } from 'pages/rooms';

import { mockPlantData, mockPlantHelathAttributeData } from "shared/mocks";

export const useAddPlantLogic = () => {

    const [plantName, setPlantName] = useState('')
    const [room, setRoom] = useState('');

    const [upperRequiredValue, setUpperRequiredValue] =useState('')
    const [lowerRequiredValue, setLowerRequiredValue] =useState('')

    const [plantData, setPlantData] = useState<any>([]);
    const [plantHelathAttributeData, setPlantHealthAttributeData] = useState<any>([]);

    const {
        allRoomData,
        onGetRoomDataOLD,
    } = useRoomsLogic();

    const onGetPlantData = useCallback(() => {
        setPlantData(mockPlantData);
    }, [setPlantData])

    const onGetPlantHealthAttributeData = useCallback(() => {
        setPlantHealthAttributeData(mockPlantHelathAttributeData);
    }, [setPlantHealthAttributeData])

    const handleRoomChange = (event: SelectChangeEvent) => {
        setRoom(event.target.value as string)
    };

    return {
        plantName,
        room,
        upperRequiredValue,
        lowerRequiredValue,
        plantData,
        plantHelathAttributeData,
        handleRoomChange,
        onGetPlantData,
        onGetPlantHealthAttributeData
    }
}