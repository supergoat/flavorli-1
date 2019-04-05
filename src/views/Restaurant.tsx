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
  logo?: string;
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
    restaurant(where: {id: $restaurantId}) {
      id
      name
      logo
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
        const {logo, image, name, description, tags, menu} = restaurant;
        return (
          <>
            <Cover>
              {image && (
                <Image
                  src={require(`../assets/restaurants/${image}`)}
                  alt={name}
                />
              )}

              {logo && <Logo src={require(`../assets/logos/${logo}`)} />}
            </Cover>

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

            <Reviews>
              <Rating>
                <h1>4.1</h1>
                <p>203 reviews</p>
              </Rating>
              <Review>
                <Avatar />
                <Text>
                  "Very tasty food, friendly staff, sizeable portions and Greek
                  products."
                </Text>
              </Review>
              <Review>
                <Avatar />
                <Text>
                  "Good priced souvlaki - pita, fries and sauces are superb."
                </Text>
              </Review>
              <Review>
                <Avatar />
                <Text>
                  "Very friendly service and good location within Boxpark next
                  to Beatbox bar."
                </Text>
              </Review>
            </Reviews>

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
const Cover = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Logo = styled.img`
  position: absolute;
  bottom: -20px;
  right: 20px;
  height: 100px;
  border: 1px solid var(--gallery);
  background: var(--white);
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

const Reviews = styled.div`
  padding: 30px 10px;
  border-bottom: 1px solid var(--gallery);
  margin-bottom: 20px;
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 40px;
  }
`;

const Review = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: center;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  background: lightgrey;
  border-radius: 15px;
  margin-right: 10px;
`;

const Text = styled.p`
  font-weight: 300;
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
