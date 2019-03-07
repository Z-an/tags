import React from 'react';
import { render } from 'react-dom';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client'

import AppRouter from './AppRouter';

import { Provider } from 'react-redux'
import store from './Store/index'

import './index.scss'

import * as serviceWorker from './serviceWorker';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache()
const client = new ApolloClient({
  link: link,
  cache: cache,
})

const App = () => (
  <Provider store={store}>
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
  </Provider>
)

render(<App />, document.getElementById("root"))

serviceWorker.unregister()

export default App