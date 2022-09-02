import { SensorSensorReadingsResponse } from "api/sensor-api";
import {
  useCallback,
  useState,
  MouseEvent,
} from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";

import { useSensors } from "shared/hooks/use-sensors";
import { usePlants } from "shared/hooks/use-plants";
import { useRooms } from "shared/hooks/use-rooms";
import { useUnitMeasurements } from "shared/hooks/use-unit-measurements";
import { useHealthAttributes } from "shared/hooks/use-health-attributes";

export const useSensorLogic = () => {
  const { sensor, getSensor, deleteSensor, getSensorReadings } =
    useSensors();
  const { plants, plant_health_attributes, getPlant, getPlantPlantHealthAttributes } = usePlants();
  const { rooms, getRooms } = useRooms();
  const { units, getUnitMeasurements } = useUnitMeasurements();
  const { health_attributes, getHealthAttributes } = useHealthAttributes();
  const [popoverAnchorEl, setPopoverAnchorEl] =
    useState<HTMLButtonElement | null>(null);
    const [sensorReadings, setSensorReadings] =
    useState<SensorSensorReadingsResponse | undefined>();

  const history = useHistory();

  const handleDeletePopperClick = (event: MouseEvent<HTMLButtonElement>) => {
    setPopoverAnchorEl(popoverAnchorEl ? null : event.currentTarget);
  };

  const onSensorsClick = useCallback(() => {
    history.push(`${PATHS.sensors}`);
  }, [history]);

  const onDeleteSensorClick = useCallback(
    (id: number) => {
      deleteSensor(id);
    },
    [deleteSensor]
  );

  // const sortRoomDataByNameDesc = [...mockRoomData].sort((a, b) => {
  //         if(a.name > b.name){
  //             return 1;
  //         }
  //         if(a.name < b.name){
  //             return -1;
  //         }
  //         return 0;
  // });
  

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

  const onGetSensorData = useCallback(
    (id: number) => {
      getSensor(id);
    },
    [getSensor]
  );

  const onGetSensorReadingsData = useCallback(
    async (id: number) => {
      const sensorReadingsResponse = await getSensorReadings(id);
      setSensorReadings(sensorReadingsResponse)
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [getSensorReadings, setSensorReadings]
  );

  return {
    plants,
    plant_health_attributes,
    rooms,
    units, 
    health_attributes,
    sensor,
    sensorReadings,
    popoverAnchorEl,
    onGetSensorData,
    onDeleteSensorClick,
    onSensorsClick,
    onGetSensorReadingsData,
    handleDeletePopperClick,
  };
};
