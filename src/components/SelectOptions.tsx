import React, {Fragment} from 'react';
import Selection from './Selection';
import styled from 'styled-components/macro';

interface Props {
  onSelection: (
    freeSelections: number,
    optionName: string,
    selection: {
      name: string;
      price: number;
    },
  ) => void;
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
}
const SelectOptions = ({onSelection, options, selected}: Props) => {
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
