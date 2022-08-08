import { ChangeEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'shared/constants';

export const useSensorsLogic = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [allSensorData, setSensorData] = useState<any>([]);

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

    const onSensorClick = useCallback((id: string) => {
        history.push(`${PATHS.sensors}/${id}`)
    }, [history]);

    const mockData = [
        {
            id: 1,
            name: 'Sensor 1',
        },
        {
            id: 2,
            name: 'Sensor 2',
        },
        {
            id: 3,
            name: 'Sensor 3',
        },
        {
            id: 4,
            name: 'Sensor 4',
        }
    ];

    const sortSensorDataByNameDesc = [...mockData].sort((a, b) => {
            if(a.name > b.name){
                return 1;
            }
            if(a.name < b.name){
                return -1;
            }
            return 0;
    }); 

    const onGetSensorData = useCallback(() => {

        console.log(sortSensorDataByNameDesc);
        setSensorData(sortSensorDataByNameDesc);
    }, [setSensorData]);
    
    return {
        username,
        password,
        allSensorData,
        onUsernameChange,
        onPasswordChange,
        onSubmit,
        onGetSensorData,
        onSensorClick,
    }
}