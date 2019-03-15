import React from 'react';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import {navigate} from '@reach/router';

const AddToOrder = ({price}: {price: number}) => {
  return (
    <AddToOrderWrapper>
      <CancelButton
        secondary
        onClick={() => {
          navigate('/');
        }}
      />

      <ConfirmButton
        onClick={() => {
          navigate('/');
        }}
      >
        Add for £{price.toFixed(2)}
      </ConfirmButton>
    </AddToOrderWrapper>
  );
};

export default AddToOrder;

const AddToOrderWrapper = styled.div`
  display: flex;
`;

const CancelButton = styled(Button)`
  flex: 0.3;
  margin-right: 15px;
  &:before {
    content: 'Cancel';
  }
`;

const ConfirmButton = styled(Button)`
  flex: 0.7;
`;
