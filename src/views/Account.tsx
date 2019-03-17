import React from 'react';
import {RouteComponentProps, navigate} from '@reach/router';
import Tile from '../ui/Tile';
import styled from 'styled-components/macro';

interface Props extends RouteComponentProps {}
const Account = (_: Props) => {
  const account = {
    address: '7 Fermain Court North, De Beauvoir Road, London, N15SX',
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
            <p>p.nicolaou.13@gmail.com</p>
            {account.tel}
          </>
        }
        cta={'Change Details'}
      />

      <Tile
        onClick={() => navigate('/address')}
        heading={account.address}
        cta={'Change Address'}
      />

      <Tile
        onClick={() => navigate('/details')}
        heading={'Ending 0000'}
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
