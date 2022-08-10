import React, { memo, useEffect } from "react";
import {
  Divider,
  Fab,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { useRoomLogic } from "./use-room-logic";
import { usePlantsLogic } from "pages/plants/use-plants-logic";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export type RoomByIDProps = {
  id: string;
};

export const RoomByID = memo(({ id }: RoomByIDProps) => {
  const {
    room,
    plants,
    allRoomData,
    onGetRoomData,
    onRoomClick,
    onRoomsClick,
    onGetRoom,
    onGetRoomPlants,
    onRoomPlantClick,
  } = useRoomLogic();

  useEffect(() => {
    onGetRoom(id);
    onGetRoomPlants(id);
  }, [id]);

  return (
    <div>
      {room === undefined && <>No room for this id, go back. </>}
      {room && plants === undefined && (
      <><div>{room.name}</div>
      <div>
        <Fab size="small" color="secondary" aria-label="edit">
          <EditIcon />
        </Fab>
      </div>
      <div>
        <Fab size="small" color="secondary" aria-label="edit">
          <DeleteIcon />
        </Fab>
      </div>
      <div>
        <div>Plants Located in {room.name}</div>
          <div>
          <Link
            component="button" 
            variant="body2"
            onClick={() => onRoomsClick()}
          >
          No Plants currently assignid to this room, Click to return to Rooms"
          </Link>
        </div>
      </div></>
      )}
      {room && plants && (
        <>
          <div>{room.name}</div>
          <div>
            <Fab size="small" color="secondary" aria-label="edit">
              <EditIcon />
            </Fab>
          </div>
          <div>
            <Fab size="small" color="secondary" aria-label="edit">
              <DeleteIcon />
            </Fab>
          </div>
          <div>
            <div>Plants Located in {room.name}</div>
              <div>
              <List component="nav" aria-label="plant_folders">
                {plants.map((plant: any, index: number) => {
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
          </div>
        </>
      )}
    </div>
  );
});
