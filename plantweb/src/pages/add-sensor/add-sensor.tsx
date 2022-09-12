/* istanbul ignore file */
import React, { memo } from "react";
import { Button, TextField, Stack, Grid } from "@mui/material";
import { useAddSensorLogic } from "./use-add-sensor-logic";
import { useAppStyles } from "use-app-styles";
//import { useSensorsLogic } from "pages/sensors/use-sensors-logic";

export const AddSensor = memo(() => {
  const {
    sensorName,
    sensorCallFrequency,
    sensorConnectionPin,
    handleSensorConnectionPinChange,
    handleSensorNameChange,
    handleSensorCallFrequencyChange,
    onSubmit,
  } = useAddSensorLogic();

  //const { sensors, onGetSensorData } = useSensorsLogic();

  // useEffect(() => {
  //   onGetSensorData();
  // },
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // []);

  const { classes } = useAppStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      xs={12}
    >
      <Grid xs={12}>
        <h3 className={classes.page_title}>Add sensor</h3>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        xs={12}
      >
        <Grid xs={12}>
          <p>
            Complete the below fields to add your new sensor, avoid using
            existing room names.
          </p>
        </Grid>
        <Grid xs={12}>
          <TextField
            id="sensor-name"
            label="Sensor Name"
            variant="outlined"
            value={sensorName}
            onChange={handleSensorNameChange}
            style={{ width: "75%", marginBottom: 10 }}
          />
        </Grid>
        <Grid xs={12}>
          <p style={{ marginBottom: 10, whiteSpace: "pre-wrap" }}>
            Sensor Call frequency is required to be input in a cronTab format.
            Follow the{" "}
            <a
              href="https://crontab.guru/#*/5_*_*_*_*"
              target="_blank"
              rel="noreferrer"
            >
              crontab guru
            </a>{" "}
            link to set your call frequency times and paste them into the Sensor
            Call frequency text box below.
          </p>
        </Grid>
        <Grid xs={12}>
          <TextField
            id="sensor-call-frequency"
            label="Sensor Call Frequency e.g. */5 * * * * = every 5th minute"
            variant="outlined"
            value={sensorCallFrequency}
            onChange={handleSensorCallFrequencyChange}
            style={{ width: "75%", marginBottom: 10 }}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            id="sensor-connection-pin"
            label="Sensor Connection Pin Number(0-47)"
            variant="outlined"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              min: 0,
              max: 47,
            }}
            type="number"
            value={sensorConnectionPin}
            onChange={handleSensorConnectionPinChange}
            style={{ width: "75%", marginBottom: 10 }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        spacing={1}
        direction="row"
        justifyContent="flex-end"
      >
        <Grid xs={2}>
          <Stack
            spacing={2}
            direction="row"
            style={{ width: "75%", marginBottom: 20, marginTop: 20 }}
          >
            <Button variant="outlined" onClick={onSubmit}>
              Add Sensor
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
});
