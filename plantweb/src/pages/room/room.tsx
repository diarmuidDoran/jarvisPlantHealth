import React, { memo, useEffect } from "react";
import {
  Box,
  Divider,
  Fab,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Popper,
} from "@mui/material";
import { useRoomLogic } from "./use-room-logic";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppStyles } from "use-app-styles";
export type RoomByIDProps = {
  id: string;
};

export const RoomByID = memo(({ id }: RoomByIDProps) => {
  const {
    room,
    popoverAnchorEl,
    onGetRoomData,
    onRoomsClick,
    onRoomPlantClick,
    onEditRoomClick,
    onDeleteRoomClick,
    handleDeletePopperClick,
  } = useRoomLogic();

  const open = Boolean(popoverAnchorEl);
  const popOverID = open ? "simple-popper" : undefined;

  useEffect(
    () => {
      onGetRoomData(Number(id));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
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
      {room === undefined && <>No room for this id, go back. </>}
      {room && (
        <>
          <Grid
            container
            xs={12}
            wrap="nowrap"
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              container
              xs={6}
              wrap="nowrap"
              marginRight={1}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item xs spacing={2}>
                <h3 className={classes.page_title_with_delete}>{room.name}</h3>
              </Grid>
            </Grid>
            <Grid
              container
              xs={6}
              rowSpacing={1}
              row-gap= {100}
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              style={{marginTop: 20, marginBottom:20}}
            >
              <Grid xs={3} sm={2} md={1}>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="edit"
                  onClick={() => onEditRoomClick(String(room.id))}
                >
                  <EditIcon />
                </Fab>
              </Grid>
              <Grid xs={3} sm={2} md={1}>
                <Fab
                  size="small"
                  color="primary"
                  aria-label={popOverID}
                  onClick={handleDeletePopperClick}
                >
                  <DeleteIcon />
                </Fab>
                <Popper id={popOverID} open={open} anchorEl={popoverAnchorEl}>
                  <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                    <p>Are you sure you want to delete this Room?</p>
                    <button
                      id="Sesnsor Name"
                      onClick={() => {
                        onDeleteRoomClick(room.id);
                        onRoomsClick();
                      }}
                    >
                      Delete
                    </button>
                  </Box>
                </Popper>
              </Grid>
            </Grid>
          </Grid>
          <Grid
              container
              xs={12}
              rowSpacing={1}
              row-gap= {100}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
            <Grid xs={12}>Plants Located in {room.name}</Grid>
            <Grid xs={12}>
              {room.plants.length > 0 ? (
                <>
                  <Grid xs={12}>
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
                  </Grid>
                </>
              ) : (
                <>
                  <Grid xs={12}>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => onRoomsClick()}
                    >
                      No Plants currently assigned to this room, Click to return
                      to Rooms
                    </Link>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
});
