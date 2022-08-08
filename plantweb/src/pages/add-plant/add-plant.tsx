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
import { useAddPlantLogic } from "./use-add-plant-logic";
import { useRoomsLogic } from "pages/rooms/use-rooms-logic";
import AddIcon from "@mui/icons-material/Add";

export const AddPlant = memo(() => {
  const {
    plantName,
    room,
    upperRequiredValue,
    lowerRequiredValue,
    plantData,
    plantHelathAttributeData,
    handleRoomChange,
    onGetPlantData,
    onGetPlantHealthAttributeData,
  } = useAddPlantLogic();

  const { allRoomData, onGetRoomData } = useRoomsLogic();

  useEffect(() => {
    onGetRoomData();
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
        />
      </div>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={room}
              label="Age"
              onChange={handleRoomChange}
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
            <InputLabel id="demo-simple-select-label">Room</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={room}
              label="Room"
              onChange={handleRoomChange}
            >
              <div>
                {allRoomData.map((room: any, index: number) => {
                  return (
                    <MenuItem key={index} value={room.id}>
                      {room.name}
                    </MenuItem>
                  );
                })}
              </div>
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
        />
      </div>
      <div>
        <TextField
          id="plant-plant-health-attribute-lower-limit"
          label="Plant Health Attribute Lower Limit (00.00)"
          variant="outlined"
          value={lowerRequiredValue}
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
              value={room}
              label="Age"
              onChange={handleRoomChange}
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
              value={room}
              label="Age"
              onChange={handleRoomChange}
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
              value={room}
              label="Age"
              onChange={handleRoomChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
          <Button variant="outlined">Add Plant</Button>
        </Stack>
      </div>
    </div>
  );
});
