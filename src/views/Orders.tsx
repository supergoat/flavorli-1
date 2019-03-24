import React from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import Tile from '../ui/Tile';
import Page from '../templates/Page';

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
    <Page heading="Orders" showNavbar>
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
    </Page>
  );
};

export default Orders;
