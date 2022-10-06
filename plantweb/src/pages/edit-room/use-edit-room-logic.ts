import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useRooms } from "shared/hooks/use-rooms";
import { PATHS } from "shared/constants";

export const useEditRoomLogic = (id: number) => {
  const [roomName, setRoomName] = useState("");

  const { getRoom, editRoom, room } = useRooms();

  const history = useHistory();

  useEffect(() => {
    setRoomName(room?.name || "");
  });

  const onRoomNameChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setRoomName(value);
    },
    [setRoomName]
  );

  const onGetRoomData = useCallback(() => {
    getRoom(id);
  }, [id, getRoom]);

  const onSubmit = useCallback(async () => {
    const updateRoom = await editRoom(id, roomName);
    if (updateRoom) {
      history.push(`${PATHS.rooms}/${updateRoom.id}`);
    }
  }, [id, roomName]);

  const handleRoomNameChange = (event: SelectChangeEvent) => {
    setRoomName(event.target.value as string);
  };

  return {
    room,
    roomName,
    handleRoomNameChange,
    onGetRoomData,
    onRoomNameChange,
    onSubmit,
  };
};
