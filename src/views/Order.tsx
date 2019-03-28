import React, {Fragment} from 'react';
import {RouteComponentProps, navigate} from '@reach/router';
import styled from 'styled-components/macro';
import Page from '../templates/Page';
import Button from '../ui/Button';

interface Props extends RouteComponentProps {}

const Order = (_: Props) => {
  const order = {
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

  return (
    <Page heading="Order" onClose={() => window.history.back()}>
      <ClearItems />

      {order.items.map(orderItem => (
        <OrderItem key={orderItem.id}>
          <OrderItemInfo>
            <Quantity>{orderItem.quantity}</Quantity>
            <Name>{orderItem.name}</Name>
            <Price>{orderItem.price.toFixed(2)}</Price>
          </OrderItemInfo>

          <Options>
            {orderItem.options.map(option => (
              <Fragment key={option.name}>
                {option.selections.map(selection => (
                  <SelectionName key={selection.name}>
                    {selection.name}
                  </SelectionName>
                ))}
              </Fragment>
            ))}
          </Options>
        </OrderItem>
      ))}

      <Total>
        <div>Total:</div>
        <div>£{order.total.toFixed(2)}</div>
      </Total>
      <Button width="100%" onClick={() => navigate('/checkout')}>
        Checkout
      </Button>
    </Page>
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

const OrderItem = styled.div`
  margin-bottom: 15px;
`;

const OrderItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SelectionName = styled.p`
  width: 90%;
  font-size: 13px;
  color: var(--osloGrey);
`;

const Quantity = styled.div`
  justify-content: space-around;
  width: 10%;
  padding-top: 2px;
  font-size: 18px;
  &:after {
    content: 'x';
  }
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 300;
  width: 70%;
  margin-bottom: 5px;
`;

const Price = styled.div`
  font-size: 18px;
  width: 20%;
  text-align: right;
  &:before {
    content: '£';
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 800;
  border-top: 1px solid var(--silver);
  padding: 20px 0;
`;
