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
import { useEditPlantLogic } from "./use-edit-plant-logic";
import { useRoomsLogic } from "pages/rooms/use-rooms-logic";
import { useSensorsLogic } from "pages/sensors/use-sensors-logic";
import AddIcon from "@mui/icons-material/Add";
export type PlantByIDProps = {
  id: string;
};

export const EditPlantByID = memo(({ id }: PlantByIDProps) => {
  const {
    plant,
    plantName,
    room,
    upperRequiredValue,
    lowerRequiredValue,
    plantHealthAttribute,
    unitMeasurement,
    sensor,
    onPlantNameChange,
    handleRoomChange,
    onPlantHealthUpperLimitChange,
    onPlantHealthLowerLimitChange,
    handleHealthAttributeChange,
    handleUnitChange,
    handleSensorChange,
    onSubmit,
  } = useEditPlantLogic(Number(id));

  const { rooms, onGetRoomData } = useRoomsLogic();
  const { sensors, onGetSensorData } = useSensorsLogic();

  useEffect(() => {
    onGetRoomData();
    onGetSensorData();
  }, []);

  return (
    <div>
      <div>Edit {plant?.name}</div>
      <div>
        <p>
          Complete the below fields to edit {plant?.name}, avoid using existing
          plant names.
        </p>
      </div>
      <div>
        <TextField
          id="plant-by-id-name"
          label="Plant Name"
          variant="outlined"
          value={plantName}
          onChange={onPlantNameChange}
        />
      </div>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Room</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={room}
              label="Room"
              onChange={handleRoomChange}
            >
              {rooms.map((room: any) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <p>Edit plant health attributes to be monitored</p>
      </div>
      <div>
        <TextField
          id="plant-plant-health-attribute-upper-limit"
          label="Plant Health Attribute Upper Limit (00.00)"
          variant="outlined"
          value={upperRequiredValue}
          onChange={onPlantHealthUpperLimitChange}
        />
      </div>
      <div>
        <TextField
          id="plant-plant-health-attribute-lower-limit"
          label="Plant Health Attribute Lower Limit (00.00)"
          variant="outlined"
          value={lowerRequiredValue}
          onChange={onPlantHealthLowerLimitChange}
        />
      </div>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Plant Health Attribute
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={plantHealthAttribute}
              label="Plant Health Attribute"
              onChange={handleHealthAttributeChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Unit Measurement
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={unitMeasurement}
              label="Unit Measurement"
              onChange={handleUnitChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sensor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sensor}
              label="Sensor"
              onChange={handleSensorChange}
            >
              {sensors.map((sensor: any) => (
                <MenuItem key={sensor.id} value={sensor.id}>
                  {sensor.sensor_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <Fab size="small" color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={onSubmit}>
            Add Plant
          </Button>
        </Stack>
      </div>
    </div>
  );
});
