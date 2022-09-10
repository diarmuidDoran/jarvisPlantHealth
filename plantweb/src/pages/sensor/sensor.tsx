import React, { memo, useEffect, useMemo } from "react";
import {
  Box,
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
  Grid,
} from "@mui/material";
import { useSensorLogic } from "./use-sensor-logic";
import DeleteIcon from "@mui/icons-material/Delete";
import { SensorReading } from "shared/types";
import { useAppStyles } from "use-app-styles";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { positions } from "@mui/system";
export type SensorByIDProps = { id: string };

export const SensorByID = memo(({ id }: SensorByIDProps) => {
  const {
    sensor,
    units,
    sensorReadings,
    popoverAnchorEl,
    onGetSensorData,
    onSensorsClick,
    onDeleteSensorClick,
    onGetSensorReadingsData,
    handleDeletePopperClick,
  } = useSensorLogic();

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
    const rows = readings?.map((reading: SensorReading, index: number) => {
      const time_stamp_date = new Date(reading.time_stamp);
      const temp = time_stamp_date.getDay();
      return createData(
        reading.sensor_reading,
        `${time_stamp_date.getDay()}/${time_stamp_date.getMonth()}/${time_stamp_date.getFullYear()}`,
        `${time_stamp_date.getHours()}:${
          (time_stamp_date.getMinutes() < 10 ? "0" : "") +
          time_stamp_date.getMinutes()
        }`
      );
    });

    return rows;
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
      onGetSensorData(Number(id));
      onGetSensorReadingsData(Number(id));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  const { classes } = useAppStyles();

  return (
    <Grid
      container
      xs={12}
      spacing={1}
      direction="column"
      justifyContent="center"
      alignItems="stretch"
    >
      {sensor === undefined && <>No sensor for this id, go back. </>}
      {sensor && (
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
              marginRight={1}
              row-spacing={2}
              wrap="nowrap"
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item xs>
                <h3 className={classes.page_title_with_delete}>
                  {sensor.sensor_name}
                </h3>
              </Grid>
            </Grid>
            <Grid
              container
              xs={6}
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item xs={2}>
                <Fab
                  size="small"
                  color="primary"
                  aria-label={popOverID}
                  onClick={handleDeletePopperClick}
                >
                  <DeleteIcon />
                </Fab>
                <Popper id={popOverID} open={open} anchorEl={popoverAnchorEl}>
                  <Box
                    sx={{
                      border: 1,
                      p: 1,
                      bgcolor: "background.paper",
                      position: "relative",
                    }}
                  >
                    <p>Are you sure you want to delete this Room?</p>
                    <button
                      id="Sesnsor Name"
                      onClick={() => {
                        onDeleteSensorClick(sensor.id);
                        onSensorsClick();
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
          >
          <Grid item xs={12}>
            Call Frequency: {sensor.call_frequency}
          </Grid>
          </Grid>
          {/* Table */}
          {sensorReadings &&
            sensorReadings.sensor_readings &&
            sensorReadings.sensor_readings.length > 0 && (
              <Paper sx={{ width: "80%", overflow: "hidden", margin: "auto" }}>
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
                      {createRows(sensorReadings.sensor_readings)
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
                                    {column.format && typeof value === "number"
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
                  count={sensorReadings.sensor_readings.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            )}
        </>
      )}
    </Grid>
  );
});
