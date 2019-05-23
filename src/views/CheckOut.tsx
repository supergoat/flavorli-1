import React from 'react';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import styled from 'styled-components/macro';
import Tile from '../components/Tile';
import {navigate, RouteComponentProps, Redirect} from '@reach/router';
import OrderItems from '../components/OrderItems';
import {GET_ACTIVE_ORDER} from './Order';

import Button from '../ui/Button';

import Page from '../templates/Page';

interface Props extends RouteComponentProps {}
const CheckOut = (_: Props) => {
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

        const variables = {
          ...activeOrder,
          total: String(activeOrder.total),
          orderItems: activeOrder.orderItems.map((orderItem: any) => ({
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            options: orderItem.options.map((option: any) => ({
              name: option.name,
              items: option.items.map((item: any) => ({
                name: item.name,
                price: item.price,
              })),
            })),
          })),
        };

        if (!data.isLoggedIn || activeOrder.restaurantId === -1)
          return <Redirect to="/" noThrow />;

        return (
          <Page heading="Checkout" onClose={() => window.history.back()}>
            {/* <RestaurantName>{activeOrder.restaurantName}</RestaurantName> */}

            <Tile
              margin="20px 0"
              onClick={() => navigate('/order')}
              heading={<OrderItems items={activeOrder.orderItems} />}
              subHeading={
                <Total>
                  <div>Total:</div>
                  <div>£{activeOrder.total}</div>
                </Total>
              }
              cta={'Change Order'}
            />

            <Tile
              onClick={() => navigate('/details')}
              heading={'American Express'}
              subHeading={'Ending 0000'}
              cta={'Change Payment'}
            />

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
                  <PlaceOrderBtn
                    onClick={() => createCheckOutSession()}
                    type="submit"
                  >
                    Place Order
                  </PlaceOrderBtn>
                );
              }}
            </Mutation>
          </Page>
        );
      }}
    </Query>
  );
};

export default CheckOut;

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
const PlaceOrderBtn = styled(Button)`
  width: 100%;
  margin-top: 30px;
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
  font-size: 16px;
`;
