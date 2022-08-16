import { useCallback, useState } from "react";
import { useNetworkStatus } from "./use-network-status";
import { SensorResponse, SensorByIDResponse, useSensorApi } from "api/sensor-api";

export const useSensors = () => {
  const {
    status: networkStatus,
    setInFlight,
    setSuccess,
    setError: setNetworkStatusError,
  } = useNetworkStatus();

  const {
    getSensor,
    getSensors,
  } = useSensorApi(); 

  const [sensors, setSensors] = useState<SensorResponse[]>([]);
  const [sensor, setSensor] = useState<SensorByIDResponse>();
  const [errorMessage, setErrorMessage] = useState("");

  const getAllSensors = useCallback(
    async () => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await getSensors();

        setSuccess();
        setSensors(response.data);
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    []
  );

  const getSensorByID = useCallback(
    async (id:number) => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await getSensor(id);

        setSuccess();
        setSensor(response.data);
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    []
  );

  return {
    sensors,
    sensor,
    getSensors: getAllSensors,
    getSensor: getSensorByID,
    networkStatus,
    errorMessage,
  } as const;
};
