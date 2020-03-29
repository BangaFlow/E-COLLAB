import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

console.log("apollo works")

export default (
  <ApolloProvider client={client}>
       <Provider store={configureStore()}> <App /></Provider>
  </ApolloProvider>
);