import React, { memo, useEffect } from "react";
import {
  Divider,
  Grid,
  Fab,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { usePlantsLogic } from "./use-plants-logic";
import AddIcon from "@mui/icons-material/Add";
import { useAppStyles } from "use-app-styles";

export const Plants = memo(() => {
  const { plants, onGetPlantsData, onPlantClick, onAddPlantClick } =
    usePlantsLogic();

  useEffect(
    () => {
      onGetPlantsData();
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
      height="100%"
      minHeight="100%"
      xs={12}
    >
      <Grid xs={12}>
        <h3 className={classes.page_title}>Plants</h3>
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
          aria-label="plant_folders"
          className={classes.page_item_list}
        >
          {plants.map((plant: any, index: number) => {
            return (
              <Grid xs={12}>
                <Divider key={index}>
                  <ListItem button onClick={() => onPlantClick(plant.id)}>
                    <ListItemText primary={plant.name} />
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
        <Grid xs={12} style={{ width: "75%", marginBottom: 20, marginTop: 20 }}>
          Please note: Before adding a new plant make sure you have the room
          details already added and the sensors you want to use for that
          specific plant.
        </Grid>
        <Grid xs={2}>
          <Fab
            className={classes.add_button}
            size="medium"
            color="primary"
            aria-label="add"
            onClick={onAddPlantClick}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  );
});
