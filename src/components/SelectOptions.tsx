import React from 'react';
import Option from './Option';
import styled from 'styled-components/macro';

interface Props {
  selectedOptions: {
    [category: string]: string[];
  };
  options: {
    [category: string]: {
      name: string;
      price: number;
    }[];
  };
  onSelectOption: (option: {
    categoryName: string;
    name: string;
    price: number;
  }) => void;
}
const SelectOptions = ({selectedOptions, options, onSelectOption}: Props) => {
  return (
    <>
      {Object.keys(options).map((categoryName, index) => (
        <>
          <Name>{categoryName}</Name>
          {options[categoryName].map((option, index) => {
            const isSelected =
              selectedOptions[categoryName] &&
              selectedOptions[categoryName].includes(option.name);
            return (
              <Option
                key={index}
                option={{categoryName, ...option}}
                isSelected={isSelected}
                onClick={() => onSelectOption({categoryName, ...option})}
              />
            );
          })}
        </>
      ))}
    </>
  );
};

export default SelectOptions;

const Name = styled.h4`
  margin: 15px 0;
  font-weight: bold;
`;
