import React from "react";

import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { PATHS } from "shared/constants";

import { Routes } from "components/routes";

import { NavTab } from "./modules/header";
import { Box, Grid, Tabs } from "@mui/material";
import { useAppStyles } from "./use-app-styles";

function App() {
  const { value, LinkTab } = NavTab();

  const { classes } = useAppStyles();

  return (
    <BrowserRouter basename={PATHS.root}>
      <div className="App">
        <Grid container xs={12} className={classes.header}>
          <Grid xs={12}>
            <h3>
              <u>J.A.R.V.I.S Plant Health Monitoring System</u>
            </h3>
            <Grid xs={12}>
              <p> Log, track and care for your plants health</p>
            </Grid>
          </Grid>
        </Grid>

        <Box>
          <Tabs
            value={value}
            aria-label="nav tabs"
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
          >
            <LinkTab label="Plants Page" href={PATHS.plants} />

            <LinkTab label="Rooms Page" href={PATHS.rooms} />

            <LinkTab label="Sensors Page" href={PATHS.sensors} />
          </Tabs>
        </Box>

        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
