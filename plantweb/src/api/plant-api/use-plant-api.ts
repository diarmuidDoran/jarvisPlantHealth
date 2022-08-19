import { getPlants, getPlant, addPlant, editPlant, deletePlant, getPlantPlantHealthAttributes, getPlantPlantHealthAttribute, addPlantPlantHealthAttribute, editPlantPlantHealthAttribute, deletePlantPlantHealthAttribute } from "./plant-api";
import { PlantRequest, PlantHealthAttributeRequest } from "./plant-api-types";

export const usePlantApi = () => {
  return {
    getPlants: () => getPlants({}),
    getPlant: (id: number) => getPlant(id, {}),
    addPlant: (plant: PlantRequest) => addPlant(plant, {}),
    editPlant: (id: number, plant: PlantRequest) => editPlant(id, plant, {}),
    deletePlant: (id: number) => deletePlant(id, {}),

    getPlantPlantHealthAttributes: (plant: number) => getPlantPlantHealthAttributes(plant, {}),
    getPlantPlantHealthAttribute: (plant: number, id: number) => getPlantPlantHealthAttribute(plant, id, {}),
    addPlantPlantHealthAttribute: (plant: number, plant_health_attribute: PlantHealthAttributeRequest) => addPlantPlantHealthAttribute(plant, plant_health_attribute, {}),
    editPlantPlantHealthAttribute: (plant: number, id: number, plant_health_attribute: PlantHealthAttributeRequest) => editPlantPlantHealthAttribute(plant, id, plant_health_attribute, {}),
    deletePlantPlantHealthAttribute: (plant: number, id: number) => deletePlantPlantHealthAttribute(plant, id, {}),
  };
};
