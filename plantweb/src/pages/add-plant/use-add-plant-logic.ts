import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useCallback, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { usePlants } from "shared/hooks/use-plants";
import { useRooms } from "shared/hooks/use-rooms";
import { useUnitMeasurements } from "shared/hooks/use-unit-measurements";
import { useHealthAttributes } from "shared/hooks/use-health-attributes";
import { useSensors } from "shared/hooks/use-sensors";
import { PATHS } from "shared/constants";
import { AddPlantHealthAttibute } from "./add-plant-types";
import { Sensor } from "shared/types";
import { produce } from "immer";

export const useAddPlantLogic = () => {
  const [plantName, setPlantName] = useState("");
  const [room, setRoom] = useState("");

  const {
    postPlant,
    postPlantHealthAttribute,
  } = usePlants();
  const { rooms, getRooms } = useRooms();
  const { units, getUnitMeasurements } = useUnitMeasurements();
  const { health_attributes, getHealthAttributes } = useHealthAttributes();
  const { sensors, getSensors, postSensorPlantHealthAttributes } = useSensors();

  const history = useHistory();

  const defaultPlantHealthAttribute = useMemo(() => {
    return {
      id: 0,
      upper_required_value: 0,
      lower_required_value: 0,
      unit_measurement_id: 0,
      plant_id: 0,
      health_attribute_id: 0,
      sensor: {} as Sensor,
    };
  }, []);

  const [addPlantHealthAttributesArray, setAddPlantHealthAttributesArray] =
    useState<AddPlantHealthAttibute[]>([]);

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
    (index: number, value: string) => {
      const newHealthAttribute = produce(
        addPlantHealthAttributesArray,
        (draft) => {
          draft[index].upper_required_value = Number(value);
        }
      );

      setAddPlantHealthAttributesArray(newHealthAttribute);
    },
    [addPlantHealthAttributesArray, setAddPlantHealthAttributesArray]
  );

  const onPlantHealthLowerLimitChange = useCallback(
    (index: number, value: string) => {
      const newHealthAttribute = produce(
        addPlantHealthAttributesArray,
        (draft) => {
          draft[index].lower_required_value = Number(value);
        }
      );

      setAddPlantHealthAttributesArray(newHealthAttribute);
    },
    [addPlantHealthAttributesArray, setAddPlantHealthAttributesArray]
  );

  const handleHealthAttributeChange = useCallback(
    (index: number, value: string | number) => {
      const newHealthAttribute = produce(
        addPlantHealthAttributesArray,
        (draft) => {
          draft[index].health_attribute_id = Number(value);
        }
      );

      setAddPlantHealthAttributesArray(newHealthAttribute);
    },
    [addPlantHealthAttributesArray, setAddPlantHealthAttributesArray]
  );

  const handleUnitChange = useCallback(
    (index: number, value: string | number) => {
      const newHealthAttribute = produce(
        addPlantHealthAttributesArray,
        (draft) => {
          draft[index].unit_measurement_id = Number(value);
        }
      );

      setAddPlantHealthAttributesArray(newHealthAttribute);
    },
    [addPlantHealthAttributesArray, setAddPlantHealthAttributesArray]
  );

  const handleSensorChange = useCallback(
    (index: number, value: string | number) => {
      const newSensor = sensors.find((sensor) => sensor.id === value);
      const newHealthAttribute = produce(
        addPlantHealthAttributesArray,
        (draft) => {
          draft[index].sensor = newSensor;
        }
      );

      setAddPlantHealthAttributesArray(newHealthAttribute);
    },
    [sensors, addPlantHealthAttributesArray, setAddPlantHealthAttributesArray]
  );

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
    const addPlantHealthAttribute = [] as any[];
    const addSensorPlantHealthAttributeRelationship = [] as any[];

    for (const plantHealthAttributeElement of addPlantHealthAttributesArray) {
      const postResponse = await postPlantHealthAttribute(
        Number(newPlant?.id),
        plantHealthAttributeElement.upper_required_value,
        plantHealthAttributeElement.lower_required_value,
        plantHealthAttributeElement.unit_measurement_id,
        Number(newPlant?.id),
        plantHealthAttributeElement.health_attribute_id
      );
      addPlantHealthAttribute.push(postResponse);

      const newSensorPlantHealthAttributeRelationship =
        await postSensorPlantHealthAttributes(
          Number(plantHealthAttributeElement.sensor?.id),
          Number(postResponse?.id)
        );
      addSensorPlantHealthAttributeRelationship.push(
        newSensorPlantHealthAttributeRelationship
      );
    }

    if (newPlant) {
      history.push(`${PATHS.plants}/${newPlant.id}`);
    }
  }, [
    postPlantHealthAttribute,
    addPlantHealthAttributesArray,
    history,
    plantName,
    room,
  ]);

  const onAddPlantHealthAttibute = useCallback(() => {
    setAddPlantHealthAttributesArray([
      ...addPlantHealthAttributesArray,
      defaultPlantHealthAttribute,
    ]);
  }, [
    setAddPlantHealthAttributesArray,
    addPlantHealthAttributesArray,
    defaultPlantHealthAttribute,
  ]);

  const onDeletePlantHealthAttributeClick = useCallback(
    (id: number) => {
      setAddPlantHealthAttributesArray(
        addPlantHealthAttributesArray.filter((element) => element.id !== id)
      );
    },
    [setAddPlantHealthAttributesArray, addPlantHealthAttributesArray]
  );

  return {
    addPlantHealthAttributesArray,
    plantName,
    room,
    rooms,
    units,
    health_attributes,
    sensors,
    onAddPlantHealthAttibute,
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
    onDeletePlantHealthAttributeClick,
  };
};
