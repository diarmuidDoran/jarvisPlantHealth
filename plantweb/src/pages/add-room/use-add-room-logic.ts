import { SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';
import { useRoomsLogic } from 'pages/rooms/use-rooms-logic';
import { Rooms } from 'pages/rooms';

import { mockRoomData,} from "shared/mocks";

export const useAddRoomLogic = () => {
    const [room, setRoom] = useState('');
    const [roomName, setRoomName] = useState('')


    const onGetRoomName= useCallback(() => {
        setRoomName('');
    }, [setRoomName])


    const handleRoomChange = (event: SelectChangeEvent) => {
        setRoom(event.target.value as string)
    };

    return {
        room,
        roomName,
        handleRoomChange,
        onGetRoomName,
       
    }
}