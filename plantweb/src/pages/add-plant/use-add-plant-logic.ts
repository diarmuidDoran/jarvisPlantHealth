import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { usePlants } from "shared/hooks/use-plants";
import { useRooms } from "shared/hooks/use-rooms";
import { useUnitMeasurements } from "shared/hooks/use-unit-measurements";
import { useHealthAttributes } from "shared/hooks/use-health-attributes";
import { useSensors } from "shared/hooks/use-sensors";
import { PATHS } from "shared/constants";

export const useAddPlantLogic = () => {
  const [plantName, setPlantName] = useState("");
  const [room, setRoom] = useState("");

  const { postPlant, postPlantHealthAttribute } = usePlants();
  const { rooms, getRooms } = useRooms();
  const { units, getUnitMeasurements } = useUnitMeasurements();
  const { health_attributes, getHealthAttributes} = useHealthAttributes();
  const {sensors, getSensors } = useSensors();

  const history = useHistory();

  const [upperRequiredValue, setUpperRequiredValue] = useState("");
  const [lowerRequiredValue, setLowerRequiredValue] = useState("");
  const [healthAttributeID, setPlantHealthAttribute] = useState("");
  const [unitMeasurementID, setUnitMeasurement] = useState("");
  const [sensorID, setSensor] = useState("");

  const onPlantNameChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setPlantName(value);
    },
    [setPlantName]
  );

  const handleRoomChange = (event: SelectChangeEvent) => {
    setRoom(event.target.value as string);
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
    setPlantHealthAttribute(event.target.value as string);
  };

  const handleUnitChange = (event: SelectChangeEvent) => {
    setUnitMeasurement(event.target.value as string);
  };

  const handleSensorChange = (event: SelectChangeEvent) => {
    setSensor(event.target.value as string);
  };

  const onGetRoomData = useCallback(() => {
    getRooms();
  }, [getRooms]);

  const onGetUnitMeasurementData = useCallback(() => {
    getUnitMeasurements();
  }, [getUnitMeasurements]);

  const onGetHealthAttributeData = useCallback(() => {
    getHealthAttributes();
  }, [getHealthAttributes]);

  const onGetSensorData = useCallback(() => {
    getSensors();
  }, [getSensors]);


  const onSubmit = useCallback(async () => {
    const newPlant = await postPlant(plantName, Number(room));

    if (newPlant) {
      postPlantHealthAttribute(
        newPlant.id,
        Number(upperRequiredValue),
        Number(lowerRequiredValue),
        Number(unitMeasurementID),
        newPlant.id,
        Number(healthAttributeID)
      );
      history.push(`${PATHS.plants}/${newPlant.id}`);
    }
  }, [postPlant, plantName, room, history]);

  return {
    plantName,
    room,
    rooms,
    units,
    health_attributes,
    sensors,
    upperRequiredValue,
    lowerRequiredValue,
    healthAttributeID,
    unitMeasurementID,
    sensorID,
    onPlantNameChange,
    handleRoomChange,
    onPlantHealthUpperLimitChange,
    onPlantHealthLowerLimitChange,
    handleHealthAttributeChange,
    handleUnitChange,
    handleSensorChange,
    onSubmit,
    onGetRoomData,
    onGetUnitMeasurementData,
    onGetHealthAttributeData,
    onGetSensorData,
  };
};
