import React from 'react';
import {RouteComponentProps} from '@reach/router';
import CheckOutBtn from '../components/CheckOutBtn';
import styled from 'styled-components/macro';

interface Props extends RouteComponentProps {}

const Basket = (_: Props) => {
  const basket = {
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

  return (
    <BasketWrapper>
      <Header>
        <Title>Basket</Title>
        <ClearBasket />
        <CloseButton onClick={() => window.history.back()} />
      </Header>

      {basket.items.map(
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

      <Total>
        <div>Total:</div>
        <div>£{basket.total.toFixed(2)}</div>
      </Total>

      <CheckOutBtn />
    </BasketWrapper>
  );
};

export default Basket;

/* Styled Components
============================================================================= */
const BasketWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: var(--white);
  overflow-y: auto;
  padding: 20px;
  z-index: 1;
`;

const Header = styled.header`
  margin-bottom: 5px;
`;

const Title = styled.header`
  font-size: 30px;
  font-weight: 300;
`;

const ClearBasket = styled.a`
  display: block;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 0 20px;
  color: var(--azure);
  &:before {
    content: 'Clear basket';
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 25px;
  cursor: pointer;
  &:before {
    content: 'X';
  }
`;

const BasketItem = styled.div`
  margin-bottom: 15px;
`;

const BasketItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
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
