import { getUnitMeasurements } from "./unit-measurement-api";

export const useUnitMeasurementApi = () => {
  return {
    getUnitMeasuremsnts: () => getUnitMeasurements({}),
  };
};
