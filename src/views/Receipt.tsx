import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Button from '../ui/Button';
import OrderItems from '../components/OrderItems';
import styled from 'styled-components/macro';
import {RouteComponentProps, navigate} from '@reach/router';
import Page from '../templates/Page';
import {formatDate} from '../_utils/formatDate';
import {formatTime} from '../_utils/formatTime';

const GET_CUSTOMER_ORDER = gql`
  query getCustomerOrder($orderId: ID!) {
    getCustomerOrder(orderId: $orderId) {
      id
      updatedAt
      createdAt
      total
      orderNo
      status
      customer {
        name
        tel
      }
      restaurant {
        name
        tel
        address {
          number
          streetName
          city
          postalCode
        }
      }
      items {
        id
        name
        price
        quantity
        options {
          id
          name
          items {
            id
            name
            price
          }
        }
      }
    }
  }
`;

interface Props extends RouteComponentProps {
  receiptId?: string;
}
const Receipt = ({receiptId}: Props) => {
  return (
    <Query query={GET_CUSTOMER_ORDER} variables={{orderId: receiptId}}>
      {({loading, error, data: {getCustomerOrder}}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <Page heading="Thank You!">
            <OrderId>Order #{getCustomerOrder.orderNo}</OrderId>

            <DeliveryDate>
              <p>
                Placed on:{' '}
                <span>
                  {formatTime(new Date(getCustomerOrder.createdAt))},{' '}
                  {formatDate(new Date(getCustomerOrder.createdAt))}
                </span>
              </p>
              <p>
                Collected on:{' '}
                {getCustomerOrder.status === 'Collected' ? (
                  <span>
                    {formatTime(new Date(getCustomerOrder.createdAt))},{' '}
                    {formatDate(new Date(getCustomerOrder.createdAt))}
                  </span>
                ) : (
                  '--'
                )}
              </p>
            </DeliveryDate>

            <Details>
              <span>From</span>
              <FullName>{getCustomerOrder.restaurant.name}</FullName>
              <Address>
                {getCustomerOrder.restaurant.address.number},{' '}
                {getCustomerOrder.restaurant.address.streetName},{' '}
                {getCustomerOrder.restaurant.address.city},{' '}
                {getCustomerOrder.restaurant.address.postalCode}
              </Address>
              <Tel>{getCustomerOrder.restaurant.tel}</Tel>
            </Details>

            <Details>
              <span>To</span>
              <FullName>{getCustomerOrder.customer.name}</FullName>
              <Tel>{getCustomerOrder.customer.tel}</Tel>
            </Details>

            <ReceiptItems>
              <OrderItems items={getCustomerOrder.items} />

              <Total>
                <div>Total:</div>
                <div>£{getCustomerOrder.total}</div>
              </Total>
            </ReceiptItems>

            <Button
              width="100%"
              onClick={() => navigate('/restaurants', {replace: true})}
            >
              Home
            </Button>
          </Page>
        );
      }}
    </Query>
  );
};

/* Export
============================================================================= */
export default Receipt;

const OrderId = styled.h3`
  color: var(--osloGrey);
  margin-bottom: 20px;
`;

const DeliveryDate = styled.div`
  margin-bottom: 20px;

  p {
    display: block;
    margin-bottom: 5px;
  }

  span {
    font-weight: 300;
    font-size: 14px;
  }
`;

const Details = styled.div`
  margin-bottom: 30px;

  span {
    font-size: 16px;
    display: block;
    font-weight: 300;
    margin-bottom: 5px;
  }
`;

const FullName = styled.h5`
  margin-bottom: 2px;
`;

const Address = styled.p`
  font-weight: 300;
  width: 60%;
`;

const Tel = styled.p`
  font-size: 15px;
  font-weight: 300;
`;

const ReceiptItems = styled.div`
  border-top: 1px solid var(--silver);
  padding-top: 30px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 800;
  margin: 30px 0 40px;
`;
