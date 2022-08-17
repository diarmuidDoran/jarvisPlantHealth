/* istanbul ignore file */
import React, { memo } from "react";
import { Button, TextField, Stack } from "@mui/material";
import { useAddRoomLogic } from "./use-add-room-logic";

export const AddRoom = memo(() => {
  const { roomName, onRoomNameChange, onSubmit } = useAddRoomLogic();

  // useEffect(() => {
  // }, []);

  return (
    <div>
      <div>Add Room</div>
      <div>
        <p>
          Complete the below fields to add your new room, avoid using existing
          room names.
        </p>
      </div>
      <div>
        <TextField
          id="room-name"
          label="Room Name"
          variant="outlined"
          value={roomName}
          onChange={onRoomNameChange}
        />
      </div>
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={onSubmit}>
            Add Room
          </Button>
        </Stack>
      </div>
    </div>
  );
});
