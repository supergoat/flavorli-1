import React, {MouseEvent} from 'react';
import {Query} from 'react-apollo';
import styled from 'styled-components/macro';
import Tile from '../components/Tile';
import {navigate, RouteComponentProps, Redirect} from '@reach/router';
import OrderItems from '../components/OrderItems';
import {GET_ACTIVE_ORDER} from './Order';

import Button from '../ui/Button';

import Page from '../templates/Page';

interface Props extends RouteComponentProps {}
const CheckOut = (_: Props) => {
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // const items = {
    //   name: 'The Big Jack',
    //   price: '8.00',
    //   quantity: 1,
    //   options: {
    //     create: {
    //       name: 'Make It a Filthy Box',
    //       items: {
    //         create: {
    //           name: 'Bang Bang',
    //           price: '2.00',
    //         },
    //       },
    //     },
    //   },
    // };

    navigate('/order');
  };

  return (
    <Query query={GET_ACTIVE_ORDER}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const activeOrder = data.activeOrder;

        if (!data.isLoggedIn || activeOrder.restaurantId === -1)
          return <Redirect to="/" noThrow />;

        return (
          <Page heading="Checkout" onClose={() => window.history.back()}>
            <RestaurantName>{activeOrder.restaurantName}</RestaurantName>
            <Table>Table: 10</Table>

            <Tile
              margin="20px 0"
              onClick={() => navigate('/order')}
              heading={<OrderItems items={activeOrder.items} />}
              subHeading={
                <Total>
                  <div>Total:</div>
                  <div>£{activeOrder.total.toFixed(2)}</div>
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
