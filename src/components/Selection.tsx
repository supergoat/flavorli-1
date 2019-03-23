import React, {useContext} from 'react';
import styled from 'styled-components/macro';
import {OptionsContext} from '../views/Meal';

interface Props {
  freeSelections: number;
  optionName: string;
  selection: {
    name: string;
    price: number;
  };
  onChange: () => void;
}
const Selection = ({
  freeSelections,
  optionName,
  selection,
  onChange,
}: Props) => {
  const {selected} = useContext(OptionsContext);
  const optionSelections = selected[optionName];

  const isSelected = optionSelections.includes(selection.name);
  const isIncluded = selection.price === 0;
  const hasFreeSelections = freeSelections > optionSelections.length;
  const doesNotHaveFreeSelections = freeSelections < optionSelections.length;
  const isFreeSelection = hasFreeSelections && !isSelected;
  const isNotFreeSelection =
    (!isSelected && !hasFreeSelections) || doesNotHaveFreeSelections;

  const showPrice = !isIncluded && !isFreeSelection && isNotFreeSelection;

  return (
    <SelectionWrapper isSelected={isSelected}>
      <div>
        <p>{selection.name}</p>
        {showPrice && (
          <Price isSelected={isSelected}>
            {isSelected ? '-' : '+'} £{selection.price.toFixed(2)}
          </Price>
        )}
      </div>

      <input
        onChange={onChange}
        checked={isSelected || false}
        name={optionName}
        type={selection.price > 0 ? 'checkbox' : 'radio'}
      />
    </SelectionWrapper>
  );
};

export default Selection;

interface SelectionWrapperProps {
  isSelected: boolean;
}
const SelectionWrapper = styled.label`
  display: flex;
  padding: 15px 10px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--gallery);
  border-radius: 3px;
  border: ${(props: SelectionWrapperProps) =>
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
