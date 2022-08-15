import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { Rooms } from 'pages/rooms';


export const useAddRoomLogic = () => {
    const [roomName, setRoomName] = useState('')

    const onRoomNameChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setRoomName(value);
      }, [setRoomName]);


    const onGetRoomName= useCallback(() => {
        setRoomName('');
    }, [setRoomName])

    const onSubmit = useCallback(() => {
        alert(roomName);
    }, [roomName]);


    const handleRoomNameChange = (event: SelectChangeEvent) => {
        setRoomName(event.target.value as string)
    };

    return {
        roomName,
        handleRoomNameChange,
        onGetRoomName,
        onRoomNameChange,
        onSubmit,
    }
}