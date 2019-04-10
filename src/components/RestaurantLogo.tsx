import React from 'react';
import styled from 'styled-components';

interface Props {
  logo?: string;
}

const RestaurantLogo = ({logo}: Props) => {
  return (
    <>
      {logo && (
        <RestaurantLogoWrapper src={require(`../assets/logos/${logo}`)} />
      )}
    </>
  );
};

export default RestaurantLogo;

const RestaurantLogoWrapper = styled.img`
  position: absolute;
  bottom: -20px;
  right: 20px;
  height: 100px;
`;
