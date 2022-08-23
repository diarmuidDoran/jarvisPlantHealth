import { getSensors, getSensor, addSensor, deleteSensor, getSensorSensorReadings, addSensorReading, getSensorPlantHealthAttributes, addSensorPlantHealthAttributeRelationship} from "./sensor-api";
import { SensorRequest, SensorReadingRequest } from "./sensor-api-types";

export const useSensorApi = () => {
  return {
    getSensors: () => getSensors({}),
    getSensorPlantHealthAttributes: () => getSensorPlantHealthAttributes({}),
    getSensor: (id: number) => getSensor(id, {}),
    addSensor: (sensor: SensorRequest) => addSensor(sensor, {}),
    deleteSensor: (id: number) => deleteSensor(id, {}),
    getSensorSensorReadings: (id: number) => getSensorSensorReadings(id, {}),
    addSensorReading: (id: number, sensor: SensorReadingRequest) => addSensorReading(id, sensor, {}),
    addSensorPlantHealthAttributeRelationship: (id: number, plant_health_attribute_id: number) => addSensorPlantHealthAttributeRelationship(id, plant_health_attribute_id, {}),
  };
};
