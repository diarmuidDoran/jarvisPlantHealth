/* istanbul ignore file */
import React, { memo, useEffect } from "react";
import {
  Divider,
  Fab,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { usePlantsLogic } from "./use-plants-logic";
import AddIcon from "@mui/icons-material/Add";

export const Plants = memo(() => {
  const {
    
    allPlantData,
    onGetPlantData,
    onPlantClick,
  } = usePlantsLogic();

  useEffect(() => {
    onGetPlantData();
  }, []);

  return (
    <div>
      <div>Plants</div>
      <div>
        <List component="nav" aria-label="plant_folders">
          {allPlantData.map((plant: any, index: number) => {
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
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
});
