import React from 'react';
import styled from 'styled-components/macro';
import {RouteComponentProps, navigate} from '@reach/router';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface Props extends RouteComponentProps {}
const Home = (_: Props) => {
  return (
    <HomeWrapper>
      <Cover>
        <Title>flavorli</Title>
        <Description>Buy homeade food from your neighbours</Description>

        <PostaCodeInput placeholder="Enter your postcode" />

        <Button secondary width="300px" onClick={() => navigate('/meals')}>
          Find Food Around You
        </Button>
      </Cover>

      <Copyright>Flavorli © {new Date().getFullYear()}</Copyright>
    </HomeWrapper>
  );
};

export default Home;

/* Styled Components
============================================================================= */
const HomeWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  padding: 20px;
  z-index: 1;
  background-image: linear-gradient(
    -20deg,
    var(--white) 40%,
    var(--oxfordBlue) 20px
  );
`;

const Cover = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 0;
`;

const Title = styled.div`
  display: flex;
  font-family: Pacifico;
  font-size: 35px;
  justify-content: center;
  cursor: default;
  color: var(--white);
`;

const Description = styled.p`
  text-align: center;
  font-size: 20px;
  margin: 30px 0;
  margin-bottom: 40px;
  width: 300px;
  color: var(--white);
`;

const PostaCodeInput = styled(Input)`
  width: 300px;
  margin-bottom: 12px;
  font-weight: 400;
`;

const Copyright = styled.span`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
`;
