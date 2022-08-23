import React, { memo, useEffect } from "react";
import { Divider, Fab, List, ListItem, ListItemText } from "@mui/material";
import { usePlantsLogic } from "./use-plants-logic";
import AddIcon from "@mui/icons-material/Add";

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

  return (
    <div>
      <div>Plants</div>
      <div>
        <List component="nav" aria-label="plant_folders">
          {plants.map((plant: any, index: number) => {
            return (
              <Divider key={index}>
                <ListItem button onClick={() => onPlantClick(plant.id)}>
                  <ListItemText primary={plant.name} />
                </ListItem>
              </Divider>
            );
          })}
        </List>
      </div>

      <div>
        <Fab color="primary" aria-label="add" onClick={onAddPlantClick}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
});
