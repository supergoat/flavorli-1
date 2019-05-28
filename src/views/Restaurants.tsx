import React from 'react';
import styled from 'styled-components/macro';
import {RouteComponentProps} from '@reach/router';
import Page from '../templates/Page';
import RestaurantItem from '../components/RestaurantItem';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

interface RestaurantType {
  id: number;
  name: string;
  image?: string;
  description: string;
  tags: string[];
}

const GET_RESTAURANTS = gql`
  {
    restaurants {
      id
      name
      image
      description
      tags
    }
  }
`;

interface Props extends RouteComponentProps {}
const RestaurantsView = (_: Props) => {
  return (
    <Query query={GET_RESTAURANTS}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <Page showNavbar>
            {data.restaurants.map((restaurant: RestaurantType) => (
              <RestaurantItem key={restaurant.id} restaurant={restaurant} />
            ))}
          </Page>
        );
      }}
    </Query>
  );
};

/* Export
============================================================================= */
export default RestaurantsView;

/* Styled Compoents
============================================================================= */
const NoOfRestaurants = styled.p`
  font-size: 14px;
  margin-bottom: 30px;
`;
