export const mockPlantData = [
  {
    id: 1,
    name: "Plant 1",
    room_id: 1,
  },
  {
    id: 2,
    name: "APlant 2",
    room_id: 1,
  },
  {
    id: 3,
    name: "APlant 3",
    room_id: 2,
  },
  {
    id: 4,
    name: "ZPlant 4",
    room_id: 2,
  },
];

export const getPlantByID = (id: string) => {
  return mockPlantData.find((plant) => plant.id.toString() === id);
};

export const getPlantByRoomID = (id: string) => {
  return mockPlantData.filter((plant) => plant.room_id.toString() === id);
};