import React, { memo, useEffect } from "react";
import { Button, Fab } from "@mui/material";
import { usePlantLogic } from "./use-plant-logic";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export type PlantByIDProps = {
  id: string;
};

export const PlantByID = memo(({ id }: PlantByIDProps) => {
  const {
    plant,
    sensors,
    sensor,
    rooms,
    onGetPlantData,
    onGetPlantPlantHealthAttributesData,
    onPlantsClick,
    onEditPlantClick,
    onEditSensorClick,
    onDeletePlantClick,
    onPlantSensorClick,
    onGetRoomsData,
    onGetUnitMeasurementsData,
    onGetHealthAttributesData,
    onGetSensorsData,
    onGetSensorData,
  } = usePlantLogic();

  useEffect(() => {
    onGetPlantData(Number(id));
    onGetPlantPlantHealthAttributesData(Number(id))
    onGetRoomsData();
    onGetUnitMeasurementsData();
    onGetHealthAttributesData();
    onGetSensorsData();
    onGetSensorData(Number(id));
  }, [id]);

  return (
    <div>
      {plant === undefined && <>no plant for this id, go back.</>}
      {plant && (
        <>
          <div>{plant.name}</div>
          <div>
            <Fab
              size="small"
              color="secondary"
              aria-label="edit"
              onClick={() => onEditPlantClick(String(plant.id))}
            >
              <EditIcon />
            </Fab>
          </div>
          <div>
            <Fab
              size="small"
              color="secondary"
              aria-label="edit"
              onClick={() => {
                onDeletePlantClick(plant.id);
                onPlantsClick();
              }}
            >
              <DeleteIcon />
            </Fab>
          </div>
          <div>
            Room: {plant.room_id} this needs updated to displey the rooms name
          </div>
          <div>Current Sensor Reading</div>
          <div>Connected Sensors</div>
          <div>
            <Button id="Sesnsor Name" variant="text" onClick={() => onPlantSensorClick(String(sensor?.id))}>
              {sensor?.sensor_name}
            </Button>
            <Fab size="small" color="secondary" aria-label="edit" onClick={() => onEditSensorClick(String(sensor?.id))}>
              <EditIcon />
            </Fab>
            <Fab size="small" color="secondary" aria-label="edit">
              <DeleteIcon />
            </Fab>
          </div>
          <div>
            Add another plant health attribute to be monitored
            <Fab size="small" color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
        </>
      )}
    </div>
  );
});
