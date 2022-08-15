import { getRooms, getRoom} from "./sensor-api";

export const useRoomApi = () => {
  return {
    getRooms: () => getRooms({}),
    getRoom: (id: number) => getRoom(id, {}),
  };
};
