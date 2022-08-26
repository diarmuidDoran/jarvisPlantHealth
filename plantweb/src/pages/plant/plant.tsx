import React, { memo, useEffect } from "react";
import {
  Box,
  Button,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Popper,
} from "@mui/material";
import { usePlantLogic } from "./use-plant-logic";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { SensorReading } from "pages/edit-plant/edit-plant-types";
export type PlantByIDProps = {
  id: string;
};

export const PlantByID = memo(({ id }: PlantByIDProps) => {
  const {
    plant,
    rooms,
    health_attributes,
    plantHealthAttributesArray,
    sensors,
    sensorReadings,
    popoverAnchorEl,
    onGetPlantData,
    onGetPlantPlantHealthAttributesData,
    onPlantsClick,
    onEditPlantClick,
    onDeletePlantClick,
    onPlantSensorClick,
    onGetRoomsData,
    onGetUnitMeasurementsData,
    onGetHealthAttributesData,
    onGetSensorsData,
    onGetSensorData,
    getSensorReadingsForSensors,
    handleDeletePopperClick,
  } = usePlantLogic();

  const open = Boolean(popoverAnchorEl);
  const popOverID = open ? "simple-popper" : undefined;

  //Table functions
  interface Column {
    id: "sensorReading" | "date" | "time";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    {
      id: "sensorReading",
      label: "Sensor\u00a0Reading\u00a0Value",
      minWidth: 100,
      align: "right",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    { id: "date", label: "Date", minWidth: 100 },
    {
      id: "time",
      label: "Time",
      minWidth: 100,
    },
  ];

  interface Data {
    sensorReading: number;
    date: string;
    time: string;
  }

  function createData(sensorReading: number, date: string, time: string): Data {
    return { sensorReading, date, time };
  }

  function createRows(readings: SensorReading[]) {
    const thing = readings?.map((reading, index) => {
      return createData(
        reading.sensorReading,
        reading.timeStamp.getFullYear().toString(),
        `${reading.timeStamp.getHours()}:${reading.timeStamp.getMinutes()}`
      );
    });
    console.log(`thing`, thing);
    return thing;
  }

  // const rows = [
  //   sensorReadings &&
  //     plantHealthAttributesArray.map((plantHealthAttribute, index) => {
  //       const readings = sensorReadings[plantHealthAttribute.sensor?.id || 0];
  //       readings?.map((reading, index) => {
  //         createData(
  //           reading.sensorReading,
  //           Number(
  //             `${reading.timeStamp.getHours()}:${reading.timeStamp.getMinutes()}`
  //           ),
  //           reading.timeStamp.getFullYear()
  //         );
  //       });
  //     }),
  //   // sensorReadings?.sensor_readings.map((sensor_reading: any, index: number) =>
  //   //   createData(sensor_reading.sensor_reading, "", sensor_reading.time_stamp)
  //   // ),
  // ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(
    () => {
      onGetPlantData(Number(id));
      onGetPlantPlantHealthAttributesData(Number(id));
      onGetRoomsData();
      onGetUnitMeasurementsData();
      onGetHealthAttributesData();
      onGetSensorsData();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  useEffect(() => {
    getSensorReadingsForSensors(plantHealthAttributesArray);
  }, [plantHealthAttributesArray]);

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
                <button
                  id="Sesnsor Name"
                  onClick={() => {
                    onDeletePlantClick(plant.id);
                    onPlantsClick();
                  }}
                >
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
            {plantHealthAttributesArray.length > 0 ? (
              <>
                {plantHealthAttributesArray.map(
                  (plantHealthAttributeElement, index) => (
                    <>
                      <div key={index}>
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
                            {plantHealthAttributeElement.sensor?.sensor_name} -{" "}
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
                      {/* Table */}
                      {sensorReadings &&
                        plantHealthAttributeElement.sensor?.id &&
                        sensorReadings[
                          plantHealthAttributeElement.sensor?.id
                        ] &&
                        sensorReadings[plantHealthAttributeElement.sensor?.id]
                          .length > 0 && (
                          <div>
                            <Paper sx={{ width: "80%", overflow: "hidden" }}>
                              <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      {columns.map((column) => (
                                        <TableCell
                                          key={column.id}
                                          align={column.align}
                                          style={{ minWidth: column.minWidth }}
                                        >
                                          {column.label}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {createRows(
                                      sensorReadings[
                                        plantHealthAttributeElement.sensor?.id
                                      ]
                                    )
                                      .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                      )
                                      .map((row: any, index: number) => {
                                        return (
                                          <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                          >
                                            {columns.map((column) => {
                                              debugger;
                                              const value = row[column.id];
                                              return (
                                                <TableCell
                                                  key={column.id}
                                                  align={column.align}
                                                >
                                                  {column.format &&
                                                  typeof value === "number"
                                                    ? column.format(value)
                                                    : value}
                                                </TableCell>
                                              );
                                            })}
                                          </TableRow>
                                        );
                                      })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={
                                  sensorReadings[
                                    plantHealthAttributeElement.sensor?.id
                                  ].length
                                }
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                            </Paper>
                          </div>
                        )}
                    </>
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
