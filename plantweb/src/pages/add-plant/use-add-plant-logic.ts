import { SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';
import { useRoomsLogic } from 'pages/rooms/use-rooms-logic';
import { Rooms } from 'pages/rooms';

export const useAddPlantLogic = () => {

    const [plantName, setPlantName] = useState('')
    const [room, setRoom] = useState('');

    const [upperRequiredValue, setUpperRequiredValue] =useState('')
    const [lowerRequiredValue, setLowerRequiredValue] =useState('')

    const [plantData, setPlantData] = useState<any>([]);
    const [plantHelathAttributeData, setPlantHealthAttributeData] = useState<any>([]);


    const {
        allRoomData,
        onGetRoomData,
    } = useRoomsLogic();

    const onGetPlantData = useCallback(() => {
        const mockPlantData = [
            {
            id: 1,
            name: 'Plant 1',
            },
            {
                id: 2,
                name: 'Plant 2',
            }
        ]
        setPlantData(mockPlantData);
    }, [setPlantData])

    const onGetPlantHealthAttributeData = useCallback(() => {
        const mockPlantHelathAttributeData = [
            {
                id: 1,
                upper_required_value: 2,
                lower_required_value: 0.5,
                unit_measurement_id: 1,
                plant_id: 1,
                health_attribute_id: 1,
            },
            {
                id: 2,
                upper_required_value: 2,
                lower_required_value: 0.5,
                unit_measurement_id: 1,
                plant_id: 2,
                health_attribute_id: 1,
            }
        ]
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