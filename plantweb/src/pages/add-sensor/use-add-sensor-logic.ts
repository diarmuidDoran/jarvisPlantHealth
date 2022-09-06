// import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSensors } from "shared/hooks/use-sensors";
import { PATHS } from "shared/constants";


export const useAddSensorLogic = () => {
    const [sensorName, setSensorName] = useState('')
    const [sensorCallFrequency, setSensorCallFrequency] = useState('')
    const [sensorConnectionPin, setSensorConnectionPin] = useState('')

    const { postSensor } = useSensors();

  const history = useHistory();

    const handleSensorNameChange = useCallback(
        ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setSensorName(value);
        },
        [setSensorName]
      );

    const handleSensorCallFrequencyChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setSensorCallFrequency(value);
    },
    [setSensorCallFrequency]
    );
    const handleSensorConnectionPinChange = useCallback(
      ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setSensorConnectionPin(value);
      },
      [setSensorConnectionPin]
      );
    // const handleSensorCallFrequencyChange = (event: SelectChangeEvent) => {
    //     setSensorCallFrequency(event.target.value as string)
    // };

    const onSubmit = useCallback(async () => {
        const newSensor = await postSensor(sensorName, sensorCallFrequency, Number(sensorConnectionPin));
        if (newSensor) {
          history.push(`${PATHS.sensors}/${newSensor.id}`);
        }
      }, [postSensor, history, sensorName, sensorCallFrequency, sensorConnectionPin]);

    return {
        sensorName,
        sensorCallFrequency,
        sensorConnectionPin,
        handleSensorNameChange,
        handleSensorCallFrequencyChange,
        handleSensorConnectionPinChange,
        onSubmit,
    }
}