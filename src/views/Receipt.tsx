import React from 'react';
import Button from '../ui/Button';
import OrderItems from '../components/OrderItems';
import styled from 'styled-components/macro';
import {RouteComponentProps, navigate} from '@reach/router';
import Page from '../templates/Page';

const getOrder = () => {
  return {
    id: 1,
    placedOn: '14 April 2019, 19:27',
    deliveredOn: '',
    restaurant: {
      name: 'Nandos Dalston',
      address: '148 Kingsland High Street, London, E82NS',
      tel: '02079233555',
    },
    customer: {
      name: 'Panayiotis Nicolaou',
      address: '7 Fermain Court North, De Beauvoir Roard, London, N15SX',
      tel: '07960778401',
    },
    items: [
      {
        id: 0,
        name: 'Farfalle alla Boscaiola',
        options: [
          {
            name: 'Ingredients',
            selections: [
              {name: 'Mushrooms', price: 0.5, selected: true},
              {name: 'Pancetta', price: 0.5, selected: true},
              {name: 'Parmesan Cheese', price: 0.5, selected: true},
            ],
          },
        ],
        price: 6,
        quantity: 1,
      },
      {
        id: 0,
        name: 'Farfalle alla Boscaiola',
        options: [],
        price: 6,
        quantity: 1,
      },
    ],
    total: 10,
  };
};

interface Props extends RouteComponentProps {}
const Receipt = (_: Props) => {
  const order = getOrder();
  return (
    <Page heading="Thank You!">
      <OrderId>Order #{order.id}</OrderId>

      <DeliveryDate>
        <p>
          Placed on: <span>{order.placedOn}</span>
        </p>
        <p>
          Delivered on: <span>{order.deliveredOn || '--'}</span>
        </p>
      </DeliveryDate>

      <Details>
        <span>From</span>
        <FullName>{order.restaurant.name}</FullName>
        <Address>{order.restaurant.address}</Address>
        <Tel>{order.restaurant.tel}</Tel>
      </Details>

      <Details>
        <span>To</span>
        <FullName>{order.customer.name}</FullName>
        <Address>{order.customer.address}</Address>
        <Tel>{order.customer.tel}</Tel>
      </Details>

      <ReceiptItems>
        <OrderItems items={order.items} />

        <Total>
          <div>Total:</div>
          <div>£{order.total.toFixed(2)}</div>
        </Total>
      </ReceiptItems>

      <Button
        width="100%"
        onClick={() => navigate('/restaurants', {replace: true})}
      >
        Home
      </Button>
    </Page>
  );
};

/* Export
============================================================================= */
export default Receipt;

const OrderId = styled.h3`
  color: var(--osloGrey);
  margin-bottom: 20px;
`;

const DeliveryDate = styled.div`
  margin-bottom: 20px;

  p {
    display: block;
    font-size: 0.83em;
    margin-bottom: 5px;
  }

  span {
    font-weight: 300;
    font-size: 14px;
  }
`;

const Details = styled.div`
  margin-bottom: 30px;

  span {
    display: block;
    font-weight: 300;
    margin-bottom: 5px;
  }
`;

const FullName = styled.h5`
  margin-bottom: 2px;
`;

const Address = styled.p`
  font-size: 14px;
  font-weight: 300;
  width: 60%;
`;

const Tel = styled.p`
  font-size: 15px;
  font-weight: 300;
`;

const ReceiptItems = styled.div`
  border-top: 1px solid var(--silver);
  padding-top: 30px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 800;
  margin: 30px 0 40px;
`;
