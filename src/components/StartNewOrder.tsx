import React from 'react';
import styled from 'styled-components/macro';
import Button from '../ui/Button';

interface Props {
  activeRestaurant: {
    name: string;
  };
  newRestaurant: {
    name: string;
  };
  onCancel: () => void;
  onStartNewOrder: () => void;
}

const StartNewOrder = ({
  activeRestaurant,
  newRestaurant,
  onStartNewOrder,
  onCancel,
}: Props) => {
  return (
    <>
      <h1>Start new order?</h1>

      <ConfirmationMessage>
        Are you sure you want to start a new order with
        <span>{newRestaurant.name}</span>?
        <br />
        Your order with
        <span>{activeRestaurant.name}</span> will be lost
      </ConfirmationMessage>

      <ConfirmationButtons>
        <Button width={'25%'} secondary onClick={onCancel}>
          Cancel
        </Button>

        <Button
          width={'70%'}
          onClick={onStartNewOrder}
          aria-label="Add item to order"
        >
          Start new order
        </Button>
      </ConfirmationButtons>
    </>
  );
};
export default StartNewOrder;

const ConfirmationMessage = styled.p`
  margin: 15px 0 20px;
  line-height: 1.5em;
  color: var(--osloGrey);

  span {
    margin: 0 5px;
    font-size: 16px;
    color: var(--oxfordBlue);
  }
`;

const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;
