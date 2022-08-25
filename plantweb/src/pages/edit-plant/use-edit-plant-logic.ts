import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { produce } from "immer";

import { usePlants } from "shared/hooks/use-plants";
import { useRooms } from "shared/hooks/use-rooms";
import { useUnitMeasurements } from "shared/hooks/use-unit-measurements";
import { useHealthAttributes } from "shared/hooks/use-health-attributes";
import { useSensors } from "shared/hooks/use-sensors";
import { PATHS } from "shared/constants";
import { Sensor } from "shared/types";

import { EditPlantHealthAttibute } from "./edit-plant-types";

export const useEditPlantLogic = (id: number) => {
  const {
    editPlant,
    editPlantPlantHealthAttribute,
    getPlantPlantHealthAttributes,
    deletePlantPlantHealthAttribute,
    postPlantHealthAttribute,
    plant_health_attributes: plant,
  } = usePlants();
  const { rooms, getRooms } = useRooms();
  const { units, getUnitMeasurements } = useUnitMeasurements();
  const { health_attributes, getHealthAttributes } = useHealthAttributes();
  const { sensors, sensor, getSensors, postSensorPlantHealthAttributes } =
    useSensors();
  const history = useHistory();

  const [plantName, setPlantName] = useState("");
  const [room, setRoom] = useState("");

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

  const [editPlantHealthAttributesArray, setEditPlantHealthAttributesArray] =
    useState<EditPlantHealthAttibute[]>([]);

  const [
    originalPlantHealthAttributesArray,
    setOriginalPlantHealthAttributesArray,
  ] = useState<EditPlantHealthAttibute[]>([]);

  useEffect(() => {
    const newEditPlantHealthAttributesArray =
      plant?.plant_health_attributes?.map((plant_health_attribute_element) => ({
        id: plant_health_attribute_element.id,
        upper_required_value:
          plant_health_attribute_element.upper_required_value,
        lower_required_value:
          plant_health_attribute_element.lower_required_value,
        unit_measurement_id: plant_health_attribute_element.unit_measurement_id,
        plant_id: plant.id,
        health_attribute_id: plant_health_attribute_element.health_attribute_id,
        sensor: plant_health_attribute_element?.sensor,
      })) || [];
    // console.log(JSON.stringify(newEditPlantHealthAttributesArray))

    setPlantName(plant?.name || "");
    setRoom(String(plant?.room_id) || "");
    setEditPlantHealthAttributesArray(newEditPlantHealthAttributesArray);
    //Keeping a copy of new newEditPlantHealthAttributesArray for comparison purposes when saving.
    setOriginalPlantHealthAttributesArray(newEditPlantHealthAttributesArray);
  }, [
    plant,
    setEditPlantHealthAttributesArray,
    setOriginalPlantHealthAttributesArray,
    setPlantName,
    setRoom,
  ]);

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

  // omitted as this itteration of the webapp does not allow for the editing of the sensor data
  const handleSensorChange = useCallback(
    (index: number, value: string | number) => {
      const newSensor = sensors.find((sensor) => sensor.id === value);
      const newHealthAttribute = produce(
        editPlantHealthAttributesArray,
        (draft) => {
          draft[index].sensor = newSensor;
        }
      );

      setEditPlantHealthAttributesArray(newHealthAttribute);
    },
    [sensors, editPlantHealthAttributesArray, setEditPlantHealthAttributesArray]
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
    const updatePlantHealthAttribute = [] as any[];
    const addSensorPlantHealthAttributeRelationship = [] as any[];

    const updatePlant = await editPlant(id, plantName, Number(room));

    //https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript/4026828#4026828
    const onlyInOriginal = originalPlantHealthAttributesArray.filter(
      (element) => !editPlantHealthAttributesArray.includes(element)
    );

    const onlyInEdited = editPlantHealthAttributesArray.filter(
      (element) => !originalPlantHealthAttributesArray.includes(element)
    );

    const inBoth = editPlantHealthAttributesArray.filter((element) =>
      originalPlantHealthAttributesArray.includes(element)
    );

    for (const editPlantHealthAttributeElement of onlyInOriginal) {
      const deleteResponse = await deletePlantPlantHealthAttribute(
        editPlantHealthAttributeElement.plant_id,
        editPlantHealthAttributeElement.id
      );
      updatePlantHealthAttribute.push(deleteResponse);
    }

    for (const editPlantHealthAttributeElement of onlyInEdited) {
      const postResponse = await postPlantHealthAttribute(
        id,
        editPlantHealthAttributeElement.upper_required_value,
        editPlantHealthAttributeElement.lower_required_value,
        editPlantHealthAttributeElement.unit_measurement_id,
        Number(updatePlant?.id),
        editPlantHealthAttributeElement.health_attribute_id
      );
      updatePlantHealthAttribute.push(postResponse);
      //Plant health attribute is not posting before relationship post is firing
      const newSensorPlantHealthAttributeRelationship =
        await postSensorPlantHealthAttributes(
          Number(editPlantHealthAttributeElement.sensor?.id),
          Number(postResponse?.id)
        );
      addSensorPlantHealthAttributeRelationship.push(
        newSensorPlantHealthAttributeRelationship
      );
    }

    for (const editPlantHealthAttributeElement of inBoth) {
      const putResponse = await editPlantPlantHealthAttribute(
        id,
        editPlantHealthAttributeElement.id,
        editPlantHealthAttributeElement.upper_required_value,
        editPlantHealthAttributeElement.lower_required_value,
        editPlantHealthAttributeElement.unit_measurement_id,
        editPlantHealthAttributeElement.plant_id,
        editPlantHealthAttributeElement.health_attribute_id
      );
      updatePlantHealthAttribute.push(putResponse);
    }

    // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    // editPlantHealthAttributesArray.forEach(
    //   (editPlantHealthAttributeElement) => {
    //     const response = editPlantPlantHealthAttribute(
    //       id,
    //       editPlantHealthAttributeElement.id,
    //       editPlantHealthAttributeElement.upper_required_value,
    //       editPlantHealthAttributeElement.lower_required_value,
    //       editPlantHealthAttributeElement.unit_measurement_id,
    //       editPlantHealthAttributeElement.plant_id,
    //       editPlantHealthAttributeElement.health_attribute_id
    //     );
    //     updatePlantHealthAttribute.push(response);
    //   }
    // );

    // await sleep(500);

    if (updatePlant) {
      history.push(`${PATHS.plants}/${updatePlant.id}`);
    }
  }, [
    deletePlantPlantHealthAttribute,
    editPlant,
    editPlantPlantHealthAttribute,
    postPlantHealthAttribute,
    originalPlantHealthAttributesArray,
    editPlantHealthAttributesArray,
    history,
    id,
    plantName,
    room,
  ]);

  const onAddPlantHealthAttibute = useCallback(() => {
    setEditPlantHealthAttributesArray([
      ...editPlantHealthAttributesArray,
      defaultPlantHealthAttribute,
    ]);
  }, [
    setEditPlantHealthAttributesArray,
    editPlantHealthAttributesArray,
    defaultPlantHealthAttribute,
  ]);

  const onDeletePlantHealthAttributeClick = useCallback(
    (id: number) => {
      setEditPlantHealthAttributesArray(
        editPlantHealthAttributesArray.filter((element) => element.id !== id)
      );
    },
    [setEditPlantHealthAttributesArray, editPlantHealthAttributesArray]
  );

  return {
    plant,
    plantName,
    room,
    sensor,
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
    onDeletePlantHealthAttributeClick,
  };
};
