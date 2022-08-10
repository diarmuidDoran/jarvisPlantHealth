/* istanbul ignore file */
import React, { memo, useEffect } from "react";
import { TextField, Button, Fab } from "@mui/material";
import { usePlantLogic } from "./use-plant-logic";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export type PlantByIDProps = {
  id: string;
};

export const PlantByID = memo(({ id }: PlantByIDProps) => {
  const { plant, onGetPlantData } = usePlantLogic();

  useEffect(() => {
    onGetPlantData(id);
  }, [id]);

  return (
    <div>
      {plant === undefined && <>no plant</>}
      {plant && (
        <>
          <div>{plant.name}</div>
          <div>
            <Fab size="small" color="secondary" aria-label="edit">
              <EditIcon />
            </Fab>
          </div>
          <div>
            <Fab size="small" color="secondary" aria-label="edit">
              <DeleteIcon />
            </Fab>
          </div>
          <div>
            Room: {plant.room_id} this needs updated to displey the rooms name
          </div>
          <div>Current Sensor Reading</div>
          <div>Connected Sensors</div>
          <div>
            <Button id="Sesnsor Name" variant="text">
              Sensor Name
            </Button>
            <Fab size="small" color="secondary" aria-label="edit">
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
