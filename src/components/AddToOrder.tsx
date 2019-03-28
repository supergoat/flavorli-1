import React from 'react';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import {navigate} from '@reach/router';

const AddToOrder = ({price}: {price: number}) => {
  return (
    <AddToOrderWrapper>
      <CancelButton secondary onClick={() => window.history.back()} />

      <ConfirmButton onClick={() => navigate('/')}>
        Add for £{price.toFixed(2)}
      </ConfirmButton>
    </AddToOrderWrapper>
  );
};

/* Export
============================================================================= */
export default AddToOrder;

/* Styled Components
============================================================================= */
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
