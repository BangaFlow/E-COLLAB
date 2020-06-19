import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const AllTeams = React.lazy(() =>
  import(/* webpackChunkName: "start" */ "./teams.all")
);
const Team = React.lazy(() =>
  import(/* webpackChunkName: "start" */ "./team")
);


const Gogo = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
    <Route
        path={`${match.url}/team`}
        render={(props) => <Team {...props} />}
      />
      <Route
        path={`${match.url}/all`}
        render={(props) => <AllTeams {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Gogo;
