import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';
import {ApolloProvider} from 'react-apollo';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
  credentials: 'same-origin',
  headers: {
    authorization: 'Bearer ' + localStorage.getItem('flavorli-token'),
  },
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: 'Bearer ' + localStorage.getItem('flavorli-token'),
    },
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const splitLink = split(
  // split based on operation type
  ({query}: any) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([
  onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.map(({message, locations, path}) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  splitLink,
]);

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('flavorli-token'),
    activeOrder: {
      __typename: 'ActiveOrder',
      restaurantName: '',
      restaurantId: -1,
      orderItems: [],
      total: 0,
    },
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
