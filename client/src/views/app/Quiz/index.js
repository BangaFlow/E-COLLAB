import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Start = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './quizzes')
);
const Play = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './quizPage')
);
const Gogo = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/quizzes`} />
      <Route
        path={`${match.url}/quizzes`}
        render={props => <Start {...props} />}
      />
      <Route
        path={`${match.url}/playQuiz`}
        render={props => <Play {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Gogo;
