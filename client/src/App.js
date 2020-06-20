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
const ViewCalendar = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './components/Calendar/myCalendar')
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);

const Details = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/app/projects/details')
);

const ViewQuizPaly = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/app/Quiz/quizPage')
);

const ViewQuizResult = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/app/Quiz/SummaryPage')
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
              <Router forceRefresh={true} history={history} >
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
                    path="/calendar"
                    exact
                    render={props => <ViewCalendar {...props} />}
                  />


                  <Route
                    path="/playQuiz"
                    exact
                    render={props => <ViewQuizPaly {...props} />}
                  />

                  <Route
                    path="/ResultQuiz"
                    exact
                    render={props => <ViewQuizResult {...props} />}
                  />

                  <Route
                    path="/"
                    exact
                    render={props => <ViewMain {...props} />}
                  />
                    <Route
                    path="/app/projects/details"
                    exact
                    render={props => <Details {...props} />}
                  />
                     <Route
                    path="/app/projects/categories"
                    exact
                    render={props => <Categories {...props} />}
                  />
                  <Route
                    path="/app/projects/Projects"
                    exact
                    render={props => <Projects {...props} />}
                  />
                  <Route
                    path="/app/projects/Subjects"
                    exact
                    render={props => <Subjects {...props} />}
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

export default connect(mapStateToProps, mapActionsToProps)(App);

