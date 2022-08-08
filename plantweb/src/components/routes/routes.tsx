import React, { memo } from "react";
import { Route, Switch } from "react-router-dom";
// import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { PATHS } from "shared/constants";
import { Login } from "pages/login";
import { Plants } from "pages/plants";
import { PlantByID } from "pages/plant";
import { AddPlant } from "pages/add-plant";
import { Rooms} from "pages/rooms";
import { Sensors } from "pages/sensors";

export const Routes = memo(() => {
  return (
    <Switch>
      <Route exact path={PATHS.login} component={() => <Login />} />
      <Route exact path={PATHS.plants} component={() => <Plants />} />
      <Route exact path={PATHS.plant} component={() => <PlantByID />} />
      <Route exact path={PATHS.addPlant} component={() => <AddPlant />} />
      <Route exact path={PATHS.rooms} component={() => <Rooms />} />
      <Route exact path={PATHS.sensors} component={() => <Sensors />} />
      
      {/* <Route
            exact
            path={`${PATHS.plants}/:id`}
            component={(props: RouteComponentProps<{ id: string }>) => (
                <AddPlant {...{ id: props.match.params.id }} />
            )}
          /> */}
    </Switch>
  );
});