import React, { memo, PureComponent, useEffect } from "react";
import {
  Box,
  Button,
  Fab,
  Grid,
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
import { addPlantPlantHealthAttribute } from "api/plant-api/plant-api";
import { useAppStyles } from "use-app-styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export type PlantByIDProps = {
  id: string;
};

export const PlantByID = memo(({ id }: PlantByIDProps) => {
  const {
    plant,
    rooms,
    units,
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
    id: "sensorReading" | "unit" | "date" | "time" | "limitRanges";
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
    { id: "unit", label: "Unit\u00a0Measurement", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
    {
      id: "time",
      label: "Time",
      minWidth: 100,
    },
    {
      id: "limitRanges",
      label: "Limit\u00a0Ranges\u00a0Set",
      minWidth: 100,
      format: (value: number) => value.toLocaleString("en-US"),
    },
  ];

  interface Data {
    sensorReading: number;
    unit?: string;
    date: string;
    time: string;
    limitRanges: string;
  }

  function createData(
    sensorReading: number,
    date: string,
    time: string,
    limitRanges: string,
    unit?: string
  ): Data {
    return { sensorReading, unit, date, time, limitRanges };
  }

  function createGraphs(readings: SensorReading[]){
    const thing = readings?.map((reading, index) => {
      return createData(
        reading.sensorReading,
        `${reading.timeStamp.getDay()}/${reading.timeStamp.getMonth()}/${reading.timeStamp.getFullYear()}`,
        `${reading.timeStamp.getHours()}:${
          (reading.timeStamp.getMinutes() < 10 ? "0" : "") +
          reading.timeStamp.getMinutes()
        }`,
        `${
          plantHealthAttributesArray.find(
            (plant_health_attribute) =>
              plant_health_attribute.sensor?.id === reading.sensorId
          )?.upper_required_value
        } - ${
          plantHealthAttributesArray.find(
            (plant_health_attribute) =>
              plant_health_attribute.sensor?.id === reading.sensorId
          )?.lower_required_value
        }`,
        units.find(
          (unit) =>
            plantHealthAttributesArray.find(
              (plant_health_attribute) =>
                plant_health_attribute.sensor?.id === reading.sensorId
            )?.unit_measurement_id === unit.id
        )?.unit
      );
    });
  }

  function createRows(readings: SensorReading[]) {
    const thing = readings?.map((reading, index) => {
      return createData(
        reading.sensorReading,
        `${reading.timeStamp.getDay()}/${reading.timeStamp.getMonth()}/${reading.timeStamp.getFullYear()}`,
        `${reading.timeStamp.getHours()}:${
          (reading.timeStamp.getMinutes() < 10 ? "0" : "") +
          reading.timeStamp.getMinutes()
        }`,
        `${
          plantHealthAttributesArray.find(
            (plant_health_attribute) =>
              plant_health_attribute.sensor?.id === reading.sensorId
          )?.upper_required_value
        } - ${
          plantHealthAttributesArray.find(
            (plant_health_attribute) =>
              plant_health_attribute.sensor?.id === reading.sensorId
          )?.lower_required_value
        }`,
        units.find(
          (unit) =>
            plantHealthAttributesArray.find(
              (plant_health_attribute) =>
                plant_health_attribute.sensor?.id === reading.sensorId
            )?.unit_measurement_id === unit.id
        )?.unit
      );
    });
    // console.log(`thing`, thing);
    return thing;
  }

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

  const { classes } = useAppStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      marginTop={2}
      xs={12}
    >
      {plant === undefined && <>no plant for this id, go back.</>}
      {plant && (
        <>
          <Grid
            container
            xs={12}
            wrap="nowrap"
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              container
              xs={6}
              wrap="nowrap"
              marginRight={1}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item xs>
                <h3 className={classes.page_title_with_delete}>{plant.name}</h3>
              </Grid>
            </Grid>
            <Grid
              container
              xs={6}
              rowSpacing={1}
              row-gap={100}
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid xs={3} sm={2} md={1}>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="edit"
                  onClick={() => onEditPlantClick(String(plant.id))}
                >
                  <EditIcon />
                </Fab>
              </Grid>
              <Grid xs={3} sm={2} md={1}>
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
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            wrap="nowrap"
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
            marginBottom={2}
          >
            <Grid item xs={12}>
              <b>Room: </b>
              {rooms.find((room) => room.id === plant.room_id)?.name}
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            wrap="nowrap"
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
            marginBottom={2}
          >
            <Grid item xs={12}>
              Current Sensor Reading
            </Grid>
            <Grid item xs={12}>
              Connected Sensors used to monitor plant health attributes{" "}
            </Grid>
          </Grid>

          {plantHealthAttributesArray.length > 0 ? (
            <>
              {plantHealthAttributesArray.map(
                (plantHealthAttributeElement, index) => (
                  <>
                    <Grid
                      container
                      xs={12}
                      wrap="nowrap"
                      spacing={1}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      marginBottom={2}
                    >
                      <Grid item xs={12} key={index}>
                        <Button
                          id="Sesnsor Name"
                          variant="text"
                          onClick={() =>
                            onPlantSensorClick(
                              String(plantHealthAttributeElement.sensor?.id)
                            )
                          }
                        >
                          <Grid item xs={12}>
                            {plantHealthAttributeElement.sensor?.sensor_name} -{" "}
                            {
                              health_attributes.find(
                                (health_attribute) =>
                                  health_attribute.id ===
                                  plantHealthAttributeElement.health_attribute_id
                              )?.name
                            }
                          </Grid>
                        </Button>
                      </Grid>
                    </Grid>
                    {/* Table */}
                    {sensorReadings &&
                      plantHealthAttributeElement.sensor?.id &&
                      sensorReadings[plantHealthAttributeElement.sensor?.id] &&
                      sensorReadings[plantHealthAttributeElement.sensor?.id]
                        .length > 0 && (
                        <Paper
                          sx={{
                            width: "80%",
                            overflow: "hidden",
                            margin: "auto",
                            marginBottom: 3,
                          }}
                        >
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
                          <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                              data={sensorReadings[
                                plantHealthAttributeElement.sensor?.id
                              ]}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="timeStamp" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="sensorReading"
                                stroke="#82ca9d"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </Paper>
                      )}
                  </>
                )
              )}
            </>
          ) : (
            <Grid
              container
              xs={12}
              wrap="nowrap"
              spacing={1}
              direction="row"
              justifyContent="center"
              alignItems="center"
              marginBottom={2}
            >
              <Grid item xs>
                {" "}
                No sensors currently monitoring any of your plants health
                attributes
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
});