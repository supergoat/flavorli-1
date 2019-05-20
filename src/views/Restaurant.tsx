import React from 'react';
import styled from 'styled-components/macro';
import {RouteComponentProps} from '@reach/router';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import Reviews from '../components/Reviews';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import Tags from '../components/Tags';
import OpeningTimes from '../components/OpeningTimes';
import Tel from '../components/Tel';
import Address from '../components/Address';

interface Props extends RouteComponentProps {
  restaurantId?: string;
}
const RestaurantView = ({restaurantId = '0'}: Props) => {
  return (
    <Query query={GET_RESTAURANT} variables={{restaurantId}}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const {
          logo,
          image,
          name,
          tel,
          description,
          address,
          tags,
          menus,
        } = data.restaurant;

        const menu = menus[0];

        return (
          <>
            <Cover>
              {image && <RestaurantImage src={image} alt={name} />}
              {logo && <RestaurantLogo src={logo} alt={name} />}
            </Cover>

            <Info>
              <Name>{name}</Name>
              <Description>{description}</Description>
              <Tags tags={tags} margin="5px 0" />
              <OpeningTimes />
              <Tel tel={tel} />
              <Address address={address} />
            </Info>

            <Reviews />

            <Menu
              categories={menu.categories}
              restaurantId={menu.restaurant.id}
            />
            <Footer />
          </>
        );
      }}
    </Query>
  );
};

/* Export
============================================================================= */
export default RestaurantView;

/* Queries
============================================================================= */
const GET_RESTAURANT = gql`
  query GetRestaurant($restaurantId: ID!) {
    restaurant(where: {id: $restaurantId}) {
      id
      name
      logo
      image
      description
      address {
        number
        streetName
        city
        postalCode
      }
      tel
      tags
      menus {
        categories {
          name
          items {
            id
            name
            description
            price
            image
            dietary
            options {
              id
              name
              min
              max
              items {
                id
                name
                price
              }
            }
          }
        }
        restaurant {
          id
        }
      }
    }
  }
`;

/* Styled Compoents
============================================================================= */
const Cover = styled.div`
  position: relative;
`;

const RestaurantImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RestaurantLogo = styled.img`
  position: absolute;
  bottom: -20px;
  right: 20px;
  height: 100px;
`;

const Name = styled.h1`
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Description = styled.p`
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 10px;
  line-height: 1.5em;
  text-transform: uppercase;
`;

const Info = styled.div`
  padding: 30px 10px;
  border-bottom: 1px solid var(--gallery);
`;
