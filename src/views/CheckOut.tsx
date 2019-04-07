import React, {MouseEvent} from 'react';
import {Query} from 'react-apollo';
import styled from 'styled-components/macro';
import Tile from '../ui/Tile';
import {navigate, RouteComponentProps} from '@reach/router';
import OrderItems from '../components/OrderItems';
import {GET_ACTIVE_ORDER} from './Order';

import Button from '../ui/Button';

import Page from '../templates/Page';

interface Props extends RouteComponentProps {}
const CheckOut = (_: Props) => {
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate('/order');
  };

  return (
    <Query query={GET_ACTIVE_ORDER}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const activeOrder = data.activeOrder;

        return (
          <Page heading="Checkout" onClose={() => window.history.back()}>
            <RestaurantName>{activeOrder.restaurant.name}</RestaurantName>
            <Table>Table: 10</Table>

            <Summary>
              <Tile
                onClick={() => navigate('/order')}
                heading={<OrderItems items={activeOrder.items} />}
                subHeading={
                  <Total>
                    <div>Total:</div>
                    <div>£{activeOrder.total}</div>
                  </Total>
                }
                cta={'Change Order'}
              />
            </Summary>

            <Summary>
              <Tile
                onClick={() => navigate('/details')}
                heading={'American Express'}
                subHeading={'Ending 0000'}
                cta={'Change Payment'}
              />
            </Summary>

            <PlaceOrderBtn onClick={handleSubmit} type="submit">
              Place Order
            </PlaceOrderBtn>
          </Page>
        );
      }}
    </Query>
  );
};

export default CheckOut;

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

const Table = styled.h3``;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;

const Summary = styled.div`
  padding-top: 20px;
`;
