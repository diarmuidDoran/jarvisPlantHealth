import { getRooms, getRoom} from "./room-api";

export const useRoomApi = () => {
  return {
    getRooms: () => getRooms({}),
    getRoom: (id: number) => getRoom(id, {}),
  };
};
