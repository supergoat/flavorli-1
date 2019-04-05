import React, {MouseEvent, useState} from 'react';
import Tile from '../ui/Tile';
import Button from '../ui/Button';
import Label from '../ui/Label';
import styled from 'styled-components/macro';
import {navigate, RouteComponentProps} from '@reach/router';
import Page from '../templates/Page';
import ChangeTime from '../components/ChangeTime';

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
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate('/order/1');
  };

  return (
    <Page
      heading="Checkout"
      onClose={() => navigate('/restaurants', {replace: true})}
    >
      <Label>Order Summary</Label>

      <Tile
        onClick={() => navigate('/order/1')}
        heading={`Total: £${orderTotal.toFixed(2)}`}
        cta={'View Basket'}
      />

      <Tile
        onClick={() => setIsTimeModalOpen(s => !s)}
        heading={`Take Away: ASAP `}
        subHeading={`Approx. 30 mins`}
        cta={'Change time'}
      />

      {isTimeModalOpen && (
        <ChangeTime
          openingTime={11}
          closingTime={20}
          onCancel={() => setIsTimeModalOpen(false)}
        />
      )}

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

      <SendOrderBtn onClick={handleSubmit} type="submit">
        Send Order
      </SendOrderBtn>
    </Page>
  );
};

export default CheckOut;

/* Styled Components
============================================================================= */
const SendOrderBtn = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;
