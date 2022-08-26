import React, { ChangeEvent, memo, useEffect } from "react";
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
  SelectChangeEvent,
} from "@mui/material";
import { useAddPlantLogic } from "./use-add-plant-logic";
import AddIcon from "@mui/icons-material/Add";

export const AddPlant = memo(() => {
  const {
    addPlantHealthAttributesArray,
    plantName,
    room,
    rooms,
    units,
    sensors,
    health_attributes,
    onAddPlantHealthAttibute,
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

  useEffect(
    () => {
      onGetRoomData();
      onGetSensorData();
      onGetUnitMeasurementData();
      onGetHealthAttributeData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
            <InputLabel id="room-select-label">Room</InputLabel>
            <Select
              labelId="room-select-label"
              id="room-select"
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
        {addPlantHealthAttributesArray.map(
          (addPlantHealthAttributeElement, index) => (
            <>
              <div>
                <TextField
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  id="plant-plant-health-attribute-upper-limit"
                  label="Plant Health Attribute Upper Limit (00.00)"
                  variant="outlined"
                  type="number"
                  value={addPlantHealthAttributeElement.upper_required_value}
                  onChange={({
                    target: { value },
                  }: ChangeEvent<HTMLInputElement>) => {
                    onPlantHealthUpperLimitChange(index, value);
                  }}
                />
              </div>
              <div>
                <TextField
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  id="plant-plant-health-attribute-lower-limit"
                  label="Plant Health Attribute Lower Limit (00.00)"
                  variant="outlined"
                  type="number"
                  value={addPlantHealthAttributeElement.lower_required_value}
                  onChange={({
                    target: { value },
                  }: ChangeEvent<HTMLInputElement>) => {
                    onPlantHealthLowerLimitChange(index, value);
                  }}
                />
              </div>
              <div>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="plant-health-attribute-select-label">
                      Plant Health Attribute
                    </InputLabel>
                    <Select
                      labelId="plant-health-attribute-select-label"
                      id="plant-health-attribute-select"
                      value={addPlantHealthAttributeElement.health_attribute_id}
                      label="Plant Health Attribute"
                      onChange={({
                        target: { value },
                      }: SelectChangeEvent<number>) => {
                        handleHealthAttributeChange(index, value);
                      }}
                    >
                      {health_attributes.map((health_attribute: any) => (
                        <MenuItem
                          key={health_attribute.id}
                          value={health_attribute.id}
                        >
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
                    <InputLabel id="unit-select-label">
                      Unit Measurement
                    </InputLabel>
                    <Select
                      labelId="unit-select-label"
                      id="unit-select"
                      value={addPlantHealthAttributeElement.unit_measurement_id}
                      label="Unit Measurement"
                      onChange={({
                        target: { value },
                      }: SelectChangeEvent<number>) => {
                        handleUnitChange(index, value);
                      }}
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
                    <InputLabel id="sensor-select-label">Sensor</InputLabel>
                    <Select
                      labelId="sensor-select-label"
                      id="sensor-select"
                      value={addPlantHealthAttributeElement.sensor?.id}
                      label="Sensor"
                      onChange={({
                        target: { value },
                      }: SelectChangeEvent<number>) => {
                        handleSensorChange(index, value);
                      }}
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
            </>
          )
        )}
      </div>

      <div>
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          onClick={onAddPlantHealthAttibute}
        >
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
