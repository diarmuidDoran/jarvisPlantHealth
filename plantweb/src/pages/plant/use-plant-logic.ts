import { ChangeEvent, useCallback, useState } from 'react';

export const usePlantLogic = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState<any>([]);

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

    const onGetData = useCallback(() => {
        const mockData = [
            {
            id: 1,
            name: 'Plant 1',
            },
            {
                id: 2,
                name: 'Plant 2',
            }
        ]
        console.log('Woooooooooooooooo');
        console.log(mockData);
        setData(mockData);
    }, [setData])

    return {
        username,
        password,
        data,
        onUsernameChange,
        onPasswordChange,
        onSubmit,
        onGetData,
    }
}