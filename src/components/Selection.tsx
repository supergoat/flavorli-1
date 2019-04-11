import React, {useContext} from 'react';
import styled from 'styled-components/macro';
import {OptionsContext} from '../views/Item';
import Select from '../ui/Select';

interface Props {
  freeSelections: number;
  optionName: string;
  selection: {
    name: string;
    price: number;
  };
  onChange: () => void;
  selected: {[name: string]: string[]};
}
const Selection = ({
  freeSelections,
  optionName,
  selection,
  onChange,
  selected,
}: Props) => {
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
    <Select
      onChange={onChange}
      checked={isSelected || false}
      name={optionName}
      type={selection.price > 0 ? 'checkbox' : 'radio'}
    >
      <div>
        <Name>{selection.name}</Name>
        {showPrice && (
          <Price isSelected={isSelected}>
            {isSelected ? '-' : '+'} £{selection.price.toFixed(2)}
          </Price>
        )}
      </div>
    </Select>
  );
};

export default Selection;

interface PriceProps {
  isSelected: boolean;
}
const Name = styled.p`
  font-weight: 300;
`;

const Price = styled.p`
  font-weight: ${(props: PriceProps) => (props.isSelected ? 'bold' : 'normal')};
  margin-top: 5px;
`;
