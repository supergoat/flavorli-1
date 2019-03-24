import React from 'react';
import Button from '../ui/Button';
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
        name: 'Chicken Butterfly',
        options: {
          ' Add a sauce': [
            'Hot PERi-PERi Sauce 125ml',
            'Extra Extra Hot PERi-PERi Sauce 125ml',
            'Garlic PERi-PERi Sauce 125ml',
          ],
          'Choose Spice': ['Hot'],
        },
        price: 6,
        quantity: 1,
      },
      {
        id: 1,
        name: 'Chicken Butterfly',
        price: 6,
        quantity: 1,
      },
    ],
    total: 10,
  };
};

interface Props extends RouteComponentProps {}
const Order = (_: Props) => {
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
      <BasketItems>
        {order.items.map(
          (basketItem: {
            id: number;
            quantity: number;
            name: string;
            price: number;
            options?: {
              [categoryName: string]: string[];
            };
          }) => (
            <BasketItem key={basketItem.id}>
              <BasketItemInfo>
                <Quantity>{basketItem.quantity}</Quantity>
                <Name>{basketItem.name}</Name>
                <Price>{basketItem.price.toFixed(2)}</Price>
              </BasketItemInfo>

              {basketItem.options && (
                <Options>
                  {Object.keys(basketItem.options).map(
                    (categoryName, index) =>
                      basketItem.options &&
                      basketItem.options[categoryName].map(
                        (optionName, index) => (
                          <OptionName>{optionName}</OptionName>
                        ),
                      ),
                  )}
                </Options>
              )}
            </BasketItem>
          ),
        )}
      </BasketItems>
      <Total>
        <div>Total:</div>
        <div>£{order.total.toFixed(2)}</div>
      </Total>
      <Button width="100%" onClick={() => navigate('/', {replace: true})}>
        Home
      </Button>
    </Page>
  );
};

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

const BasketItems = styled.div`
  border-top: 1px solid var(--silver);
  padding-top: 30px;
`;

const BasketItem = styled.div`
  margin-bottom: 15px;
`;

const BasketItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
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

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OptionName = styled.p`
  width: 90%;
  font-size: 13px;
  color: var(--osloGrey);
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 800;
  margin: 30px 0 40px;
`;

export default Order;
