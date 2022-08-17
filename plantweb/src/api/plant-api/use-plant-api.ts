import { getPlants, getPlant, addPlant, editPlant, deletePlant } from "./plant-api";
import { PlantRequest } from "./plant-api-types";

export const usePlantApi = () => {
  return {
    getPlants: () => getPlants({}),
    getPlant: (id: number) => getPlant(id, {}),
    addPlant: (plant: PlantRequest) => addPlant(plant, {}),
    editPlant: (id: number, plant: PlantRequest) => editPlant(id, plant, {}),
    deletePlant: (id: number) => deletePlant(id, {}),
  };
};
