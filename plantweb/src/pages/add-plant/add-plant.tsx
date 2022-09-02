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
  Grid,
} from "@mui/material";
import { useAddPlantLogic } from "./use-add-plant-logic";
import AddIcon from "@mui/icons-material/Add";

import { useAppStyles } from "use-app-styles";

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
        <h3 className={classes.page_title}>Add Plant</h3>
      </Grid>
      <Grid xs={12}>
        <p>
          Complete the below fields to add your new plant, avoid using existing
          plant names.
        </p>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        xs={12}
      >
        <Grid xs={12}>
          <TextField
            id="plant-by-id-name"
            label="Plant Name"
            variant="outlined"
            value={plantName}
            onChange={onPlantNameChange}
            style={{ width: "75%", marginBottom: 10 }}
          />
        </Grid>
        <Grid xs={12}>
          <Box sx={{ minWidth: 150 }}>
            <FormControl style={{ width: "75%", marginBottom: 10 }}>
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
        </Grid>
      </Grid>
      <Grid xs={9}>
        <p>
          Add the plant health attributes to be monitored. Click the plus button
          to add more health attributes to your plant. Remember to select an
          available sensor. If you hit the plus button for the plant health
          attribute information and don't need anymore, leave it blank and it
          will be ignored.
        </p>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        xs={9}
      >
        {addPlantHealthAttributesArray.map(
          (addPlantHealthAttributeElement, index) => (
            <>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
                xs={10}
                marginBottom={10}
              >
                <Grid xs={12}>
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    id="plant-plant-health-attribute-upper-limit"
                    label="Plant Health Attribute Upper Limit (00.00)"
                    variant="outlined"
                    type="number"
                    style={{ width: "75%", marginBottom: 10 }}
                    value={addPlantHealthAttributeElement.upper_required_value}
                    onChange={({
                      target: { value },
                    }: ChangeEvent<HTMLInputElement>) => {
                      onPlantHealthUpperLimitChange(index, value);
                    }}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    id="plant-plant-health-attribute-lower-limit"
                    label="Plant Health Attribute Lower Limit (00.00)"
                    variant="outlined"
                    type="number"
                    style={{ width: "75%", marginBottom: 10 }}
                    value={addPlantHealthAttributeElement.lower_required_value}
                    onChange={({
                      target: { value },
                    }: ChangeEvent<HTMLInputElement>) => {
                      onPlantHealthLowerLimitChange(index, value);
                    }}
                  />
                </Grid>
                <Grid xs={12}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl style={{ width: "75%", marginBottom: 10 }}>
                      <InputLabel id="plant-health-attribute-select-label">
                        Plant Health Attribute
                      </InputLabel>
                      <Select
                        labelId="plant-health-attribute-select-label"
                        id="plant-health-attribute-select"
                        value={
                          addPlantHealthAttributeElement.health_attribute_id
                        }
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
                </Grid>
                <Grid xs={12}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl style={{ width: "75%", marginBottom: 10 }}>
                      <InputLabel id="unit-select-label">
                        Unit Measurement
                      </InputLabel>
                      <Select
                        labelId="unit-select-label"
                        id="unit-select"
                        value={
                          addPlantHealthAttributeElement.unit_measurement_id
                        }
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
                </Grid>
                <Grid xs={12}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl style={{ width: "75%", marginBottom: 10 }}>
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
                </Grid>
              </Grid>
              {/* <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                xs={2}
              >
                <Grid xs={12}>
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="edit"
                    onClick={() => {
                      onDeletePlantHealthAttributeClick(
                        addPlantHealthAttributeElement.id
                      );
                    }}
                  >
                    <DeleteIcon />
                  </Fab>
                </Grid> 
              </Grid>*/}
            </>
          )
        )}

        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          xs={2}
        >
          <Grid xs={12}>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={onAddPlantHealthAttibute}
            >
              <AddIcon />
            </Fab>
          </Grid>
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
          <Stack spacing={2} direction="row"  style={{ width: "75%", marginBottom: 20 }} >
            <Button variant="outlined" onClick={onSubmit}>
              Add Plant
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
});
