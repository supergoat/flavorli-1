import React from 'react';
import CheckOutBtn from './CheckOutBtn';
import Button from '../ui/Button';
import styled, {keyframes} from 'styled-components/macro';
import {navigate} from '@reach/router';

const CheckOutFooter = () => {
  const noOfBasketItems = 1;
  return (
    <CheckOutFooterWrapper>
      <CheckOutBtn />

      <BasketButton secondary onClick={() => navigate('/basket')}>
        <NoOfItems>{noOfBasketItems}</NoOfItems>
        <BasketIcon
          src={require('../assets/icons/basket.svg')}
          alt="View Basket"
        />
      </BasketButton>
    </CheckOutFooterWrapper>
  );
};

export default CheckOutFooter;

/* Styled Components
============================================================================= */
const slideUp = keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
`;

const magnify = keyframes`
  0% { transform: scale(1); transform-origin: 50% 70%; }
  50% { transform: scale(1.2); transform-origin: 50% 70%; }
  100% { transform: scale(1); transform-origin: 50% 70%; }
`;

const CheckOutFooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: var(--alabasterLight);
  display: flex;
  justify-content: space-between;
  box-shadow: 0 -1px 3px rgba(200, 200, 200, 0.5);
  animation: ${slideUp} 0.2s;
`;

const BasketIcon = styled.img`
  height: 35px;
  width: 35px;
  animation: ${magnify} 0.8s;
`;
const NoOfItems = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  position: absolute;
  padding-top: 5px;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const BasketButton = styled(Button)`
  margin-left: 15px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  position: relative;
`;
