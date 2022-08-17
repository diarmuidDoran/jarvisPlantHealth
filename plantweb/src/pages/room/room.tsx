import React, { memo, useEffect } from "react";
import {
  Divider,
  Fab,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useRoomLogic } from "./use-room-logic";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export type RoomByIDProps = {
  id: string;
};

export const RoomByID = memo(({ id }: RoomByIDProps) => {
  const {
    room,
    onGetRoomData,
    onRoomsClick,
    onRoomPlantClick,
    onEditRoomClick,
    onDeleteRoomClick,
  } = useRoomLogic();

  useEffect(() => {
    onGetRoomData(Number(id));
  }, [id]);

  return (
    <div>
      {room === undefined && <>No room for this id, go back. </>}
      {room && (
        <>
          <div>{room.name}</div>
          <div>
            <Fab
              size="small"
              color="secondary"
              aria-label="edit"
              onClick={() => onEditRoomClick(String(room.id))}
            >
              <EditIcon />
            </Fab>
          </div>
          <div>
            <Fab
              size="small"
              color="secondary"
              aria-label="edit"
              onClick={() => {
                onDeleteRoomClick(room.id);
                onRoomsClick();
              }}
            >
              <DeleteIcon />
            </Fab>
          </div>
          <div>
            <div>Plants Located in {room.name}</div>
            <div>
              {room.plants.length > 0 ? (
                <>
                  <div>
                    <List component="nav" aria-label="plant_folders">
                      {room.plants.map((plant: any, index: number) => {
                        return (
                          <Divider key={index}>
                            <ListItem
                              button
                              onClick={() => onRoomPlantClick(plant.id)}
                            >
                              <ListItemText primary={plant.name} />
                            </ListItem>
                          </Divider>
                        );
                      })}
                    </List>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => onRoomsClick()}
                    >
                      No Plants currently assigned to this room, Click to return
                      to Rooms
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
});
