import React from 'react';
import styled from 'styled-components/macro';
import {Router, RouteComponentProps} from '@reach/router';
import MealList from '../components/MealList';
import MealView from './Meal';
import CheckOutFooter from '../components/CheckOutFooter';

interface Props extends RouteComponentProps {}
const Home = (_: Props) => {
  return (
    <HomeWrapper>
      <MealList />
      <Router>
        <MealView path="/meal/:mealId" />
      </Router>
      <CheckOutFooter noOfBasketItems={1} />
    </HomeWrapper>
  );
};

export default Home;

/* Styled Components
============================================================================= */
const HomeWrapper = styled.div``;
