import React, {Fragment, Dispatch} from 'react';
import Selection from './Selection';
import styled from 'styled-components/macro';

interface Props {
  dispatch: Dispatch<any>;
  options: {
    name: string;
    freeSelections: number;
    description?: string;
    selections: {
      name: string;
      price: number;
      selected?: boolean;
    }[];
  }[];
  selected: {[name: string]: string[]};
  state: any;
}
const SelectOptions = ({options, selected, state, dispatch}: Props) => {
  const onSelection = (
    freeSelections: number,
    optionName: string,
    selection: {
      name: string;
      price: number;
    },
  ) => {
    const optionSelections = state.options[optionName];
    const isSelected = optionSelections.includes(selection.name);
    const type = !isSelected ? 'ADD_SELECTION' : 'REMOVE_SELECTION';

    dispatch({type, freeSelections, optionName, ...selection});
  };

  return (
    <>
      {options.map(option => (
        <Fragment key={option.name}>
          <Name>{option.name}</Name>
          {option.description && (
            <Description>{option.description}</Description>
          )}

          <Selections>
            {option.selections.map((selection: any) => (
              <Selection
                key={selection.name}
                selected={selected}
                freeSelections={option.freeSelections}
                optionName={option.name}
                selection={selection}
                onChange={() =>
                  onSelection(option.freeSelections, option.name, selection)
                }
              />
            ))}
          </Selections>
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

const Description = styled.p`
  margin: 5px 0;
  color: var(--osloGrey);
`;

const Selections = styled.div`
  margin-top: 15px;
`;
