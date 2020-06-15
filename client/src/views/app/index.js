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
const PlayQuiz = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Quiz/quizPage')

);
const SummaryPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Quiz/SummaryPage')

)


const EventPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Event/index')
);

const QuestionPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Quiz/questions')
);

const AddQuestionPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Quiz/questionsPage')
);


const MyCalendar = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './Event/myCalendar')
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
                path={`${match.url}/questions/:id`}
                render={props => <QuestionPage {...props} />}
              />


            <Route
            path={`${match.url}/play/:id`}
            render={props => <PlayQuiz {...props} />}
          />


          <Route
          path={`${match.url}/result`}
          render={props => <SummaryPage {...props} />}
        />
        
        <Route
        path={`${match.url}/questionPageAdd`}
        render={props => <AddQuestionPage {...props} />}
      />

              <Route
                path={`${match.url}/Event`}
                render={props => <EventPage {...props} />}
              />

              
              <Route
                path={`${match.url}/Quiz`}
                render={props => <QuizPage {...props} />}
              />
              <Route
              path={`${match.url}/myCalendar`}
              render={props => <MyCalendar {...props} />}
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
