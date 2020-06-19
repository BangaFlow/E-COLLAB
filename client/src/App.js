import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';
import { isMultiColorActive } from './constants/defaultValues';
import { PrivateRoute } from './helpers/PrivateRoute'
import { getDirection } from './helpers/Utils';
import { history } from './helpers/history'
import SingUp from './components/authentication/SingUp';
import ResetPassword from './components/authentication/ResetPassword';
import ChangePassword from './components/authentication/ChangePassword';

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views')
);
const ViewAuth = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './components/authentication/SignIn')
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);

const ViewCreateProfile = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/create-profile')
);

class App extends Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className="loading" />}>
              <Router history={history}>
                <Switch>
                  <PrivateRoute
                    path="/app"
                    // roles={[Role.Student]}
                    component={ViewApp}
                  />
                  <Route
                  path="/signup"
                  component={SingUp}
                  />
                  <Route
                  path="/reset-password"
                  component={ResetPassword}
                  />
                  <Route
                  path="/change-password/:token"
                  component={ChangePassword}
                  />
                  <Route
                    path="/error"
                    exact
                    render={props => <ViewError {...props} />}
                  />
                  <Route
                    path="/auth"
                    exact
                    render={localStorage.getItem('user') ? props => <ViewMain {...props} /> : props => <ViewAuth {...props} />}
                  />
                  <Route
                    path="/create-profile"
                    exact
                    render={props => <ViewCreateProfile {...props} />}
                  />
                  <Route
                    path="/"
                    exact
                    render={props => <ViewMain {...props} />}
                  />
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
