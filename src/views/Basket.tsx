import React from 'react';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import {RouteComponentProps, Redirect} from '@reach/router';
import styled from 'styled-components/macro';
import Page from '../templates/Page';
import Button from '../ui/Button';
import OrderItems from '../components/OrderItems';

interface Props extends RouteComponentProps {}

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
  }
`;

const Basket = (_: Props) => {
  const handleSubmit = async ({stripe_user_id, sessionId}: any) => {
    // eslint-disable-next-line
    var stripe: any = Stripe('pk_test_Qvu3FuHyFpup5hiPyh0u1GWE', {
      stripeAccount: stripe_user_id,
    });

    await stripe.redirectToCheckout({
      sessionId: sessionId,
    });
  };

  return (
    <Query query={GET_ACTIVE_ORDER}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        const activeOrder = data.activeOrder;

        if (!data.isLoggedIn || activeOrder.restaurantId === -1)
          return <Redirect to="/" noThrow />;

        const variables = {
          ...activeOrder,
          total: String(activeOrder.total),
          orderItems: activeOrder.orderItems.map((orderItem: any) => ({
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            image: orderItem.image,
            options: orderItem.options.map((option: any) => ({
              name: option.name,
              items: option.items.map((item: any) => ({
                name: item.name,
                price: item.price,
              })),
            })),
          })),
        };

        return (
          <Page heading="Basket" onClose={() => window.history.back()}>
            <RestaurantName>{activeOrder.restaurantName}</RestaurantName>
            <ClearItems />

            <OrderItems items={activeOrder.orderItems} />

            <Total>
              <div>Total:</div>
              <div>£{Number(activeOrder.total).toFixed(2)}</div>
            </Total>

            <Mutation
              mutation={CREATE_CHECKOUT_SESSION}
              onCompleted={({
                createCheckOutSession,
              }: {
                createCheckOutSession: string;
              }) => handleSubmit(createCheckOutSession)}
              variables={variables}
            >
              {(createCheckOutSession, {loading, error, data}) => {
                return (
                  <Button
                    width="100%"
                    onClick={() => createCheckOutSession()}
                    type="submit"
                  >
                    {loading ? 'Processing...' : ' Checkout'}
                  </Button>
                );
              }}
            </Mutation>
          </Page>
        );
      }}
    </Query>
  );
};

/* Export
============================================================================= */
export default Basket;

const CREATE_CHECKOUT_SESSION = gql`
  mutation createCheckOutSession(
    $restaurantId: ID!
    $total: String!
    $orderItems: [OrderItemInput!]!
  ) {
    createCheckOutSession(
      restaurantId: $restaurantId
      total: $total
      orderItems: $orderItems
    ) {
      sessionId
      stripe_user_id
    }
  }
`;

/* Styled Components
============================================================================= */
const ClearItems = styled.a`
  display: block;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 0 20px;
  color: var(--azure);
  &:before {
    content: 'Clear Items';
  }
`;

const RestaurantName = styled.h1`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 800;
  border-top: 1px solid var(--silver);
  padding: 20px 0;
`;
