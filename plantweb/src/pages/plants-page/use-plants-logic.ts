import { ChangeEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'shared/constants';

export const usePlantsLogic = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [allPlantData, setData] = useState<any>([]);

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

    const onPlantClick = useCallback((id: string) => {
        history.push(`${PATHS.plants}/${id}`)
    }, [history]);

    const mockData = [
        {
            id: 1,
            name: 'Plant 1',
        },
        {
            id: 2,
            name: 'APlant 2',
        },
        {
            id: 3,
            name: 'APlant 3',
        },
        {
            id: 4,
            name: 'ZPlant 4',
        }
    ];

    const sortPlantDataByNameDesc = [...mockData].sort((a, b) => {
            if(a.name > b.name){
                return 1;
            }
            if(a.name < b.name){
                return -1;
            }
            return 0;
    }); 

    const onGetPlantData = useCallback(() => {

        console.log(sortPlantDataByNameDesc);
        setData(sortPlantDataByNameDesc);
    }, [setData])
    
    return {
        username,
        password,
        allPlantData,
        onUsernameChange,
        onPasswordChange,
        onSubmit,
        onGetPlantData,
        onPlantClick,
    }
}