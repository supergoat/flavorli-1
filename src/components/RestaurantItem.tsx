import React from 'react';
import styled from 'styled-components/macro';
import {navigate} from '@reach/router';
import Tags from './Tags';

interface Props {
  restaurant: {
    id: number;
    name: string;
    image?: string;
    description: string;
    tags: string[];
  };
}
const RestaurantItem = ({restaurant}: Props) => {
  const {name, image, description, tags} = restaurant;
  return (
    <RestaurantItemWrapper
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      <Name>{name}</Name>
      <Description>{description}</Description>
      <Tags tags={tags} margin="0 0 10px" />
      {image && <Image src={image} alt="" />}
    </RestaurantItemWrapper>
  );
};

/* Export
============================================================================= */
export default RestaurantItem;

/* Styled components
============================================================================= */
const RestaurantItemWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  cursor: pointer;
`;

const Name = styled.header`
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 12px;
  color: var(--osloGrey);
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 3px;
  object-fit: cover;
`;
