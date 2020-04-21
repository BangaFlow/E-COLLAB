import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Start = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './events')
);


const Calendar = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/events`} />
      <Route
        path={`${match.url}/events`}
        render={props => <Start {...props} />}
      />

      
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Calendar;
