import { getSensors, getSensor} from "./sensor-api";

export const useSensorApi = () => {
  return {
    getSensors: () => getSensors({}),
    getSensor: (id: number) => getSensor(id, {}),
  };
};
