import React, {useState} from 'react';
import styled from 'styled-components/macro';
import {navigate} from '@reach/router';
import Tile from '../components/Tile';
import Page from '../templates/Page';
import Button from '../ui/Button';
import Error from '../ui/Error';
import InjectedAddPaymentMethod from '../components/AddPaymentMethod';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {Elements, StripeProvider} from 'react-stripe-elements';

const CheckOut = ({activeOrder, me}: any) => {
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('0');
  const [addingPaymentMethod, setAddingPaymentMethod] = useState(false);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<any>(
    me.paymentMethod,
  );

  const handleSubmit = async ({stripe_user_id, client_secret, order}: any) => {
    // eslint-disable-next-line
    var stripe: any = Stripe('pk_test_Qvu3FuHyFpup5hiPyh0u1GWE', {
      stripeAccount: stripe_user_id,
    });

    setOrderId(order.id);

    const {paymentIntent, error} = await stripe.handleCardPayment(
      client_secret,
    );

    if (error) {
      setError(error.message);
    } else {
      navigate(`/order/${order.id}/status`);
    }
  };

  const onPaymentMethodAdded = ({paymentMethod}: any) => {
    setDefaultPaymentMethod({
      payment_method_id: paymentMethod.id,
      brand: paymentMethod.card.brand,
      last4: paymentMethod.card.last4,
    });
    setAddingPaymentMethod(false);
  };

  const hanldePlaceOrder = (upsertOrder: any) => {
    setError('');
    if (!defaultPaymentMethod || addingPaymentMethod) return;

    upsertOrder({
      variables: {
        orderId,
        paymentMethod: {
          payment_method_id: defaultPaymentMethod.payment_method_id,
          last4: defaultPaymentMethod.last4,
          brand: defaultPaymentMethod.brand,
        },
        restaurantId: activeOrder.restaurantId,
        total: String(activeOrder.total),
        orderItems: activeOrder.orderItems.map((orderItem: any) => ({
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          image: orderItem.image,
          options: orderItem.options.map((option: any) => ({
            name: option.name,
            items: option.items.map((item: any) => ({
              name: item.name,
              price: item.price,
            })),
          })),
        })),
      },
    });
  };

  return (
    <Page heading="Checkout" showNavbar>
      <CheckOutLabel>Order Details</CheckOutLabel>
      <Tile
        heading={`Total: £${activeOrder.total}`}
        subHeading={`${activeOrder.orderItems.length} items`}
        cta="View Basket"
        margin="0 0 20px 0"
        onClick={() => navigate('/basket')}
      />
      <CheckOutLabel>Payment Method</CheckOutLabel>

      {defaultPaymentMethod && !addingPaymentMethod && (
        <Tile
          heading={
            <CardDetails>
              <CardIcon
                src={require(`../assets/payment_methods/${
                  defaultPaymentMethod.brand
                }.png`)}
                alt={defaultPaymentMethod.brand}
              />
              <p>Ending {defaultPaymentMethod.last4}</p>
            </CardDetails>
          }
          cta="Change Payment Method"
          onClick={() => {
            setError('');
            setAddingPaymentMethod(true);
          }}
        />
      )}

      {!addingPaymentMethod && !defaultPaymentMethod && (
        <AddPaymentMethodButton onClick={() => setAddingPaymentMethod(true)}>
          ADD PAYMENT METHOD +
        </AddPaymentMethodButton>
      )}

      {addingPaymentMethod && (
        <StripeProvider apiKey="pk_test_NKnBsom5zXyef5kS8QnDGooZ00QdPL9xcC">
          <Elements>
            <InjectedAddPaymentMethod
              onPaymentMethodAdded={onPaymentMethodAdded}
              onCancel={() => setAddingPaymentMethod(false)}
            />
          </Elements>
        </StripeProvider>
      )}

      <Error show={!!error}>{error}</Error>
      <Mutation
        onError={(err: any) => {
          const error = err.message.replace('GraphQL error:', ' ').trim();
          setError(error);
        }}
        mutation={UPSERT_ORDER}
        onCompleted={({upsertOrder}: {upsertOrder: string}) =>
          handleSubmit(upsertOrder)
        }
      >
        {(upsertOrder, {loading, error, data}) => {
          return (
            <CheckOutFooter>
              <Button
                disabled={!defaultPaymentMethod || addingPaymentMethod}
                width="100%"
                onClick={() => hanldePlaceOrder(upsertOrder)}
                type="submit"
              >
                {loading ? 'Processing...' : ' Place Order'}
              </Button>
            </CheckOutFooter>
          );
        }}
      </Mutation>
    </Page>
  );
};

export default CheckOut;

const UPSERT_ORDER = gql`
  mutation upsertOrder(
    $orderId: ID
    $paymentMethod: PaymentMethodInput!
    $restaurantId: ID!
    $total: String!
    $orderItems: [OrderItemInput!]!
  ) {
    upsertOrder(
      orderId: $orderId
      paymentMethod: $paymentMethod
      restaurantId: $restaurantId
      total: $total
      orderItems: $orderItems
    ) {
      order {
        id
      }
      stripe_user_id
      client_secret
    }
  }
`;

const CheckOutLabel = styled.label`
  position: relative;
  color: var(--oxfordBlue);
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
`;

const CheckOutFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: var(--alabasterLight);
  display: flex;
  justify-content: space-between;
  box-shadow: 0 -1px 3px rgba(200, 200, 200, 0.5);
`;

const CardDetails = styled.div`
  display: flex;
  align-items: center;
`;

const CardIcon = styled.img`
  height: 30px;
  margin-right: 10px;
`;

const AddPaymentMethodButton = styled.div`
  cursor: pointer;
`;
