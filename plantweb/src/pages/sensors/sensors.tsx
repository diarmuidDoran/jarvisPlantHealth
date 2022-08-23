/* istanbul ignore file */
import React, { memo, useEffect } from "react";
import { Divider, Fab, List, ListItem, ListItemText } from "@mui/material";
import { useSensorsLogic } from "./use-sensors-logic";
import AddIcon from "@mui/icons-material/Add";

export const Sensors = memo(() => {
  const { sensors, onGetSensorData, onSensorClick, onAddSensorClick } = useSensorsLogic();

  useEffect(() => {
    onGetSensorData();
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  return (
    <div>
      <div>Sensors</div>
      <div>
        <List component="nav" aria-label="sensor_folders">
          {sensors.map((sensor: any, index: number) => {
            return (
              <Divider key={index}>
                <ListItem button onClick={() => onSensorClick(sensor.id)}>
                  <ListItemText primary={sensor.sensor_name} />
                </ListItem>
              </Divider>
            );
          })}
        </List>
      </div>

      <div>
        <Fab color="primary" aria-label="add" onClick={onAddSensorClick}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
});
