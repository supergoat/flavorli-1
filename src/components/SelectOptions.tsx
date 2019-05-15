import React, {Fragment, Dispatch} from 'react';
import OptionItem from './OptionItem';
import styled from 'styled-components/macro';

interface Props {
  dispatch: Dispatch<any>;
  options: {
    name: string;
    min: string;
    max: string;
    items: {
      name: string;
      price: number;
    }[];
  }[];
  selected: {[name: string]: string[]};
  state: any;
}
const SelectOptions = ({options, selected, state, dispatch}: Props) => {
  const onSelection = (
    optionName: string,
    min: string,
    max: string,
    item: {
      name: string;
      price: number;
    },
  ) => {
    const optionItems = state.options[optionName];
    const isSelected = optionItems.includes(item.name);
    const type = !isSelected ? 'ADD_SELECTION' : 'REMOVE_SELECTION';

    dispatch({type, optionName, min, max, ...item});
  };

  const getChoices = (min: any, max: any) => {
    min = Number(min);
    max = Number(max);
    if (min === 1 && max === 1) return 'Choose One';

    if (min > 0 && !max) return `Choose alteast ${min}`;
    if (min > 0 && max > 0) return `Choose between ${min} and ${min}`;
  };

  return (
    <>
      {options.map(option => (
        <Fragment key={option.name}>
          <Name>{option.name}</Name>
          {getChoices(option.min, option.max)}

          <OptionItems>
            {option.items.map((item: any) => (
              <OptionItem
                key={item.name}
                selected={selected}
                optionName={option.name}
                min={option.min}
                max={option.max}
                item={item}
                onChange={() =>
                  onSelection(option.name, option.min, option.max, item)
                }
              />
            ))}
          </OptionItems>
        </Fragment>
      ))}
    </>
  );
};

/* Export
============================================================================= */
export default SelectOptions;

/* Styled Components
============================================================================= */
const Name = styled.h4`
  margin-top: 15px;
`;

const OptionItems = styled.div`
  margin-top: 15px;
`;
