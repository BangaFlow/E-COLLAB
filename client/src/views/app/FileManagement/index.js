import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Files = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './Files')
);
const Uploadview = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './uploadview')
);
const FileManagement = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/second`} />
      <Route
        path={`${match.url}/Files`}
        render={props => <Files {...props} />}
      />
       <Route
        path={`${match.url}/uploadview`}
        render={props => <Uploadview {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default FileManagement;
