import React from 'react';
import gql from 'graphql-tag';
import {navigate} from '@reach/router';
import {Query} from 'react-apollo';
import Button from '../ui/Button';
import styled, {keyframes} from 'styled-components/macro';

export const GET_DATA = gql`
  query GetData {
    isLoggedIn @client
    activeOrder @client {
      orderItems {
        id
      }
      total
    }
  }
`;

const Footer = () => {
  return (
    <Query query={GET_DATA}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const noOfItems = data.activeOrder.orderItems.length;
        const isLoggedIn = data.isLoggedIn;

        return (
          noOfItems > 0 && (
            <FooterWrapper>
              <Button
                width="80%"
                onClick={() =>
                  isLoggedIn
                    ? navigate('/checkout')
                    : navigate('/register', {state: {navigateTo: '/basket'}})
                }
              >
                Checkout
              </Button>

              <OrderButton
                secondary
                onClick={() => navigate('/basket')}
                width="15%"
              >
                <NoOfItems>{noOfItems}</NoOfItems>
                <OrderIcon
                  src={require('../assets/icons/basket.svg')}
                  alt="View Order"
                />
              </OrderButton>
            </FooterWrapper>
          )
        );
      }}
    </Query>
  );
};

/* Export
============================================================================= */
export default Footer;

/* Styled Components
============================================================================= */
const slideUp = keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
`;

const FooterWrapper = styled.div`
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

const OrderIcon = styled.img`
  height: 30px;
  width: 30px;
  position: absolute;
  margin: 0 auto;
  top: 5px;
  right: 0;
  left: 0;
  bottom: 0;
`;

const NoOfItems = styled.p``;

const OrderButton = styled(Button)`
  position: relative;
`;
