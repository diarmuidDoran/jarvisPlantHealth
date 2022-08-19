/* istanbul ignore file */
import React, { memo, useEffect } from "react";
import {
  Button,
  Box,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Stack,
} from "@mui/material";
import { useAddSensorLogic } from "./use-add-sensor-logic";
//import { useSensorsLogic } from "pages/sensors/use-sensors-logic";

export const AddSensor = memo(() => {
  const {
    sensorName,
    sensorCallFrequency,
    handleSensorNameChange,
    handleSensorCallFrequencyChange,
    onSubmit,
  } = useAddSensorLogic();

  //const { sensors, onGetSensorData } = useSensorsLogic();

  // useEffect(() => {
  //   onGetSensorData();
  // }, []);

  return (
    <div>
      <div>Add sensor</div>
      <div>
        <p>
          Complete the below fields to add your new sensor, avoid using existing
          room names.
        </p>
      </div>
      <div>
        <TextField
          id="sensor-name"
          label="Sensor Name"
          variant="outlined"
          value={sensorName}
          onChange = {handleSensorNameChange}
        />
      </div>
      <div>
        <TextField
          id="sensor-call-frequency"
          label="Sensor Call Frequency"
          variant="outlined"
          value={sensorCallFrequency}
          onChange = {handleSensorCallFrequencyChange}
        />
      </div>
      {/* <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sensor</InputLabel>
            <Select
              labelId="sensor-call-frequency-id"
              id="sensor-call-frequency"
              value={sensorCallFrequency}
              label="Sensor Call Frequency"
              onChange={handleSensorCallFrequencyChange}
            >
              {sensors.map((sensor: any) => (
                <MenuItem key={sensor.id} value={sensor.call_frequency}>
                  {sensor.sensor_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div> */}
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={onSubmit}>Add Sensor</Button>
        </Stack>
      </div>
    </div>
  );
});
