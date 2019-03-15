import React from 'react';
import styled from 'styled-components/macro';

interface Props {
  option: {categoryName: string; name: string; price: number};
  onClick: () => void;
  isSelected: boolean;
}
const Option = ({option, onClick, isSelected}: Props) => {
  return (
    <OptionWrapper isSelected={isSelected}>
      <div>
        <p>{option.name}</p>
        {option.price > 0 && (
          <Price isSelected={isSelected}>
            {isSelected ? '-' : '+'} £{option.price.toFixed(2)}
          </Price>
        )}
      </div>

      <input
        onClick={onClick}
        name={option.categoryName}
        type={option.price > 0 ? 'checkbox' : 'radio'}
      />
    </OptionWrapper>
  );
};

export default Option;

interface OptionWrapperProps {
  isSelected: boolean;
}
const OptionWrapper = styled.label`
  display: flex;
  padding: 15px 10px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--gallery);
  border-radius: 3px;
  border: ${(props: OptionWrapperProps) =>
    props.isSelected ? '1px solid var(--oxfordBlue)' : '1px solid trasparent'};
`;

interface PriceProps {
  isSelected: boolean;
}
const Price = styled.p`
  font-weight: ${(props: PriceProps) => (props.isSelected ? 'bold' : 'normal')};
  margin-top: 5px;
  color: ${(props: PriceProps) =>
    props.isSelected ? 'red' : 'var(--forestGreen)'};
`;
