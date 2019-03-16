import React from 'react';
import {navigate} from '@reach/router';
import Button from '../ui/Button';
import styled from 'styled-components/macro';

const CheckOutButton = () => (
  <CheckOutBtn onClick={() => navigate('/checkout')}>Checkout</CheckOutBtn>
);

export default CheckOutButton;

const CheckOutBtn = styled(Button)`
  width: 100%;
`;
