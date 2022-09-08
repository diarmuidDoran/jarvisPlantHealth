/* istanbul ignore file */
import React, { memo } from "react";
import { Button, TextField, Stack, Grid } from "@mui/material";
import { useAddRoomLogic } from "./use-add-room-logic";
import AddIcon from "@mui/icons-material/Add";
import { useAppStyles } from "use-app-styles";
export const AddRoom = memo(() => {
  const { roomName, onRoomNameChange, onSubmit } = useAddRoomLogic();

  // useEffect(() => {
  // }, []);

  const { classes } = useAppStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      xs={12}
    >
      <Grid xs={12}>
        <h3 className={classes.page_title}>Add Room</h3>
      </Grid>
      <Grid xs={12} style={{ marginBottom: 20 }}>
        Complete the below fields to add your new room, avoid using existing
        room names.
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        xs={12}
      >
        <Grid xs={12}>
          <TextField
            id="room-name"
            label="Room Name"
            variant="outlined"
            value={roomName}
            onChange={onRoomNameChange}
          />
        </Grid>
          <Grid xs={2}>
            <Stack
              spacing={2}
              direction="row"
              style={{ width: "75%", marginBottom: 20, marginTop: 20 }}
            >
              <Button variant="outlined" onClick={onSubmit}>
                Add Room
              </Button>
            </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
});
