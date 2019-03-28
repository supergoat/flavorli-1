import React, {Dispatch, SetStateAction} from 'react';
import styled, {css} from 'styled-components/macro';

const SelectQuantity = ({
  qty,
  setQty,
}: {
  qty: number;
  setQty: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <SelectQuantityWrapper>
      <QtyBtn onClick={() => setQty(q => q - 1)} disabled={qty <= 1}>
        -
      </QtyBtn>

      <p>{qty}</p>

      <QtyBtn onClick={() => setQty(q => q + 1)}>+</QtyBtn>
    </SelectQuantityWrapper>
  );
};

/* Export
============================================================================= */
export default SelectQuantity;

/* Styled Components
============================================================================= */
const SelectQuantityWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  p {
    font-size: 25px;
    text-align: center;
    width: 70px;
  }
`;

const QtyBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 1px solid var(--oxfordBlue);
  font-size: 17px;
  color: var(--oxfordBlue);
  background: var(--white)
  touch-action: manipulation;
  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};
`;
