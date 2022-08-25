import { useCallback, useEffect, useState, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";
import { usePlants } from "shared/hooks/use-plants";
import { useRooms } from "shared/hooks/use-rooms";
import { useUnitMeasurements } from "shared/hooks/use-unit-measurements";
import { useHealthAttributes } from "shared/hooks/use-health-attributes";
import { useSensors } from "shared/hooks/use-sensors";
import { EditPlantHealthAttibute } from "pages/edit-plant/edit-plant-types";


export const usePlantLogic = () => {
  const { plant_health_attributes: plant, getPlant, deletePlant, getPlantPlantHealthAttributes, } = usePlants();
  const { rooms, getRooms } = useRooms();
  const { units, getUnitMeasurements } = useUnitMeasurements();
  const { health_attributes, getHealthAttributes } = useHealthAttributes();
  const { sensors, sensor, getSensors, getSensor } = useSensors();

  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);

  const history = useHistory();

  const [plantHealthAttributesArray, setPlantHealthAttributesArray] =
    useState<EditPlantHealthAttibute[]>([]);

  useEffect(() => {
    const readPlantHealthAttributesArray =
      plant?.plant_health_attributes?.map((plant_health_attribute_element) => ({
        id: plant_health_attribute_element.id,
        upper_required_value:
          plant_health_attribute_element.upper_required_value,
        lower_required_value:
          plant_health_attribute_element.lower_required_value,
        unit_measurement_id: plant_health_attribute_element.unit_measurement_id,
        plant_id: plant_health_attribute_element.plant_id,
        health_attribute_id: plant_health_attribute_element.health_attribute_id,
        sensor: plant_health_attribute_element?.sensor,
      })) || [];
    // console.log(JSON.stringify(newPlantHealthAttributesArray))

    setPlantHealthAttributesArray(readPlantHealthAttributesArray);
  }, [plant, setPlantHealthAttributesArray,]);


  const handleDeletePopperClick = (event: MouseEvent<HTMLButtonElement>) => {
    setPopoverAnchorEl(popoverAnchorEl ? null : event.currentTarget);
  };

  const onPlantsClick = useCallback(() => {
    history.push(`${PATHS.plants}`);
  }, [history]);

  const onEditPlantClick = useCallback(
    (id: string) => {
      history.push(`${PATHS.plants}/${id}/edit`);
    },
    [history]
  );

  const onEditSensorClick = useCallback(
    (id: string) => {
      history.push(`${PATHS.sensors}/${id}/edit`);
    },
    [history]
  );

  const onDeletePlantClick = useCallback(
    (id: number) => {
      deletePlant(id);
    },
    [deletePlant]
  );

  const onPlantSensorClick = useCallback(
    (id: string) => {
      history.push(`${PATHS.sensors}/${id}`);
    },
    [history]
  );

  const onGetPlantData = useCallback(
    (id: number) => {
      getPlant(id);
    },
    [getPlant]
  );

  const onGetPlantPlantHealthAttributesData = useCallback(
    (id: number) => {
      getPlantPlantHealthAttributes(id);
    },
    [getPlantPlantHealthAttributes]
  );

  const onGetRoomsData = useCallback(() => {
    getRooms();
  }, [getRooms]);

  const onGetUnitMeasurementsData = useCallback(() => {
    getUnitMeasurements();
  }, [getUnitMeasurements]);

  const onGetHealthAttributesData = useCallback(() => {
    getHealthAttributes();
  }, [getHealthAttributes]);

  const onGetSensorsData = useCallback(() => {
    getSensors();
  }, [getSensors]);

  const onGetSensorData = useCallback(
    (id: number) => {
      getSensor(id);
    },
    [getSensor]
  );

  return {
    plant,
    rooms,
    sensor,
    sensors,
    units,
    health_attributes,
    plantHealthAttributesArray,
    popoverAnchorEl,
    onGetPlantData,
    onGetPlantPlantHealthAttributesData,
    onPlantsClick,
    onEditPlantClick,
    onDeletePlantClick,
    onPlantSensorClick,
    onEditSensorClick,
    onGetRoomsData,
    onGetUnitMeasurementsData,
    onGetHealthAttributesData,
    onGetSensorData,
    onGetSensorsData,
    handleDeletePopperClick,
  };
};
