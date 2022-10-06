import React, { memo } from "react";
// import { Route, Switch } from "react-router-dom";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { PATHS } from "shared/constants";
import { Login } from "pages/login";
import { SignUp } from "pages/sign-up";
import { UserAccountByID } from "pages/user_account";
import { Plants } from "pages/plants";
import { PlantByID } from "pages/plant";
import { AddPlant } from "pages/add-plant";
import { EditPlantByID } from "pages/edit-plant";
import { Rooms } from "pages/rooms";
import { RoomByID } from "pages/room";
import { AddRoom } from "pages/add-room";
import { EditRoomByID } from "pages/edit-room";
import { Sensors } from "pages/sensors";
import { SensorByID } from "pages/sensor";
import { AddSensor } from "pages/add-sensor";

export const Routes = memo(() => {
  return (
    <Switch>
      <Route exact path={PATHS.login} component={() => <Login />} />
      <Route exact path={PATHS.signup} component={() => <SignUp />} />
      <Route exact path={PATHS.plants} component={() => <Plants />} />
      <Route exact path={PATHS.addPlant} component={() => <AddPlant />} />
      <Route exact path={PATHS.rooms} component={() => <Rooms />} />
      <Route exact path={PATHS.addRoom} component={() => <AddRoom />} />
      <Route exact path={PATHS.sensors} component={() => <Sensors />} />

      <Route exact path={PATHS.addSensor} component={() => <AddSensor />} />
      {/* <Route exact path={PATHS.plant} component={() => <PlantByID />} /> */}
      <Route
        exact
        path={`${PATHS.plants}/:id`}
        component={(props: RouteComponentProps<{ id: string }>) => (
          <PlantByID {...{ id: props.match.params.id }} />
        )}
      />

      <Route
        exact
        path={`${PATHS.plants}/:id/edit`}
        component={(props: RouteComponentProps<{ id: string }>) => (
          <EditPlantByID {...{ id: props.match.params.id }} />
        )}
      />

      {/* <Route exact path={PATHS.room} component={() => <RoomByID />} /> */}
      <Route
        exact
        path={`${PATHS.rooms}/:id`}
        component={(props: RouteComponentProps<{ id: string }>) => (
          <RoomByID {...{ id: props.match.params.id }} />
        )}
      />

      <Route
        exact
        path={`${PATHS.rooms}/:id/edit`}
        component={(props: RouteComponentProps<{ id: string }>) => (
          <EditRoomByID {...{ id: props.match.params.id }} />
        )}
      />

      {/* <Route exact path={PATHS.sensor} component={() => <SensorByID />} /> */}
      <Route
        exact
        path={`${PATHS.sensors}/:id`}
        component={(props: RouteComponentProps<{ id: string }>) => (
          <SensorByID {...{ id: props.match.params.id }} />
        )}
      />

      <Route
        exact
        path={`${PATHS.user_accounts}/:id`}
        component={(props: RouteComponentProps<{ id: string }>) => (
          <UserAccountByID {...{ id: props.match.params.id }} />
        )}
      />
    </Switch>
  );
});
