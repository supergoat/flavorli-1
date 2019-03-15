import React from 'react';
import Option from './Option';
import styled from 'styled-components/macro';

interface Props {
  categoryName: string;
  selectedOptions: {
    [category: string]: string[];
  };
  categoryOptions: {
    name: string;
    price: number;
  }[];
  onSelectOption: (option: {
    categoryName: string;
    name: string;
    price: number;
  }) => void;
}
const Category = ({
  selectedOptions,
  categoryName,
  categoryOptions,
  onSelectOption,
}: Props) => {
  return (
    <>
      <Name>{categoryName}</Name>
      {categoryOptions.map((option, index) => {
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
  );
};

export default Category;

const Name = styled.h4`
  margin: 15px 0;
  font-weight: bold;
`;
