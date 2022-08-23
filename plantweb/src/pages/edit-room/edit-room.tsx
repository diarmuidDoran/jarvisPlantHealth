/* istanbul ignore file */
import React, { memo, useEffect } from "react";
import { Button, TextField, Stack } from "@mui/material";
import { useEditRoomLogic } from "./use-edit-room-logic";
export type RoomByIDProps = {
  id: string;
};

export const EditRoomByID = memo(({ id }: RoomByIDProps) => {
  const { room, roomName, onGetRoomData, onRoomNameChange, onSubmit } =
    useEditRoomLogic(Number(id));

  useEffect(() => {
    onGetRoomData();
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  return (
    <div>
      <div>Edit {room?.name}</div>
      <div>
        <p>
          Complete the below fields to edit room details, avoid using existing
          room names.
        </p>
      </div>
      <div>
        <TextField
          id="room-name"
          label="New Room Name"
          variant="outlined"
          value={roomName}
          onChange={onRoomNameChange}
        />
      </div>
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={onSubmit}>
            Confirm
          </Button>
        </Stack>
      </div>
    </div>
  );
});
