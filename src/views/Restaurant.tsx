import React from 'react';
import styled from 'styled-components/macro';
import {Router, RouteComponentProps} from '@reach/router';
import Menu from '../components/Menu';
import ItemView from './Item';
import CheckOutFooter from '../components/CheckOutFooter';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

interface ItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  dietary?: string[];
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
}
interface RestaurantType {
  id: number;
  name: string;
  image?: string;
  description: string;
  tags: string[];
  menu: {
    name: string;
    items: [ItemType];
  }[];
}

const GET_RESTAURANT = gql`
  query GetRestaurant($restaurantId: ID!) {
    restaurant(id: $restaurantId) {
      id
      name
      image
      description
      tags
      menu {
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
`;

interface Props extends RouteComponentProps {
  restaurantId?: string;
}
const RestaurantView = ({restaurantId = '0'}: Props) => {
  return (
    <Query query={GET_RESTAURANT} variables={{restaurantId}}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const restaurant: RestaurantType = data.restaurant;
        const {image, name, description, tags, menu} = restaurant;
        return (
          <>
            {image && (
              <Image
                src={require(`../assets/restaurants/${image}`)}
                alt={name}
              />
            )}
            <Info>
              <Name>{name}</Name>
              <Description>{description}</Description>

              {tags.length > 0 && (
                <InfoItem>
                  <Icon
                    src={require('../assets/icons/tag.svg')}
                    alt="tag icon"
                  />

                  {tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </InfoItem>
              )}

              <InfoItem>
                <Icon
                  src={require('../assets/icons/time.svg')}
                  alt="time icon"
                />
                <p>11:30 - 22:30</p>
              </InfoItem>
              <InfoItem>
                <Icon
                  src={require('../assets/icons/tel.svg')}
                  alt="telephone icon"
                />
                <p> 07960778401</p>
              </InfoItem>
              <InfoItem>
                <Icon
                  src={require('../assets/icons/location.svg')}
                  alt="location icon"
                />
                <p> 7 Fermain Court North, De Beauvoir Road, London, N15SX</p>
              </InfoItem>
            </Info>

            <Menu menu={menu} />
            <Router>
              <ItemView path="/menu/item/:itemId" />
            </Router>
            <CheckOutFooter />
          </>
        );
      }}
    </Query>
  );
};

/* Export
============================================================================= */
export default RestaurantView;

/* Styled Compoents
============================================================================= */
const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Name = styled.h1`
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 10px;
  line-height: 1.5em;
`;

const Info = styled.div`
  padding: 30px 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--gallery);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px 0;

  p {
    font-size: 11px;
    text-transform: uppercase;
  }
`;

const Tag = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  margin-right: 5px;

  :after {
    content: ',';
  }

  :last-of-type:after {
    content: '';
  }
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;
