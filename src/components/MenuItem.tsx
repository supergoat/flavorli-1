import React from 'react';
import styled from 'styled-components/macro';
import Dietary from './Dietary';
import {navigate} from '@reach/router';

interface Props {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
    dietary?: string[];
  };
}
const MenuItem = ({item}: Props) => {
  const {id, name, description, price, image, dietary = []} = item;

  return (
    <Item onClick={() => navigate(`/restaurant/0/menu/item/${id}`)}>
      <Name>{name}</Name>

      <Price>
        &pound;
        {price.toFixed(2)}
      </Price>

      <Dietary dietary={dietary} />
      <Description>{description}</Description>

      {image && <Image src={require(`../assets/items/${image}`)} alt={name} />}
    </Item>
  );
};

/* Export
============================================================================= */
export default MenuItem;

/* Styled Components
============================================================================= */
const Item = styled.div`
  padding: 20px 0;
  cursor: pointer;
  position: relative;
  margin: 0 10px;
`;

const Name = styled.h3`
  font-size: 18px;
  font-weight: 300;
  color: var(--oxfordBlue);
  margin-bottom: 5px;
`;

const Description = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5em;
  font-weight: 300;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 3px;
  object-fit: cover;
`;

const Price = styled.h4`
  font-size: 17px;
`;
