import React, {FormEvent} from 'react';
import Label from '../ui/Label';
import Button from '../ui/Button';
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
        <Tile type="button" onClick={() => navigate('/account')}>
          <Heading>{account.address}</Heading>
          <SubHeading>{account.tel}</SubHeading>

          <CTA>Change Details</CTA>
        </Tile>

        <Label htmlFor="basketItems">Order Summary</Label>
        <Tile type="button" onClick={() => navigate('/basket')}>
          <Heading>Total: £{orderTotal.toFixed(2)}</Heading>
          <CTA>View Basket</CTA>
        </Tile>

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

const Tile = styled(Button).attrs({
  secondary: true,
})`
  width: 100%;
  border: 1px solid var(--silver);
  text-align: left;
  margin-bottom: 20px;
`;

const Heading = styled.h5`
  font-size: 15px;
  margin-bottom: 10px;
`;

const SubHeading = styled.p`
  font-size: 14px;
  color: var(--osloGrey);
`;

const CTA = styled.p`
  font-size: 14px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--silver);
  font-weight: bold;
`;

const SendOrderBtn = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;
