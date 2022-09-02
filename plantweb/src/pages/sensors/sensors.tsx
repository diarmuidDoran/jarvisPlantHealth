/* istanbul ignore file */
import React, { memo, useEffect } from "react";
import {
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useSensorsLogic } from "./use-sensors-logic";
import AddIcon from "@mui/icons-material/Add";
import { useAppStyles } from "use-app-styles";

export const Sensors = memo(() => {
  const { sensors, onGetSensorData, onSensorClick, onAddSensorClick } =
    useSensorsLogic();
  const { classes } = useAppStyles();

  useEffect(
    () => {
      onGetSensorData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      xs={12}
    >
      <Grid xs={12}>
        <h3 className={classes.page_title}>Sensors</h3>
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
          aria-label="sensor_folders"
          className={classes.page_item_list}
        >
          {sensors.map((sensor: any, index: number) => {
            return (
              <Grid xs={12}>
                <Divider key={index}>
                  <ListItem button onClick={() => onSensorClick(sensor.id)}>
                    <ListItemText primary={sensor.sensor_name} />
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
          className="add_button"
          size="medium"
          color="primary"
          aria-label="add"
          onClick={onAddSensorClick}
        >
          <AddIcon />
        </Fab>
        </Grid>
      </Grid>
    </Grid>
  );
});
