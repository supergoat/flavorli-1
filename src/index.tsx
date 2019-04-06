import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';
import {ApolloProvider} from 'react-apollo';
import {typeDefs, resolvers} from './resolvers';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();

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
  new HttpLink({
    uri: 'http://192.168.0.80:4000',
    credentials: 'same-origin',
  }),
]);

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    viewer: {
      __typename: 'User',
    },
    activeOrder: {
      __typename: 'ActiveOrder',
      restaurant: {
        __typename: 'Restaurant',
        id: -1,
        name: '',
        tel: '',
        address: {
          __typename: 'Address',
          number: '',
          streetName: '',
          city: '',
          postalCode: '',
        },
      },
      items: [],
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
