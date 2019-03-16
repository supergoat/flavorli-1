import React from 'react';
import Button from '../ui/Button';
import styled from 'styled-components/macro';
import {navigate, RouteComponentProps} from '@reach/router';

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
        <Tile key={order.id} onClick={() => navigate(`/order/${order.id}`)}>
          <Heading>Total: £{order.total.toFixed(2)}</Heading>
          <SubHeading>
            {order.status}
            <br />
            {order.deliveredOn}
          </SubHeading>
          <CTA>View Order</CTA>
        </Tile>
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

const Tile = styled(Button).attrs({
  secondary: true,
})`
  width: 100%;
  border: 1px solid var(--silver);
  text-align: left;
  margin-bottom: 20px;
`;

const Heading = styled.h5`
  font-size: 15px;
  margin-bottom: 10px;
`;

const SubHeading = styled.p`
  font-size: 14px;
  color: var(--osloGrey);
`;

const CTA = styled.p`
  font-size: 14px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--gallery);
  font-weight: bold;
`;
