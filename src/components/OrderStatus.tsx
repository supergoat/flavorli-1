import React, {useEffect} from 'react';
import OrderItems from '../components/OrderItems';
import styled from 'styled-components/macro';
import Page from '../templates/Page';
import {formatTime} from '../_utils/formatTime';

import ProgressBar from './ProgressBar';

const OrderStatus = ({
  order,
  subscribeToMore,
}: {
  order: any;
  subscribeToMore?: any;
}) => {
  useEffect(() => subscribeToMore && subscribeToMore(), []);

  let progressBarWidth = '95%';
  if (order.status === 'Pending') progressBarWidth = '33%';
  if (order.status === 'InProgress') progressBarWidth = '66%';

  let orderStatus = 'Waiting for confirmation';

  if (order.status === 'InProgress')
    orderStatus = 'Your order is being prepared';
  if (order.status === 'Ready')
    orderStatus = 'Your order is ready to be collected';

  return (
    <Page heading="Thank You!" showNavbar>
      <OrderId>Order #{order.orderNo}</OrderId>

      <Total>Total: £{order.total}</Total>

      {order.status !== 'Collected' ? (
        <>
          <StatusBar>
            <Status>{orderStatus}</Status>
            <DueAt>{formatTime(new Date(order.dueAt))}</DueAt>
          </StatusBar>
          <ProgressBar width={progressBarWidth} />
        </>
      ) : (
        <>
          <CollectetAt>{formatTime(new Date(order.updatedAt))}</CollectetAt>

          <p>Your order has been collected</p>
          <p>Enjoy!</p>
        </>
      )}

      <Details>
        <FullName>{order.restaurant.name}</FullName>
        <Address>
          {order.restaurant.address.number},{' '}
          {order.restaurant.address.streetName}, {order.restaurant.address.city}
          , {order.restaurant.address.postalCode}
        </Address>
        <Tel>{order.restaurant.tel}</Tel>
      </Details>

      <OrderItemsWrapper>
        <h4>Order Summary</h4>
        <OrderItems items={order.items} />
      </OrderItemsWrapper>
    </Page>
  );
};

export default OrderStatus;

const OrderId = styled.h3`
  color: var(--osloGrey);
  margin: 10px 0;
`;

const Status = styled.div``;

const DueAt = styled.div`
  text-align: right;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const CollectetAt = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Details = styled.div`
  margin: 20px 0;

  span {
    font-size: 16px;
    display: block;
    font-weight: 300;
    margin-bottom: 5px;
  }
`;

const FullName = styled.h5`
  margin-bottom: 2px;
`;

const Address = styled.p`
  font-weight: 300;
  width: 60%;
`;

const Tel = styled.p`
  font-size: 15px;
  font-weight: 300;
`;

const OrderItemsWrapper = styled.div`
  h4 {
    margin-bottom: 5px;
  }
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Total = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;
