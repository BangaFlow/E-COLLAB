import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './gogo')
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')

);

const QuizPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Quiz')

);

const EventPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Event/index')
);

const QuestionPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Quiz/questions')
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
                path={`${match.url}/gogo`}
                render={props => <Gogo {...props} />}
              />
              <Route
                path={`${match.url}/second-menu`}
                render={props => <SecondMenu {...props} />}
              />
              <Route
                path={`${match.url}/blank-page`}
                render={props => <BlankPage {...props} />}
              />

              <Route
                path={`${match.url}/questions`}
                render={props => <QuestionPage {...props} />}
              />

              <Route
                path={`${match.url}/Event`}
                render={props => <EventPage {...props} />}
              />

              
              <Route
                path={`${match.url}/Quiz`}
                render={props => <QuizPage {...props} />}
              />
              
              
              <Redirect to="/error" />
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
