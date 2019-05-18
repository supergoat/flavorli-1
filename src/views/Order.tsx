import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps, navigate} from '@reach/router';
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
      items {
        id
        name
        selections
        price
        quantity
      }
      total
    }
  }
`;

const Order = (_: Props) => {
  return (
    <Query query={GET_ACTIVE_ORDER}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const activeOrder = data.activeOrder;

        return (
          <Page heading="Order" onClose={() => window.history.back()}>
            <RestaurantName>Breakfast Club Spitafields</RestaurantName>

            <ClearItems />

            <OrderItems items={activeOrder.items} />

            <Total>
              <div>Total:</div>
              <div>£{Number(activeOrder.total).toFixed(2)}</div>
            </Total>
            <Button width="100%" onClick={() => navigate('/checkout')}>
              Checkout
            </Button>
          </Page>
        );
      }}
    </Query>
  );
};

/* Export
============================================================================= */
export default Order;

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
