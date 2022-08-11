/* istanbul ignore file */
import React, { memo, useEffect } from "react";
import {
  Button,
  Box,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Stack,
} from "@mui/material";
import { useAddRoomLogic } from "./use-add-room-logic";
import { useRoomsLogic } from "pages/rooms/use-rooms-logic";
import AddIcon from "@mui/icons-material/Add";

export const AddRoom = memo(() => {
  const {
    room,
    roomName,
    handleRoomChange,
    onGetRoomName,
  } = useAddRoomLogic();

  const { allRoomData, onGetRoomDataOLD } = useRoomsLogic();

  useEffect(() => {
    onGetRoomDataOLD();
  }, []);

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
        />
      </div>
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="outlined">Add Room</Button>
        </Stack>
      </div>
    </div>
  );
});
