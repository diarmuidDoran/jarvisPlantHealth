import { useCallback, useState } from "react";
import { useNetworkStatus } from "./use-network-status";
import {
  SensorResponse,
  SensorPlantHealthAttributeResponse,
  SensorSensorReadingsResponse,
  useSensorApi,
} from "api/sensor-api";

export const useSensors = () => {
  const {
    status: networkStatus,
    setInFlight,
    setSuccess,
    setError: setNetworkStatusError,
  } = useNetworkStatus();

  const { getSensors, getSensor, addSensor, deleteSensor, getSensorSensorReadings, addSensorReading, getSensorPlantHealthAttributes, addSensorPlantHealthAttributeRelationship } = useSensorApi();

  const [sensors, setSensors] = useState<SensorResponse[]>([]);
  const [sensorPlantHealthAttributes, setSensorPlantHealthAttributes] = useState<SensorPlantHealthAttributeResponse[]>([])
  const [sensor, setSensor] = useState<SensorResponse>();
  const [sensorReadings, setSensorReadings] = useState<SensorSensorReadingsResponse>();

  const [errorMessage, setErrorMessage] = useState("");

  const getAllSensors = useCallback(async () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllSensorPlantHealthAttributes = useCallback(async () => {
    setErrorMessage("");

    setInFlight();

    try {
      const response = await getSensorPlantHealthAttributes();

      setSuccess();
      setSensorPlantHealthAttributes(response.data);
    } catch (e: any) {
      setNetworkStatusError();
      setErrorMessage(e);

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSensorByID = useCallback(async (id: number) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSensorCallback = useCallback(
    async (sensor_name: string, call_frequency: string, connection_pin: number) => {
      setErrorMessage("");
      setInFlight();

      try {
        const response = await addSensor({ sensor_name, call_frequency, connection_pin });

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [addSensor, setErrorMessage, setInFlight, setNetworkStatusError, setSuccess]
  );

  const deleteSensorByID = useCallback(
    async (id: number) => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await deleteSensor(id);

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [
      deleteSensor,
      setErrorMessage,
      setInFlight,
      setNetworkStatusError,
      setSuccess,
    ]
  );

  const getSensorReadingsBySensorID = useCallback(async (id: number) => {
    setErrorMessage("");

    setInFlight();

    try {
      const response = await getSensorSensorReadings(id);

      setSuccess();
      // setSensorReadings(response.data);
      return response.data;
    } catch (e: any) {
      setNetworkStatusError();
      setErrorMessage(e);

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const addSensorReadingCallback = useCallback(
    async (sensor_id: number, sensor_reading: number, time_stamp: string) => {
      setErrorMessage("");
      setInFlight();

      try {
        const response = await addSensorReading(sensor_id , { sensor_reading , time_stamp });

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addSensor, setErrorMessage, setInFlight, setNetworkStatusError, setSuccess]
  );

  const addSensorPlantHealthAttributeCallback = useCallback(
    async (id: number, plant_health_attribute_id: number) => {
      setErrorMessage("");
      setInFlight();

      try {
        const response = await addSensorPlantHealthAttributeRelationship(id , plant_health_attribute_id);

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [addSensorPlantHealthAttributeRelationship, setErrorMessage, setInFlight, setNetworkStatusError, setSuccess]
  );

  return {
    sensors,
    sensorPlantHealthAttributes,
    sensor,
    getSensors: getAllSensors,
    getSensorPlantHealthAttributes: getAllSensorPlantHealthAttributes,
    getSensor: getSensorByID,
    postSensor: addSensorCallback,
    deleteSensor: deleteSensorByID,
    getSensorReadings: getSensorReadingsBySensorID,
    postSensorReading: addSensorReadingCallback,
    postSensorPlantHealthAttributes: addSensorPlantHealthAttributeCallback,
    networkStatus,
    errorMessage,
  } as const;
};
