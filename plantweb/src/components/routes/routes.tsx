import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PATHS } from 'shared/constants';
import { Login } from 'pages/login-page'

export const Routes = memo(() => {
  return (
    <Switch>
      <Route exact path={PATHS.login} component={() => <Login />} />
    </Switch>
  );
});