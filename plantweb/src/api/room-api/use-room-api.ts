import { getRooms, getRoom, addRoom, editRoom, deleteRoom} from "./room-api";
import { RoomRequest } from "./room-api-types";

export const useRoomApi = () => {
  return {
    getRooms: () => getRooms({}),
    getRoom: (id: number) => getRoom(id, {}),
    addRoom: (room: RoomRequest) => addRoom(room, {}),
    editRoom: (id: number, room: RoomRequest) => editRoom(id, room, {}),
    deleteRoom: (id: number) => deleteRoom(id, {}),
  };
};
