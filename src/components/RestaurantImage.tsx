import React from 'react';
import styled from 'styled-components/macro';

interface Props {
  image: string;
  name: string;
}
const RestaurantImage = ({image, name}: Props) => {
  return <>{image && <Image src={image} alt={name} />}</>;
};
export default RestaurantImage;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;
