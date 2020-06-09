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
import { getDirection } from './helpers/Utils';
import { history } from './helpers/history'

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

const ViewQuizPaly = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/app/Quiz/quizPage')
);

const ViewQuizResult = React.lazy(() =>
import(/* webpackChunkName: "views-error" */ './views/app/Quiz/SummaryPage')
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
                  <Route
                    path="/app"
                    render={props => <ViewApp {...props} />}
                  />
                  
                  <Route
                    path="/error"
                    exact
                    render={props => <ViewError {...props} />}
                  />
                  <Route
                    path="/auth"
                    exact
                    render={props => <ViewAuth {...props} />}
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

export default connect(mapStateToProps,mapActionsToProps)(App);

