import React from 'react';
import { render } from 'react-dom';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloClient } from 'apollo-client'

import AppRouter from './AppRouter';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Store/index'

import './Styles/index.scss'

const work = {address: '10.0.49.32'}
const home = {address: `localhost`}
const linux = {address: `157.230.150.123`}

import * as serviceWorker from './serviceWorker';

const httpLink = new HttpLink({
  uri: `http://${linux.address}:3000/graphql`
});

const wsLink = new WebSocketLink({
  uri: `ws://${linux.address}:3000/graphql`,
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
      <ApolloHooksProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </ApolloHooksProvider>
    </ApolloProvider>
  </Provider>
)

render(<App />, document.getElementById("root"))

serviceWorker.register()

export default App