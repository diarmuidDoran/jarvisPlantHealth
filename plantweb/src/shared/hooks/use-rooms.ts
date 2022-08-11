import { useCallback, useState } from "react";
import { useNetworkStatus } from "./use-network-status";
import { RoomResponse, RoomByIDResponse, useRoomApi } from "api/room-api";

export const useRooms = () => {
  const {
    status: networkStatus,
    setInFlight,
    setSuccess,
    setError: setNetworkStatusError,
  } = useNetworkStatus();

  const {
    getRooms,
    getRoom,
  } = useRoomApi(); 

  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [room, setRoom] = useState<RoomByIDResponse>();
  const [errorMessage, setErrorMessage] = useState("");

  const getAllRooms = useCallback(
    async () => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await getRooms();

        setSuccess();
        setRooms(response.data);
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    []
  );

  const getRoomByID = useCallback(
    async (id:number) => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await getRoom(id);

        setSuccess();
        setRoom(response.data);
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    rooms,
    room,
    getRooms: getAllRooms,
    getRoom: getRoomByID,
    networkStatus,
    errorMessage,
  } as const;
};
