import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AllTeams = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './teams.all')
);
const Gogo = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/all`} />
      <Route
        path={`${match.url}/all`}
        render={props => <AllTeams {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Gogo;
