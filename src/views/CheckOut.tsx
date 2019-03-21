import React, {MouseEvent} from 'react';
import Tile from '../ui/Tile';
import Button from '../ui/Button';
import Label from '../ui/Label';
import styled from 'styled-components/macro';
import {navigate, RouteComponentProps} from '@reach/router';

interface Props extends RouteComponentProps {}

interface AccountType {
  email: string;
  name: string;
  address: {
    houseNumber: number;
    streetName: string;
    city: string;
    postalCode: string;
    notes: string;
  };
  tel: string;
}

const account: AccountType = {
  name: 'Panayiotis Nicolaou',
  email: 'p.nicolaou.13@gmail.com',
  address: {
    houseNumber: 7,
    streetName: 'Fermain Court North, De Beauvoir Road',
    city: 'London',
    postalCode: 'N15SX',
    notes: 'Please come from Downham Road',
  },
  tel: '07960778401',
};
const orderTotal: number = 10;

const CheckOut = (_: Props) => {
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate('/');
  };

  const formatAddress = (address: {
    houseNumber: number;
    streetName: string;
    city: string;
    postalCode: string;
    notes: string;
  }) => {
    return `${address.houseNumber} ${address.streetName}, ${address.city}, ${
      address.postalCode
    }`;
  };

  return (
    <CheckOutWrapper>
      <Title>Checkout</Title>

      <CloseButton onClick={() => navigate('/', {replace: true})} />

      <Label>Order Summary</Label>

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

      <Label>Payment</Label>

      <Tile
        onClick={() => navigate('/details')}
        heading={'American Express'}
        subHeading={'Ending 0000'}
        cta={'Change Payment'}
      />

      <Label>Details</Label>

      <Tile
        onClick={() => navigate('/details')}
        heading={'Panayiotis Nicolaou'}
        subHeading={
          <>
            <p>{account.email}</p>
            <p>{account.tel}</p>
          </>
        }
        cta={'Change Contact'}
      />

      <Tile
        onClick={() => navigate('/address')}
        heading={formatAddress(account.address)}
        subHeading={account.address.notes}
        cta={'Change Address'}
      />

      <SendOrderBtn onClick={handleSubmit} type="submit">
        Send Order
      </SendOrderBtn>
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
