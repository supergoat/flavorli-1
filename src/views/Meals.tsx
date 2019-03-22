import React from 'react';
import styled from 'styled-components/macro';
import {Router, RouteComponentProps} from '@reach/router';
import MealList from '../components/MealList';
import MealView from './Meal';
import CheckOutFooter from '../components/CheckOutFooter';

interface Props extends RouteComponentProps {}
const Meals = (_: Props) => {
  return (
    <MealsWrapper>
      <MealList />
      <Router>
        <MealView path="/meal/:mealId" />
      </Router>
      <CheckOutFooter />
    </MealsWrapper>
  );
};

export default Meals;

/* Styled Components
============================================================================= */
const MealsWrapper = styled.div``;
