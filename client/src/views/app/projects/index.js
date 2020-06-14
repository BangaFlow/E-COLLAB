import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Projects = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Projects')
);
const Categories = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './categories')
);
const Selection = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Selection')
);
const Details = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './details')
);
const Allprojects = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './allprojects')
);
const Subjects = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Subjects')
);
const Subjectdetail = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Subjectdetail')
);
const Stats = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Stats')
);
const projects = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/Projects`} />
      <Route
        path={`${match.url}/Projects`}
        render={props => <Projects {...props} />}
      />
      <Route
        path={`${match.url}/Selection`}
        render={props => <Selection {...props} />}
      />
       <Route
        path={`${match.url}/details`}
        render={props => <Details {...props} />}
      />
       <Route
        path={`${match.url}/categories`}
        render={props => <Categories {...props} />}
      />
       <Route
        path={`${match.url}/allprojects`}
        render={props => <Allprojects {...props} />}
      />
       <Route
        path={`${match.url}/Subjects`}
        render={props => <Subjects {...props} />}
      />
       <Route
        path={`${match.url}/Subjectdetail`}
        render={props => <Subjectdetail {...props} />}
      />
      <Route
        path={`${match.url}/Stats`}
        render={props => <Stats {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default projects;
