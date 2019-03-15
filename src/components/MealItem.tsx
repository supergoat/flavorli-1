import React from 'react';
import styled from 'styled-components/macro';
import {Link} from '@reach/router';

interface Props {
  meal: {
    id: number;
    name: string;
    description: string;
    price: number;
  };
}
const MealItem = ({meal}: Props) => (
  <Meal to={`/meal/${meal.id}`}>
    <Name>{meal.name}</Name>
    <Description>{meal.description}</Description>
    <Price>
      &pound;
      {meal.price.toFixed(2)}
    </Price>
  </Meal>
);

export default MealItem;

/* Styled Components
============================================================================= */
const Meal = styled(Link)`
  border-bottom: 2px solid (--white);
  padding: 20px 10px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-tap-highlight-color: transparent;
  position: relative;
  &:last-of-type {
    border-bottom: none;
  }
`;

const Name = styled.h3`
  font-size: 18px;
  color: var(--oxfordBlue);
  font-weight: bold;
`;

const Description = styled.h4`
  padding: 10px 0;
  font-size: 16px;
  color: var(--osloGrey);
`;

const Price = styled.h4`
  font-size: 16px;
  color: var(--rollingStone);
  font-weight: bold;
`;
