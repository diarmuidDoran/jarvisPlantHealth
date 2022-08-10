export const mockRoomData = [
  {
    id: 1,
    name: "Room 1",
  },
  {
    id: 2,
    name: "Room 2",
  },
  {
    id: 3,
    name: "Room 3",
  },
  {
    id: 4,
    name: "Room 4",
  },
];

export const getRoomByID = (id: string) => {
  return mockRoomData.find((room) => room.id.toString() === id);
};
