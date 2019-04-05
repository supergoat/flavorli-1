import React, {Fragment} from 'react';
import styled from 'styled-components/macro';

interface Props {
  dietary?: string[];
}
const Dietary = ({dietary = []}: Props) => {
  return (
    <DietaryWrapper>
      {dietary.map(dietaryItem => {
        return (
          <Fragment key={dietaryItem}>
            {dietaryItem === 'vegan' && (
              <Icon src={require(`../assets/icons/plant.svg`)} />
            )}
            {dietaryItem === 'vegeterian' && (
              <Icon src={require(`../assets/icons/leaf.svg`)} />
            )}
            {dietaryItem === 'gluten-free' && (
              <Icon src={require(`../assets/icons/gluten-free.svg`)} />
            )}
            {(dietaryItem === 'dairy-free' || dietaryItem === 'vegan') && (
              <Icon src={require(`../assets/icons/dairy.svg`)} />
            )}
            {dietaryItem === 'halal' && (
              <Icon src={require(`../assets/icons/halal.svg`)} />
            )}
          </Fragment>
        );
      })}
    </DietaryWrapper>
  );
};

/* Export
============================================================================= */
export default Dietary;

/* Styled Components
============================================================================= */
const DietaryWrapper = styled.div`
  margin: 5px 0;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;
