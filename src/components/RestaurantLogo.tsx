import React from 'react';
import styled from 'styled-components';

interface Props {
  logo: string;
  name: string;
}

const RestaurantLogo = ({logo, name}: Props) => {
  return <>{logo && <RestaurantLogoWrapper src={logo} alt={name} />}</>;
};

export default RestaurantLogo;

const RestaurantLogoWrapper = styled.img`
  position: absolute;
  bottom: -20px;
  right: 20px;
  height: 100px;
`;
