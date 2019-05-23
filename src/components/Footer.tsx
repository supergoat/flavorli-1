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
                width="100%"
                onClick={() =>
                  isLoggedIn
                    ? navigate('/order')
                    : navigate('/register', {state: {navigateTo: '/order'}})
                }
              >
                View Order ({noOfItems})
              </Button>
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
  height: 35px;
  width: 35px;
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

const OrderButton = styled(Button)`
  margin-left: 15px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  position: relative;
`;
