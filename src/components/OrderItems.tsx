import React from 'react';
import styled from 'styled-components/macro';

type OrderItemType = {
  id: string;
  name: string;
  selections: string[];
  price: number;
  quantity: number;
};

interface Props {
  items: any;
}
const OrderItems = ({items}: Props) => {
  return (
    <>
      {items.map((orderItem: OrderItemType) => (
        <OrderItem key={orderItem.id}>
          <OrderItemInfo>
            <Quantity>{orderItem.quantity}</Quantity>
            <Name>{orderItem.name}</Name>
            <Price>{orderItem.price.toFixed(2)}</Price>
          </OrderItemInfo>

          <Selections>
            {orderItem.selections.map((selection: string) => {
              return <Selection key={selection}>{selection}</Selection>;
            })}
          </Selections>
        </OrderItem>
      ))}
    </>
  );
};

export default OrderItems;

const OrderItem = styled.div`
  margin-bottom: 15px;
`;

const OrderItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Quantity = styled.div`
  font-size: 16px;
  width: 10%;
  &:after {
    content: 'x';
  }
`;

const Name = styled.div`
  width: 70%;
  font-size: 16px;
  margin-bottom: 5px;
`;

const Price = styled.div`
  font-size: 16px;
  width: 20%;
  text-align: right;
  color: var(--osloGrey);
  &:before {
    content: '£';
  }
`;

const Selections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Selection = styled.p`
  width: 90%;
  font-size: 13px;
  color: var(--osloGrey);
`;
