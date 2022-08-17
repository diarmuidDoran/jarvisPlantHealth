import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { useHistory } from "react-router-dom";

import { usePlants } from "shared/hooks/use-plants";
import { PATHS } from "shared/constants";

export const useAddPlantLogic = () => {

    const [plantName, setPlantName] = useState("");
    const [room, setRoom] = useState("");

    const { postPlant } = usePlants();

    const history = useHistory();

    const [upperRequiredValue, setUpperRequiredValue] =useState("");
    const [lowerRequiredValue, setLowerRequiredValue] =useState("");
    const [plantHealthAttribute, setPlantHealthAttribute] =useState("");
    const [unitMeasurement, setUnitMeasurement] =useState("");
    const [sensor, setSensor] =useState("");

    const onPlantNameChange = useCallback(
        ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setPlantName(value);
        },
        [setPlantName]
    );

    const handleRoomChange = (event: SelectChangeEvent) => {
        setRoom(event.target.value as string)
    };

    const onPlantHealthUpperLimitChange = useCallback(
        ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setUpperRequiredValue(value);
        },
        [setUpperRequiredValue]
    );

    const onPlantHealthLowerLimitChange = useCallback(
        ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setLowerRequiredValue(value);
        },
        [setLowerRequiredValue]
    );

    const handleHealthAttributeChange = (event: SelectChangeEvent) => {
        setPlantHealthAttribute(event.target.value as string)
    };

    const handleUnitChange = (event: SelectChangeEvent) => {
        setUnitMeasurement(event.target.value as string)
    };

    const handleSensorChange = (event: SelectChangeEvent) => {
        setSensor(event.target.value as string)
    };

    // const [plantData, setPlantData] = useState<any>([]);
    // const [plantHelathAttributeData, setPlantHealthAttributeData] = useState<any>([]);

    // const onGetPlantHealthAttributeData = useCallback(() => {
    //     setPlantHealthAttributeData(mockPlantHelathAttributeData);
    // }, [setPlantHealthAttributeData])

    const onSubmit = useCallback(async () => {
        const newPlant = await postPlant(plantName, Number(room));
        if (newPlant) {
          history.push(`${PATHS.plants}/${newPlant.id}`);
        }
      }, [postPlant, plantName, room, history]);

    return {
        plantName,
        room,
        upperRequiredValue,
        lowerRequiredValue,
        plantHealthAttribute,
        unitMeasurement,
        sensor,
        onPlantNameChange,
        handleRoomChange,
        onPlantHealthUpperLimitChange,
        onPlantHealthLowerLimitChange,
        handleHealthAttributeChange,
        handleUnitChange,
        handleSensorChange,
        onSubmit,
    }
}