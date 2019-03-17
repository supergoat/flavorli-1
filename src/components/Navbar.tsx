import React, {useState, useEffect} from 'react';
import styled from 'styled-components/macro';
import {Link, navigate} from '@reach/router';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showMenu]);

  return (
    <>
      <NavbarWrapper>
        <LeftItem />

        <Title to="/">flavorli</Title>

        <RightItem onClick={() => setShowMenu(true)}>
          <img src={require('../assets/icons/list.svg')} alt="View Basket" />
        </RightItem>
      </NavbarWrapper>

      {showMenu && <BackDrop />}
      <Menu showMenu={showMenu}>
        <CloseButton onClick={() => setShowMenu(false)} />

        <Title to="/">flavorli</Title>

        <MenuItem
          onClick={() => {
            setShowMenu(false);
            navigate('/account');
          }}
        >
          Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowMenu(false);
            navigate('/orders');
          }}
        >
          Order History
        </MenuItem>
      </Menu>
    </>
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
  padding: 5px 20px;
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
  justify-content: flex-end;
  align-items: center;
  height: 60%;
  img {
    height: 100%;
  }
`;

const BackDrop = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
`;

interface MenuProps {
  showMenu: boolean;
}
const Menu = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  height: 100vh;
  background: var(--white);
  padding-top: 15px;
  box-shadow: -5px 0px 10px 1px rgba(0, 0, 0, 0.1);
  transition: transform 200ms;
  transform: ${(props: MenuProps) =>
    props.showMenu ? 'translateX(0)' : 'translateX(110%)'};
`;

const MenuItem = styled.div`
  border-bottom: 1px solid var(--gallery);
  padding: 20px 5px;
  margin: 0 15px 0 20px;
  font-weight: 300;
  text-align: right;
  cursor: default;

  &:last-of-type {
    border: none;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 25px;
  cursor: pointer;
  &:before {
    content: 'X';
  }
`;
