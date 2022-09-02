import React, { memo, useEffect } from "react";
import {
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useRoomsLogic } from "./use-rooms-logic";
import AddIcon from "@mui/icons-material/Add";
import { useAppStyles } from "use-app-styles";

export const Rooms = memo(() => {
  const { rooms, onGetRoomData, onRoomClick, onAddRoomClick } = useRoomsLogic();

  useEffect(
    () => {
      onGetRoomData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
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
        <h3 className={classes.page_title}>Rooms</h3>
      </Grid>
      <Grid
        container
        xs={12}
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <List
          component="nav"
          aria-label="room_folders"
          className={classes.page_item_list}
        >
          {rooms.map((room: any, index: number) => {
            return (
              <Grid xs={12}>
                <Divider key={index}>
                  <ListItem button onClick={() => onRoomClick(room.id)}>
                    <ListItemText primary={room.name} />
                  </ListItem>
                </Divider>
              </Grid>
            );
          })}
        </List>
      </Grid>

      <Grid
        container
        xs={12}
        spacing={1}
        direction="row"
        justifyContent="flex-end"
      >
        <Grid xs={2}>
          <Fab
            className={classes.add_button}
            size="medium"
            color="primary"
            aria-label="add"
            onClick={onAddRoomClick}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  );
});
