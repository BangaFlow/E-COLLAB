import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Events = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './events')
);
const Meeting = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './meetings')
);

const WorkShop = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './workshops')
);




const Event = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/events`} />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/meetings`} />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/workshops`} />
      <Route
        path={`${match.url}/events`}
        render={props => <Events {...props} />}
      />
      <Route
        path={`${match.url}/meetings`}
        render={props => <Meeting {...props} />}
      />
      <Route
        path={`${match.url}/workshops`}
        render={props => <WorkShop {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Event;
