import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";
import { usePlants } from "shared/hooks/use-plants";
import { useRooms } from "shared/hooks/use-rooms";
import { useUnitMeasurements } from "shared/hooks/use-unit-measurements";
import { useHealthAttributes } from "shared/hooks/use-health-attributes";
import { useSensors } from "shared/hooks/use-sensors";


export const usePlantLogic = () => {
  const { plant, getPlant, deletePlant, getPlantPlantHealthAttributes, } = usePlants();
  const { rooms, getRooms } = useRooms();
  const { units, getUnitMeasurements } = useUnitMeasurements();
  const { health_attributes, getHealthAttributes } = useHealthAttributes();
  const { sensors, sensor, getSensors, getSensor } = useSensors();

  const history = useHistory();

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
  };
};
