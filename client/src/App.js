import React, { Component } from 'react';
import Routes from './routes/Routes';
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

// setup fake backend
import { configureFakeBackend } from './helpers';

// Themes

// default
import './assets/scss/theme.scss';

// dark
// import './assets/scss/theme-dark.scss';

// rtl
// import './assets/scss/theme-rtl.scss';

// Apollo Client
const Url = 'http://localhost:4000/graphql'

const client = new ApolloClient({
  uri: Url
})

// configure fake backend
configureFakeBackend();



/**
 * Main app component
 */
class App extends Component {
  render() {
    return <ApolloProvider client={client}>
              <Routes></Routes>
           </ApolloProvider>
    
  }
}

export default App;
