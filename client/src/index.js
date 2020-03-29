import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

const client = new ApolloClient({
    link: createHttpLink({ uri: 'http://localhost:5000/graphql' }),
    cache: new InMemoryCache(),

    name: 'react-web-client',
    queryDeduplication: false,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={configureStore()}>
            <App />
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
