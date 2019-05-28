import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps, Redirect} from '@reach/router';
import CheckOut from '../components/CheckOut';

interface Props extends RouteComponentProps {}

const AddPaymentMethodView = (_: Props) => {
  return (
    <Query query={GET_ACTIVE_ORDER} fetchPolicy="cache-and-network">
      {({loading, error, data: {isLoggedIn, activeOrder, me}}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        if (!isLoggedIn || activeOrder.restaurantId === -1)
          return <Redirect to="/" noThrow />;

        return <CheckOut activeOrder={activeOrder} me={me} />;
      }}
    </Query>
  );
};

/* Export
============================================================================= */
export default AddPaymentMethodView;

export const GET_ACTIVE_ORDER = gql`
  query GetActiveOrder {
    isLoggedIn @client
    activeOrder @client {
      restaurantId
      restaurantName
      total
      orderItems {
        id
        name
        price
        quantity
        image
        options {
          name
          items {
            name
            price
          }
        }
      }
    }
    me {
      paymentMethod {
        payment_method_id
        brand
        last4
      }
    }
  }
`;
