import React from 'react';
import styled from 'styled-components/macro';
import Dietary from './Dietary';

interface Props {
  item: {
    name: string;
    description: string;
    price: number;
    image?: string;
    dietary?: string[];
  };
  onClick: () => void;
}
const MenuItem = ({item, onClick}: Props) => {
  const {name, description, price, image, dietary = []} = item;

  return (
    <Item onClick={onClick}>
      <div>
        <Name>{name}</Name>

        <Price>£{price}</Price>

        <Dietary dietary={dietary} />
        <Description>{description}</Description>
      </div>
      {image && <Image src={image} alt={name} />}
    </Item>
  );
};

/* Export
============================================================================= */
export default MenuItem;

/* Styled Components
============================================================================= */
const Item = styled.div`
  display: flex;
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
  text-transform: capitalize;
`;

const Description = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5em;
  font-weight: 300;
`;

const Image = styled.img`
  align-self: flex-start;
  width: 35%;
  border-radius: 3px;
  margin-left: 5px;
`;

const Price = styled.h4`
  font-size: 17px;
`;
