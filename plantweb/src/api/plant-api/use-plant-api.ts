import { getPlants, getPlant } from "./plant-api";

export const usePlantApi = () => {
  return {
    getPlants: () => getPlants({}),
    getPlant: (id: number) => getPlant(id, {}),
  };
};
