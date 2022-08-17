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

  const { getRooms, getRoom, addRoom, editRoom, deleteRoom } = useRoomApi();

  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [room, setRoom] = useState<RoomByIDResponse>();

  const [errorMessage, setErrorMessage] = useState("");

  const getAllRooms = useCallback(async () => {
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
  }, [
    getRooms,
    setErrorMessage,
    setInFlight,
    setNetworkStatusError,
    setSuccess,
  ]);

  const getRoomByID = useCallback(
    async (id: number) => {
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
    [getRoom, setErrorMessage, setInFlight, setNetworkStatusError, setSuccess]
  );

  const addRoomCallback = useCallback(
    async (name: string) => {
      setErrorMessage("");
      setInFlight();

      try {
        const response = await addRoom({ name });

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [addRoom, setErrorMessage, setInFlight, setNetworkStatusError, setSuccess]
  );

  const editRoomCallback = useCallback(
    async (id: number, name: string) => {
      setErrorMessage("");
      setInFlight();

      try {
        const response = await editRoom(id, { name });

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [editRoom, setErrorMessage, setInFlight, setNetworkStatusError, setSuccess]
  );

  const deleteRoomByID = useCallback(
    async (id: number) => {
      setErrorMessage("");

      setInFlight();

      try {
        const response = await deleteRoom(id);

        setSuccess();

        return response.data;
      } catch (e: any) {
        setNetworkStatusError();
        setErrorMessage(e);

        return;
      }
    },
    [
      deleteRoom,
      setErrorMessage,
      setInFlight,
      setNetworkStatusError,
      setSuccess,
    ]
  );

  return {
    rooms,
    room,
    getRooms: getAllRooms,
    getRoom: getRoomByID,
    postRoom: addRoomCallback,
    editRoom: editRoomCallback,
    deleteRoom: deleteRoomByID,
    networkStatus,
    errorMessage,
  } as const;
};
