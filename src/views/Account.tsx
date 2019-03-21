import React from 'react';
import {RouteComponentProps, navigate} from '@reach/router';
import Tile from '../ui/Tile';
import Page from '../Templates/Page';

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
    <Page heading="Account" showNavbar>
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
    </Page>
  );
};

export default Account;
