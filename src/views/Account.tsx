import React from 'react';
import {RouteComponentProps, navigate} from '@reach/router';
import Tile from '../ui/Tile';
import styled from 'styled-components/macro';

interface Props extends RouteComponentProps {}
const Account = (_: Props) => {
  const account = {
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
  return (
    <AccountWrapper>
      <Title>Account</Title>
      <Tile
        onClick={() => navigate('/details')}
        heading={'Panayiotis Nicolaou'}
        subHeading={
          <>
            <p>{account.email}</p>
            <p>{account.tel}</p>
          </>
        }
        cta={'Change Details'}
      />

      <Tile
        onClick={() => navigate('/details')}
        heading={`${account.address.houseNumber} ${
          account.address.streetName
        }, ${account.address.city}, ${account.address.postalCode}`}
        subHeading={account.address.notes}
        cta={'Change Address'}
      />

      <Tile
        onClick={() => navigate('/details')}
        heading={'American Express'}
        subHeading={'Ending 0000'}
        cta={'Change Payment'}
      />
    </AccountWrapper>
  );
};

export default Account;

const AccountWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.header`
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 20px;
`;
