/* istanbul ignore file */
import React, { memo } from "react";
import {
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useAddSensorLogic } from "./use-add-sensor-logic";
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
      <div>
        <TextField
          id="sensor-connection-pin"
          label="Sensor Connection Pin"
          variant="outlined"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          type="number"
          value={sensorConnectionPin}
          onChange = {handleSensorConnectionPinChange}
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
