import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps} from '@reach/router';
import {GET_CUSTOMER_ORDER} from './Order';
import OrderStatus from '../components/OrderStatus';

interface Props extends RouteComponentProps {
  orderId?: string;
}
const OrderStatusView = ({orderId}: Props) => {
  return (
    <Query
      query={GET_CUSTOMER_ORDER}
      variables={{orderId: orderId}}
      fetchPolicy="cache-and-network"
    >
      {({loading, error, data: {getCustomerOrder}, subscribeToMore}: any) => {
        if (loading) return 'Loading...';
        if (error) return 'Error';

        const subscribeToOrderStatus = () => {
          subscribeToMore({
            document: ORDER_STATUS_SUBSCRIPTION,
            variables: {orderId: orderId},
            updateQuery: (prev: any, {subscriptionData}: any) => {
              if (!subscriptionData.data) return prev;
              console.log(subscriptionData.data);
            },
          });
        };
        return (
          <div>
            <OrderStatus
              order={getCustomerOrder}
              subscribeToMore={subscribeToOrderStatus}
            />
          </div>
        );
      }}
    </Query>
  );
};

export default OrderStatusView;

const ORDER_STATUS_SUBSCRIPTION = gql`
  subscription getOrderStatus($orderId: ID!) {
    getOrderStatus(orderId: $orderId) {
      id
      updatedAt
      createdAt
      total
      orderNo
      status
      customer {
        name
        tel
      }
      restaurant {
        name
        tel
        address {
          number
          streetName
          city
          postalCode
        }
      }
      items {
        id
        name
        price
        quantity
        options {
          id
          name
          items {
            id
            name
            price
          }
        }
      }
    }
  }
`;
