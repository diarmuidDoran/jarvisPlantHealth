import { getSensors, getSensor, addSensor, deleteSensor, getSensorSensorReadings, addSensorReading} from "./sensor-api";
import { SensorRequest, SensorReadingRequest } from "./sensor-api-types";

export const useSensorApi = () => {
  return {
    getSensors: () => getSensors({}),
    getSensor: (id: number) => getSensor(id, {}),
    addSensor: (sensor: SensorRequest) => addSensor(sensor, {}),
    deleteSensor: (id: number) => deleteSensor(id, {}),
    getSensorSensorReadings: (id: number) => getSensorSensorReadings(id, {}),
    addSensorReading: (id: number, sensor: SensorReadingRequest) => addSensorReading(id, sensor, {}),
  };
};
