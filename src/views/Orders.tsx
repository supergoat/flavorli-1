import React from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import Tile from '../ui/Tile';
import Page from '../templates/Page';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const GET_ORDERS = gql`
  query GetOrdersByUser($userId: ID!) {
    ordersByUser(userId: $userId) {
      id
      orderedAt
      total
    }
  }
`;

interface OrderType {
  id: number;
  createdAt: string;
  total: number;
}
interface Props extends RouteComponentProps {}
const Orders = (_: Props) => {
  return (
    <Query
      query={GET_ORDERS}
      variables={{
        userId: 'cju5r25b307630875ctyostjc',
      }}
    >
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const orders = data.orders || [];
        return (
          <Page heading="Orders" showNavbar>
            {orders.map((order: OrderType) => (
              <Tile
                key={order.id}
                onClick={() => navigate(`/receipt/${order.id}`)}
                heading={`Total: £${order.total.toFixed(2)}`}
                subHeading={<>{order.createdAt}</>}
                cta={'View Order'}
              />
            ))}
          </Page>
        );
      }}
    </Query>
  );
};

export default Orders;
