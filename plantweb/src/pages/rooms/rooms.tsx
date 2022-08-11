import React, { memo, useEffect } from "react";
import {
  Divider,
  Fab,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useRoomsLogic } from "./use-rooms-logic";
import AddIcon from "@mui/icons-material/Add";

export const Rooms = memo(() => {
  const {
    rooms,
    allRoomData,
    onGetRoomDataOLD,
    onGetRoomData,
    onRoomClick,
    onAddRoomClick,
  } = useRoomsLogic();

  useEffect(() => {
    onGetRoomData();
  }, []);

  return (
    <div>
      <div>Rooms</div>
      <div>
        <List component="nav" aria-label="room_folders">
          {rooms.map((room: any, index: number) => {
            return (
              <Divider key={index}>
                <ListItem button onClick={() => onRoomClick(room.id)}>
                  <ListItemText primary={room.name} />
                </ListItem>
              </Divider>
            );
          })}
        </List>
      </div>
      
      <div>
        <Fab color="primary" aria-label="add" onClick={onAddRoomClick}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
});
