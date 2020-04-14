import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux';
import configureStore  from './redux/store';
import client from './services/client'

const App = React.lazy(() => import(/* webpackChunkName: "App" */'./App' ));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={configureStore()}>
      <Suspense fallback={<div className="loading" />}>
        <App />
      </Suspense>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
