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
import { useSensorsLogic } from "pages/sensors/use-sensors-logic";
import AddIcon from "@mui/icons-material/Add";

export const AddSensor = memo(() => {
  const {
    sensor,
    sensorName,
    sensorCallFrequency,
    handleSensorChange,
    onGetSensorName,
    onGetSensorCallFrequency,
  } = useAddSensorLogic();

  const { allSensorData, onGetSensorData } = useSensorsLogic();

  useEffect(() => {
    onGetSensorData();
  }, []);

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
        />
      </div>
      <div>
        <TextField
          id="sensor-call-frequency"
          label="Sensor Call Frequency"
          variant="outlined"
          value={sensorCallFrequency}
        />
      </div>
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="outlined">Add Sensor</Button>
        </Stack>
      </div>
    </div>
  );
});
