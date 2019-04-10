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
import RestaurantImage from '../components/RestaurantImage';
import RestaurantLogo from '../components/RestaurantLogo';

interface Props extends RouteComponentProps {
  restaurantId?: string;
}
const RestaurantView = ({restaurantId = '0'}: Props) => {
  return (
    <Query query={GET_RESTAURANT} variables={{restaurantId}}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const activeOrderRestaurant = data.activeOrder.restaurant;
        const {
          logo,
          image,
          name,
          tel,
          description,
          address,
          tags,
          menu,
        } = data.restaurant;

        return (
          <>
            <Cover>
              <RestaurantImage image={image} name={name} />
              <RestaurantLogo logo={logo} />
            </Cover>

            <Info>
              <Name>{name}</Name>
              <Description>{description}</Description>
              <Tags tags={tags} />
              <OpeningTimes />
              <Tel tel={tel} />
              <Address address={address} />
            </Info>

            <Reviews />

            <Menu
              restaurant={{...data.restaurant}}
              sections={menu.sections}
              activeOrderRestaurant={activeOrderRestaurant}
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
    activeOrder @client {
      restaurant {
        id
        name
      }
    }
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
      menu {
        sections {
          name
          items {
            id
            name
            description
            price
            image
            dietary
            options {
              name
              freeSelections
              description
              selections {
                name
                price
                selected
              }
            }
          }
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
