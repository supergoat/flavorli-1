import React from 'react';
import styled from 'styled-components/macro';
import {injectStripe, CardElement} from 'react-stripe-elements';
import Button from '../ui/Button';

const CheckoutForm = ({stripe, onPaymentMethodAdded, onCancel}: any) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const paymentMethod = await stripe.createPaymentMethod('card');
    if (!paymentMethod.error) onPaymentMethodAdded(paymentMethod);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardDetails>
        <StyledCardElement />
      </CardDetails>
      <Actions>
        <Button width="35%" secondary type="button" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button width="60%" type="submit">
          Save Payment Method
        </Button>
      </Actions>
    </form>
  );
};

export default injectStripe(CheckoutForm);

const CardDetails = styled.div`
  .StripeElement--invalid {
    border: 1px solid var(--darkRed);
  }
`;

const StyledCardElement = styled(CardElement)`
  display: block;
  padding: 15px;
  border: 1px solid var(--silver);
  border-radius: 4px;
  background: white;
`;

const Actions = styled.div`
  display: flex;
  margin: 10px 0;
  justify-content: space-between;
`;
