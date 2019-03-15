import React from 'react';
import styled from 'styled-components/macro';
import {Router, RouteComponentProps} from '@reach/router';
import MealList from '../components/MealList';
import MealView from './Meal';

interface Props extends RouteComponentProps {}
const Home = (_: Props) => {
  return (
    <HomeWrapper>
      <MealList />
      <Router>
        <MealView path="/meal/:mealId" />
      </Router>
      {/* {basket && <CheckOutFooter history={history} />} */}
    </HomeWrapper>
  );
};

export default Home;

/* Styled Components
============================================================================= */
const HomeWrapper = styled.div``;
