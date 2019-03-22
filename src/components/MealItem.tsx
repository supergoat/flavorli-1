import React from 'react';
import styled from 'styled-components/macro';
import {navigate} from '@reach/router';

interface Props {
  meal: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };
}
const MealItem = ({meal}: Props) => (
  <Meal
    onClick={() => navigate(`/meals/meal/${meal.id}`)}
    backgroundImage={require(`../assets/meals/${meal.image}`)}
  >
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
const Meal = styled.div`
  border-bottom: 2px solid var(--white);
  padding: 20px 10px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-tap-highlight-color: transparent;
  position: relative;
  &:last-of-type {
    border-bottom: none;
  }
  &:after {
    content: '';
    background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 45%,
        rgba(255, 255, 255, 0.8) 100%
      ),
      url(${(props: {backgroundImage: string}) => props.backgroundImage});
    background-size: cover;
    background-position: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
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
