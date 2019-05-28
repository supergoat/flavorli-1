import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps, Redirect, navigate} from '@reach/router';
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
  return (
    <Query query={GET_ACTIVE_ORDER}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        const activeOrder = data.activeOrder;

        if (!data.isLoggedIn || activeOrder.restaurantId === -1)
          return <Redirect to="/" noThrow />;

        return (
          <Page heading="Basket" onClose={() => window.history.back()}>
            <RestaurantName>{activeOrder.restaurantName}</RestaurantName>
            <ClearItems />
            <OrderItems items={activeOrder.orderItems} />
            <Total>
              <div>Total:</div>
              <div>£{Number(activeOrder.total).toFixed(2)}</div>
            </Total>
            <BasketFooter>
              <Button
                width="100%"
                onClick={() => navigate('/checkout')}
                type="submit"
              >
                Checkout
              </Button>
            </BasketFooter>
          </Page>
        );
      }}
    </Query>
  );
};

export default Basket;

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

const BasketFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: var(--alabasterLight);
  display: flex;
  justify-content: space-between;
  box-shadow: 0 -1px 3px rgba(200, 200, 200, 0.5);
`;
