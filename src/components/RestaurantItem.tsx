import React from 'react';
import styled from 'styled-components/macro';
import {navigate} from '@reach/router';

interface Props {
  restaurant: {
    name: string;
    image: string;
    description: string;
    tags: string[];
  };
}
const RestaurantItem = ({restaurant}: Props) => {
  const {name, image, description, tags} = restaurant;
  return (
    <RestaurantItemWrapper onClick={() => navigate('/meals')}>
      <Name>{name}</Name>
      <Description>{description}</Description>
      {tags.length > 0 && (
        <Tags>
          <TagIcon src={require('../assets/icons/tag.svg')} alt="tag icon" />
          {tags.map(tag => (
            <li>{tag}</li>
          ))}
        </Tags>
      )}
      <Image src={require(`../assets/restaurants/${image}`)} alt="" />
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

const Name = styled.h4`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Description = styled.p`
  font-size: 12px;
  color: var(--osloGrey);
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  line-clamp: 1;

  li {
    font-size: 10px;
    text-transform: uppercase;
    margin-right: 5px;
  }

  li:after {
    content: ',';
  }

  li:last-of-type:after {
    content: '';
  }
`;

const TagIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 3px;
  object-fit: cover;
  background: blue;
`;
