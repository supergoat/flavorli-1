import React from 'react';
import styled from 'styled-components/macro';
import {navigate, RouteComponentProps} from '@reach/router';
import Tile from '../ui/Tile';

const orders = [
  {
    id: '1',
    status: 'Out for delivery',
    deliveredOn: undefined,
    total: 12,
  },
  {
    id: '2',
    status: 'Delivered',
    deliveredOn: '11 April 2019, 20:09',
    total: 12,
  },
];

interface Props extends RouteComponentProps {}
const Orders = (_: Props) => {
  return (
    <OrdersWrapper>
      <Title>Orders</Title>

      {orders.map(order => (
        <Tile
          key={order.id}
          onClick={() => navigate(`/order/${order.id}`)}
          heading={`Total: £${order.total.toFixed(2)}`}
          subHeading={
            <>
              {order.status}
              <br />
              {order.deliveredOn}
            </>
          }
          cta={'View Order'}
        />
      ))}
    </OrdersWrapper>
  );
};

export default Orders;

const OrdersWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: var(--white);
  overflow-y: auto;
  padding: 10px 20px;
`;

const Title = styled.header`
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 20px;
`;
