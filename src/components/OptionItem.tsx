import React from 'react';
import styled from 'styled-components/macro';
import Select from '../ui/Select';

interface Props {
  optionName: string;
  min: string;
  max: string;
  item: {
    name: string;
    price: number;
  };
  onChange: () => void;
  selected: {[name: string]: string[]};
}
const OptionItem = ({
  optionName,
  min,
  max,
  item,
  onChange,
  selected,
}: Props) => {
  const optionSelections = selected[optionName];
  const isSelected = optionSelections.includes(item.name);
  const showPrice = item.price !== 0;

  return (
    <Select
      onChange={onChange}
      checked={isSelected || false}
      name={optionName}
      type={min === '1' && max === '1' ? 'radio' : 'checkbox'}
    >
      <div>
        <Name>{item.name}</Name>
        {showPrice && (
          <Price isSelected={isSelected}>
            {isSelected ? '-' : '+'} £{item.price}
          </Price>
        )}
      </div>
    </Select>
  );
};

export default OptionItem;

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
