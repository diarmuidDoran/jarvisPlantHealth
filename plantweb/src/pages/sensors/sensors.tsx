/* istanbul ignore file */
import React, { memo, useEffect } from "react";
import { Divider, Fab, List, ListItem, ListItemText } from "@mui/material";
import { useSensorsLogic } from "./use-sensors-logic";
import AddIcon from "@mui/icons-material/Add";

export const Sensors = memo(() => {
  const { allSensorData, onGetSensorData, onSensorClick } = useSensorsLogic();

  useEffect(() => {
    onGetSensorData();
  }, []);

  return (
    <div>
      <div>Sensors</div>
      <div>
        <List component="nav" aria-label="sensor_folders">
          {allSensorData.map((sensor: any, index: number) => {
            return (
              <Divider key={index}>
                <ListItem button onClick={() => onSensorClick(sensor.id)}>
                  <ListItemText primary={sensor.name} />
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
