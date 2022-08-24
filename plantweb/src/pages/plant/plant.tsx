import React, { memo, useEffect } from "react";
import { Box, Button, Fab, Popper } from "@mui/material";
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
    health_attributes,
    plantHealthAttributesArray,
    popoverAnchorEl,
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
    handleDeletePopperClick,
  } = usePlantLogic();

  const open = Boolean(popoverAnchorEl);
  const popOverID = open ? "simple-popper" : undefined;

  useEffect(
    () => {
      onGetPlantData(Number(id));
      onGetPlantPlantHealthAttributesData(Number(id));
      onGetRoomsData();
      onGetUnitMeasurementsData();
      onGetHealthAttributesData();
      onGetSensorsData();
      onGetSensorData(Number(id));
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

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
              aria-label={popOverID}
              onClick={handleDeletePopperClick}
            >
              <DeleteIcon />
            </Fab>
            <Popper id={popOverID} open={open} anchorEl={popoverAnchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                <p>Are you sure you want to delete this Plant?</p>
                <button id="Sesnsor Name" 
                onClick={() => {
                onDeletePlantClick(plant.id);
                onPlantsClick();
              }}>
                  Delete
                </button>
              </Box>
            </Popper>
          </div>
          <div>
            {/* this needs updated to display the rooms name */}
            {/* {plant.room_id} */}
            Room: {rooms.find((room) => room.id === plant.room_id)?.name}
          </div>
          <div>Current Sensor Reading</div>
          <div>Connected Sensors used to monitor plant health attributes </div>
          <div>
            {plant.plant_health_attributes.length > 0 ? (
              <>
                {plantHealthAttributesArray.map(
                  (plantHealthAttributeElement) => (
                    <div>
                      <Button
                        id="Sesnsor Name"
                        variant="text"
                        onClick={() =>
                          onPlantSensorClick(
                            String(plantHealthAttributeElement.sensor?.id)
                          )
                        }
                      >
                        <div>
                          {plantHealthAttributeElement.sensor?.sensor_name}{" "}
                          monitoring{" "}
                          {
                            health_attributes.find(
                              (health_attribute) =>
                                health_attribute.id ===
                                plantHealthAttributeElement.health_attribute_id
                            )?.name
                          }
                        </div>
                      </Button>
                    </div>
                  )
                )}
              </>
            ) : (
              <p>
                {" "}
                No sensors currently monitoring any of your plants health
                attributes
              </p>
            )}
          </div>
          <div></div>
          <div></div>
        </>
      )}
    </div>
  );
});
