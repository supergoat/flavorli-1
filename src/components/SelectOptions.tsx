import React, {useContext, Fragment} from 'react';
import Selection from './Selection';
import styled from 'styled-components/macro';
import {OptionsContext} from '../views/MenuItem';

interface Props {
  onSelection: (
    freeSelections: number,
    optionName: string,
    selection: {
      name: string;
      price: number;
    },
  ) => void;
}
const SelectOptions = ({onSelection}: Props) => {
  const options = useContext(OptionsContext);
  return (
    <>
      {options.default.map(option => (
        <Fragment key={option.name}>
          <Name>{option.name}</Name>

          {option.selections.map((selection: any) => (
            <Selection
              key={selection.name}
              freeSelections={option.freeSelections}
              optionName={option.name}
              selection={selection}
              onChange={() =>
                onSelection(option.freeSelections, option.name, selection)
              }
            />
          ))}
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
  margin: 15px 0;
  font-weight: bold;
`;
