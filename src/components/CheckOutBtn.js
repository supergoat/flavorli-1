import React from 'react';
import Button from '../ui/Button';
import styled from 'styled-components/macro';

const CheckOutButton = () => (
  <CheckOutBtn onClick={() => {}}>Checkout</CheckOutBtn>
);

export default CheckOutButton;

const CheckOutBtn = styled(Button)`
  width: 100%;
`;
