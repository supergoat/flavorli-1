import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps, navigate} from '@reach/router';
import styled from 'styled-components/macro';
import Page from '../templates/Page';
import Button from '../ui/Button';

interface Props extends RouteComponentProps {}

export const GET_ACTIVE_ORDER = gql`
  query GetActiveOrder {
    activeOrder @client {
      restaurant {
        id
        name
        tel
        address {
          number
          streetName
          city
          postalCode
        }
      }
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

type OrderItemType = {
  id: string;
  name: string;
  selections: string[];
  price: number;
  quantity: number;
};

const Order = (_: Props) => {
  return (
    <Query query={GET_ACTIVE_ORDER}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const activeOrder = data.activeOrder;

        return (
          <Page heading="Order" onClose={() => window.history.back()}>
            <ClearItems />

            {activeOrder.items.map((orderItem: OrderItemType) => (
              <OrderItem key={orderItem.id}>
                <OrderItemInfo>
                  <Quantity>{orderItem.quantity}</Quantity>
                  <Name>{orderItem.name}</Name>
                  <Price>{orderItem.price.toFixed(2)}</Price>
                </OrderItemInfo>

                <Selections>
                  {orderItem.selections.map(selection => {
                    return (
                      <SelectionName key={selection}>{selection}</SelectionName>
                    );
                  })}
                </Selections>
              </OrderItem>
            ))}

            <Total>
              <div>Total:</div>
              <div>£{activeOrder.total.toFixed(2)}</div>
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

const OrderItem = styled.div`
  margin-bottom: 15px;
`;

const OrderItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Selections = styled.div`
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
