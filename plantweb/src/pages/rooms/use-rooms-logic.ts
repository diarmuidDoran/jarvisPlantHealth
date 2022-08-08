import { ChangeEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'shared/constants';

export const useRoomsLogic = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [allRoomData, setRoomData] = useState<any>([]);

    const history = useHistory();

    const onUsernameChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        console.log(value)
        setUsername(value);
      }, [setUsername]);

    const onPasswordChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        console.log(value)
        setPassword(value);
      }, [setPassword]);

    const onSubmit = useCallback(() => {
        alert(username + ' ' + password);
    }, [username, password]);

    const onRoomClick = useCallback((id: string) => {
        history.push(`${PATHS.rooms}/${id}`)
    }, [history]);

    const mockRoomData = [
        {
            id: 1,
            name: 'Room 1',
        },
        {
            id: 2,
            name: 'Room 2',
        },
        {
            id: 3,
            name: 'Room 3',
        },
        {
            id: 4,
            name: 'Room 4',
        }
    ];

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

        console.log(sortRoomDataByNameDesc);
        setRoomData(sortRoomDataByNameDesc);
    }, [setRoomData])
    
    return {
        username,
        password,
        allRoomData,
        onUsernameChange,
        onPasswordChange,
        onSubmit,
        onGetRoomData,
        onRoomClick,
    }
}