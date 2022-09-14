import React, { memo, useEffect, ChangeEvent } from "react";
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
  Popper,
  Popover,
} from "@mui/material";
import { useEditPlantLogic } from "./use-edit-plant-logic";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
export type PlantByIDProps = {
  id: string;
};

export const EditPlantByID = memo(({ id }: PlantByIDProps) => {
  const {
    plant,
    plantName,
    room,
    rooms,
    units,
    health_attributes,
    sensors,
    editPlantHealthAttributesArray,
    popoverAnchorEl,
    onPlantNameChange,
    handleRoomChange,
    handleHealthAttributeChange,
    handleUnitChange,
    handleSensorChange,
    handleHelpPopperClick,
    onSubmit,
    onGetPlantData,
    onGetRoomData,
    onGetSensorData,
    onGetUnitMeasurementData,
    onGetHealthAttributeData,
    onEditPlantHealthUpperLimitChange,
    onEditPlantHealthLowerLimitChange,
    onAddPlantHealthAttibute,
    onDeletePlantHealthAttributeClick,
    onPopoverClose,
  } = useEditPlantLogic(Number(id));

  const open = Boolean(popoverAnchorEl);
  const popOverID = open ? "simple-popper" : undefined;

  useEffect(
    () => {
      onGetPlantData();
      onGetRoomData();
      onGetSensorData();
      onGetUnitMeasurementData();
      onGetHealthAttributeData();
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
        <h3 className="page_title">Edit {plant?.name}</h3>
      </Grid>
      <Grid xs={12}>
        <p>
          Complete the below fields to edit {plant?.name}, avoid using existing
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
        <Grid xs={12} sm={11} md={10}>
          <TextField
            id="plant-by-id-name"
            label="Plant Name"
            variant="outlined"
            value={plantName}
            style={{ width: "75%", marginBottom: 10, textAlign: "right" }}
            onChange={onPlantNameChange}
          />
        </Grid>
        <Grid xs={12} sm={11} md={10}>
          <Box>
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
          You can edit the plant health attribute information here. Click Help
          for more information.
        </p>
        <Grid xs={12} style={{ marginBottom: 10 }}>
          {" "}
          <Button
            variant="outlined"
            aria-label={popOverID}
            onClick={handleHelpPopperClick}
          >
            Help
          </Button>
        </Grid>
        <Popover
          id={popOverID}
          open={open}
          anchorEl={popoverAnchorEl}
          onClose={onPopoverClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            <p>
              To reset sensor information you will need to delete the existing
              sensor information on the sensor page and add it again on the
              sensors page (click Sensors in the navbar). Existing Sensor
              selections cannot be edited on this page, if you made a mistake
              when selecting the sensor previously click the bin icon on the
              right hand side of the sensor/monitored plant health attribute
              information. All other fields are editable.
            </p>
          </Box>
        </Popover>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        xs={12}
      >
        {editPlantHealthAttributesArray.map(
          (editPlantHealthAttributeElement, index) => (
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
                    value={editPlantHealthAttributeElement.upper_required_value}
                    style={{ width: "75%", marginBottom: 10 }}
                    onChange={({
                      target: { value },
                    }: ChangeEvent<HTMLInputElement>) => {
                      onEditPlantHealthUpperLimitChange(index, value);
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
                    value={editPlantHealthAttributeElement.lower_required_value}
                    style={{ width: "75%", marginBottom: 10 }}
                    onChange={({
                      target: { value },
                    }: ChangeEvent<HTMLInputElement>) => {
                      onEditPlantHealthLowerLimitChange(index, value);
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
                          editPlantHealthAttributeElement.health_attribute_id
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
                          editPlantHealthAttributeElement.unit_measurement_id
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
                        value={editPlantHealthAttributeElement.sensor?.id}
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
                    aria-label="edit"
                    onClick={() => {
                      onDeletePlantHealthAttributeClick(
                        editPlantHealthAttributeElement.id
                      );
                    }}
                  >
                    <DeleteIcon />
                  </Fab>
                </Grid>
              </Grid>
            </>
          )
        )}
      </Grid>
      <Grid
        container
        xs={12}
        spacing={1}
        direction="row"
        justifyContent="flex-end"
      >
        <Grid xs={2} style={{ marginBottom: 20 }}>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={onAddPlantHealthAttibute}
          >
            <AddIcon />
          </Fab>
        </Grid>
        <Grid xs={12}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="flex-end"
            style={{ width: "100%", marginBottom: 20 }}
          >
            <Button variant="outlined" onClick={onSubmit}>
              Confirm Changes
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
});
