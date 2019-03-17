import React, {FormEvent} from 'react';
import Tile from '../ui/Tile';
import Button from '../ui/Button';
import Label from '../ui/Label';
import styled from 'styled-components/macro';
import {navigate, RouteComponentProps} from '@reach/router';

interface Props extends RouteComponentProps {
  account: {
    address: string;
    tel: string;
  };
  orderTotal: number;
}

const CheckOut = ({account, orderTotal}: Props) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate('/');
  };

  return (
    <CheckOutWrapper>
      <Title>Checkout</Title>

      <CloseButton onClick={() => navigate('/', {replace: true})} />

      <form onSubmit={handleSubmit}>
        <Label htmlFor="name">Details</Label>

        <Tile
          onClick={() => navigate('/details')}
          heading={account.address}
          subHeading={account.tel}
          cta={'Change Address'}
        />

        <Tile
          onClick={() => navigate('/details')}
          heading={'American Express'}
          subHeading={'Ending 0000'}
          cta={'Change Payment'}
        />

        <Label htmlFor="basketItems">Order Summary</Label>

        <Tile
          onClick={() => navigate('/basket')}
          heading={`Total: £${orderTotal.toFixed(2)}`}
          cta={'View Basket'}
        />

        <Tile
          onClick={() => navigate('/basket')}
          heading={`Delivery: ASAP `}
          subHeading={`Approx. 20 -  30 mins`}
          cta={'Change time'}
        />

        <SendOrderBtn type="submit">Send Order</SendOrderBtn>
      </form>
    </CheckOutWrapper>
  );
};

export default CheckOut;

/* Styled Components
============================================================================= */
const CheckOutWrapper = styled.div`
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

const Title = styled.header`
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 20px;
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

const SendOrderBtn = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;
