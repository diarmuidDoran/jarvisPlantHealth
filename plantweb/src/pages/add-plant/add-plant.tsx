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
import { useAddPlantLogic } from "./use-add-plant-logic";
import AddIcon from "@mui/icons-material/Add";

export const AddPlant = memo(() => {
  const {
    plantName,
    room,
    rooms,
    units,
    sensors,
    health_attributes,
    upperRequiredValue,
    lowerRequiredValue,
    healthAttributeID,
    unitMeasurementID,
    sensorID,
    onPlantNameChange,
    handleRoomChange,
    onPlantHealthUpperLimitChange,
    onPlantHealthLowerLimitChange,
    handleHealthAttributeChange,
    handleUnitChange,
    handleSensorChange,
    onSubmit,
    onGetRoomData,
    onGetSensorData,
    onGetUnitMeasurementData,
    onGetHealthAttributeData,
  } = useAddPlantLogic();


  useEffect(() => {
    onGetRoomData();
    onGetSensorData();
    onGetUnitMeasurementData();
    onGetHealthAttributeData();
  }, []);

  return (
    <div>
      <div>Add Plant</div>
      <div>
        <p>
          Complete the below fields to add your new plant, avoid using existing
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
        <p>Add the plant health attributes to be monitored</p>
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
              value={healthAttributeID}
              label="Plant Health Attribute"
              onChange={handleHealthAttributeChange}
            >
              {health_attributes.map((health_attribute: any) => (
                <MenuItem key={health_attribute.id} value={health_attribute.id}>
                  {health_attribute.name}
                </MenuItem>
              ))}
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
              value={unitMeasurementID}
              label="Unit Measurement"
              onChange={handleUnitChange}
            >
              {units.map((unit: any) => (
                <MenuItem key={unit.id} value={unit.id}>
                  {unit.unit}
                </MenuItem>
              ))}
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
              value={sensorID}
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
