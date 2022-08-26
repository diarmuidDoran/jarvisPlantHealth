import { SensorSensorReadingsResponse } from "api/sensor-api";
import {
  useCallback,
  useState,
  MouseEvent,
} from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "shared/constants";

import { useSensors } from "shared/hooks/use-sensors";

export const useSensorLogic = () => {
  const { sensor, getSensor, deleteSensor, getSensorReadings } =
    useSensors();
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
