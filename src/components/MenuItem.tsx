import React, {Fragment} from 'react';
import styled from 'styled-components/macro';
import {navigate} from '@reach/router';

interface Props {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
    labels?: string[];
  };
}
const MenuItem = ({item}: Props) => {
  const {id, name, description, price, image, labels = []} = item;

  return (
    <Item onClick={() => navigate(`/restaurant/0/menu/item/${id}`)}>
      <Name>{name}</Name>

      <Price>
        &pound;
        {price.toFixed(2)}
      </Price>

      <Labels>
        {labels.map(label => {
          return (
            <Fragment key={label}>
              {label === 'vegan' && (
                <Icon src={require(`../assets/icons/plant.svg`)} />
              )}
              {label === 'vegeterian' && (
                <Icon src={require(`../assets/icons/leaf.svg`)} />
              )}
              {label === 'gluten-free' && (
                <Icon src={require(`../assets/icons/gluten-free.svg`)} />
              )}
              {(label === 'dairy-free' || label === 'vegan') && (
                <Icon src={require(`../assets/icons/dairy.svg`)} />
              )}
              {label === 'halal' && (
                <Icon src={require(`../assets/icons/halal.svg`)} />
              )}
            </Fragment>
          );
        })}
      </Labels>
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

const Labels = styled.div`
  margin: 5px 0;
`;

const Description = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 16px;
  color: var(--osloGrey);
  line-height: 1.5em;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 3px;
  object-fit: cover;
`;

const Price = styled.h4`
  font-size: 17px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;
