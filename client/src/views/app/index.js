import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import ListUsers from '../../components/users/ListUsers';
import CreateUser from '../../components/users/CreateUser';
import ListRoles from '../../components/roles/ListRoles';
import RoadMap from '../../components/workspace/RoadMap';

import { Role } from '../../helpers/role'
import { PrivateRoute } from '../../helpers/PrivateRoute'

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './gogo')
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
);
const Profile = React.lazy(() =>
  import(/* webpackChunkName: "viwes-profile" */ './profile')
);

const Skills = React.lazy(() =>
  import(/* webpackChunkName: "viwes-skills" */ './skills')
);

const Teams = React.lazy(() =>
  import(/* webpackChunkName: "viwes-teams" */ './teams')
);
const Authorize = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../authorize')
);
const NotFound = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../notfound')
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/gogo`} />
              <Route
                path={`${match.url}/skills`}
                render={props => <Skills {...props} />}
              />
              <Route
                path={`${match.url}/teams`}
                render={props => <Teams {...props} />}
              />
              <Route
                path={`${match.url}/gogo`}
                render={props => <Gogo {...props} />}
              />
              <Route
                path={`${match.url}/second-menu`}
                render={props => <SecondMenu {...props} />}
              />
              <Route
                path={`${match.url}/profile/me`}
                render={props => <Profile {...props} />}
              />
              <Route
                path={`${match.url}/notauthorized`}
                exact
                render={props => <Authorize {...props} />}
              />
              <Route
                path={`${match.url}/404`}
                exact
                render={props => <NotFound {...props} />}
              />
              {/* <Route
                path={`${match.url}/users`}
                render={props => <ListUsers {...props} />}
              /> */}
              <PrivateRoute
              path={`${match.url}/users`}
              roles={[Role.Admin]}
              component={ListUsers}
              />
              {/* <Route
                path={`${match.url}/adduser`}
                render={props => <CreateUser {...props} />}
              /> */}
              <PrivateRoute
              path={`${match.url}/adduser`}
              roles={[Role.Admin]}
              component={CreateUser}
              />
              {/* <Route
                path={`${match.url}/moduser/:id`}
                render={props => <CreateUser {...props} />}
              /> */}
              <PrivateRoute
              path={`${match.url}/moduser/:id`}
              roles={[Role.Admin]}
              component={CreateUser}
              />
              {/* <Route
                path={`${match.url}/roles`}
                render={props => <ListRoles {...props} />}
              /> */}
              <PrivateRoute
              path={`${match.url}/roles`}
              roles={[Role.Admin]}
              component={ListRoles}
              />
              {/* <Route
                path={`${match.url}/workspace`}
                render={props => <RoadMap {...props} />}
              /> */}
              <PrivateRoute
              path={`${match.url}/workspace`}
              roles={[Role.Student]}
              component={RoadMap}
              />
              <Redirect to={`${match.url}/404`} />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
