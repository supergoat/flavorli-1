import React from 'react';
import Category from './Category';

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
      {Object.keys(options).map((optionCategory, index) => (
        <Category
          key={index}
          categoryName={optionCategory}
          selectedOptions={selectedOptions}
          categoryOptions={options[optionCategory]}
          onSelectOption={onSelectOption}
        />
      ))}
    </>
  );
};

export default SelectOptions;
