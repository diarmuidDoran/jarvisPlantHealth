import React, { memo, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Fab,
} from "@mui/material";
import { useSensorLogic } from "./use-sensor-logic";
import DeleteIcon from "@mui/icons-material/Delete";
export type SensorByIDProps = { id: string };

interface Column {
  id: "sensor_reading" | "unit_measurement" | "time_stamp" ;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "sensor_reading",
    label: "Sensor\u00a0Reading\u00a0Value",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  { id: "unit_measurement", label: "Unit\u00a0Measurement", minWidth: 100 },
  {
    id: "time_stamp",
    label: "Date-Time",
    minWidth: 100,
  },
];

interface Data {
  sensorReading: number;
  unit_measurement:string;
  time_stamp: string;
}

function createData(
  sensorReading: number,
  unit_measurement: string,
  time_stamp: string,
): Data {
  return { sensorReading, unit_measurement, time_stamp };
}


export const SensorByID = memo(({ id }: SensorByIDProps) => {
  const { sensor, sensorReadings, onGetSensorData, onSensorsClick, onDeleteSensorClick, onGetSensorReadingsData,} =
    useSensorLogic();

    const rows = [
      sensorReadings?.sensor_readings.map((sensor_reading: any, index: number) => 
        createData(sensor_reading.sensor_reading, "" , sensor_reading.time_stamp),
      )
    ];

  //Table functions
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    onGetSensorData(Number(id));
    onGetSensorReadingsData(Number(id));
  }, [id]);

  return (
    <div>
      {sensor === undefined && <>No sensor for this id, go back. </>}
      {sensor && (
        <>
          <div>{sensor.sensor_name}</div>
          <div>
            <Fab size="small" color="secondary" aria-label="edit" onClick={() => {
                onDeleteSensorClick(sensor.id);
                onSensorsClick();
              }}>
              <DeleteIcon />
            </Fab>
          </div>
          <div>
            Call Frequency: {sensor.call_frequency}
          </div>
          {/* Table */}
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
                    {sensorReadings?.sensor_readings
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
                                <TableCell key={column.id} align={column.align}>
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </>
      )}
    </div>
  );
});
