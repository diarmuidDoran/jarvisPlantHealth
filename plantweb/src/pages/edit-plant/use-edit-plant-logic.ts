import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { produce } from "immer";

import { usePlants } from "shared/hooks/use-plants";
import { useRooms } from "shared/hooks/use-rooms";
import { useUnitMeasurements } from "shared/hooks/use-unit-measurements";
import { useHealthAttributes } from "shared/hooks/use-health-attributes";
import { useSensors } from "shared/hooks/use-sensors";
import { PATHS } from "shared/constants";

import { EditPlantHealthAttibute } from "./edit-plant-types";

export const useEditPlantLogic = (id: number) => {
  const {
    editPlant,
    getPlantPlantHealthAttributes,
    plant_health_attributes: plant,
  } = usePlants();
  const { rooms, getRooms } = useRooms();
  const { units, getUnitMeasurements } = useUnitMeasurements();
  const { health_attributes, getHealthAttributes } = useHealthAttributes();
  const { sensors, sensor, getSensors } = useSensors();
  const history = useHistory();

  const [plantName, setPlantName] = useState("");
  const [room, setRoom] = useState("");

  const [upperRequiredValue, setUpperRequiredValue] = useState("");
  const [lowerRequiredValue, setLowerRequiredValue] = useState("");
  const [plantHealthAttribute, setPlantHealthAttribute] = useState("");
  const [unitMeasurement, setUnitMeasurement] = useState("");
  const [sensorID, setSensor] = useState("");

  const defaultPlantHealthAttribute = {
    id: 0,
    upper_required_value: 0,
    lower_required_value: 0,
    unit_measurement_id: 0,
    plant_id: 0,
    health_attribute_id: 0,
    sensorName: "",
    sensorId: 0,
  };

  const [editPlantHealthAttributesArray, setEditPlantHealthAttributesArray] =
    useState<EditPlantHealthAttibute[]>([]);

  useEffect(() => {
    setPlantName(plant?.name || "");
    setRoom(String(plant?.room_id) || "");
    setSensor(sensor?.sensor_name || "");

    const newEditPlantHealthAttributesArray =
      plant?.plant_health_attributes?.map((plant_health_attribute) => ({
        id: plant_health_attribute.id,
        upper_required_value: plant_health_attribute.upper_required_value,
        lower_required_value: plant_health_attribute.lower_required_value,
        unit_measurement_id: plant_health_attribute.unit_measurement_id,
        plant_id: plant_health_attribute.plant_id,
        health_attribute_id: plant_health_attribute.health_attribute_id,
        sensorName: "",
        sensorId: 0,
      })) || [];
    setEditPlantHealthAttributesArray(newEditPlantHealthAttributesArray);
  }, [plant]);

  const onPlantNameChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setPlantName(value);
    },
    [setPlantName]
  );

  const handleRoomChange = useCallback(
    ({ target: { value } }: SelectChangeEvent) => {
      setRoom(value as string);
    },
    [setRoom]
  );

  const onEditPlantHealthUpperLimitChange = useCallback(
    (index: number, value: string) => {
      const newHealthAttribute = produce(
        editPlantHealthAttributesArray,
        (draft) => {
          draft[index].upper_required_value = Number(value);
        }
      );

      setEditPlantHealthAttributesArray(newHealthAttribute);
    },
    [editPlantHealthAttributesArray, setEditPlantHealthAttributesArray]
  );

  const onEditPlantHealthLowerLimitChange = useCallback(
    (index: number, value: string) => {
      const newHealthAttribute = produce(
        editPlantHealthAttributesArray,
        (draft) => {
          draft[index].lower_required_value = Number(value);
        }
      );

      setEditPlantHealthAttributesArray(newHealthAttribute);
    },
    [editPlantHealthAttributesArray, setEditPlantHealthAttributesArray]
  );

  const handleHealthAttributeChange = useCallback(
    (index: number, value: string | number) => {
      const newHealthAttribute = produce(
        editPlantHealthAttributesArray,
        (draft) => {
          draft[index].health_attribute_id = Number(value);
        }
      );

      setEditPlantHealthAttributesArray(newHealthAttribute);
    },
    [editPlantHealthAttributesArray, setEditPlantHealthAttributesArray]
  );

  const handleUnitChange = useCallback(
    (index: number, value: string | number) => {
      const newHealthAttribute = produce(
        editPlantHealthAttributesArray,
        (draft) => {
          draft[index].unit_measurement_id = Number(value);
        }
      );

      setEditPlantHealthAttributesArray(newHealthAttribute);
    },
    [editPlantHealthAttributesArray, setEditPlantHealthAttributesArray]
  );

  const handleSensorChange = useCallback(
    ({ target: { value } }: SelectChangeEvent) => {
      setSensor(value as string);
    },
    [setSensor]
  );

  const onGetPlantData = useCallback(() => {
    getPlantPlantHealthAttributes(id);
  }, [id, getPlantPlantHealthAttributes]);

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
    const updatePlant = await editPlant(id, plantName, Number(room));
    if (updatePlant) {
      history.push(`${PATHS.plants}/${updatePlant.id}`);
    }
  }, [editPlant, history, id, plantName, room]);

  const onAddPlantHealthAttibute = useCallback(() => {
    setEditPlantHealthAttributesArray([
      ...editPlantHealthAttributesArray,
      defaultPlantHealthAttribute,
    ]);
  }, [editPlantHealthAttributesArray, setEditPlantHealthAttributesArray]);

  return {
    plant,
    plantName,
    room,
    upperRequiredValue,
    lowerRequiredValue,
    plantHealthAttribute,
    unitMeasurement,
    sensor,
    sensorID,
    rooms,
    units,
    health_attributes,
    sensors,
    editPlantHealthAttributesArray,
    onPlantNameChange,
    handleRoomChange,
    handleHealthAttributeChange,
    handleUnitChange,
    handleSensorChange,
    onSubmit,
    onGetPlantData,
    onGetRoomData,
    onGetUnitMeasurementData,
    onGetHealthAttributeData,
    onGetSensorData,
    onEditPlantHealthUpperLimitChange,
    onEditPlantHealthLowerLimitChange,
    onAddPlantHealthAttibute,
  };
};
