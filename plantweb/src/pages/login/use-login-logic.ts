import { ChangeEvent, useCallback, useState } from 'react';

export const useLoginLogic = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState<any>([]);

    const onUsernameChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setUsername(value);
      }, [setUsername]);

    const onPasswordChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
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