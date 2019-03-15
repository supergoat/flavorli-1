import React from 'react';
import styled from 'styled-components';
import {Link} from '@reach/router';

const Navbar = () => {
  return (
    <NavbarWrapper>
      <LeftItem />

      <Title to="/">flavorli</Title>

      <RightItem />
    </NavbarWrapper>
  );
};

export default Navbar;

/* Styled Components
============================================================================= */
const NavbarWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100%;
  border-bottom: 1px solid var(--alabaster);
  padding: 5px;
  background: var(--white);
  opacity: 0.95;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
`;

const LeftItem = styled.div`
  display: flex;
  flex: 0.2;
  justify-content: center;
`;

const Title = styled(Link)`
  display: flex;
  font-family: Pacifico;
  font-size: 22px;
  flex: auto;
  justify-content: center;
`;

const RightItem = styled.div`
  display: flex;
  flex: 0.2;
  justify-content: center;
`;
