import React from 'react';
import {WindowLocation, RouteComponentProps, navigate} from '@reach/router';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import RegisterForm from '../Forms/RegisterForm';
import Page from '../templates/Page';

interface Props extends RouteComponentProps {
  location?: WindowLocation;
}

const RegisterView = ({location}: Props) => {
  const redirectTo = location && location.state && location.state.redirectTo;

  const onRegister = (token: string) => {
    localStorage.setItem('flavorli-token', token);
    navigate(redirectTo || '/');
  };

  return (
    <Page showNavbar>
      <Separator>
        <span>Create Account</span>
      </Separator>
      <SubHeading>Create an account</SubHeading>

      <RegisterForm onRegister={onRegister} />

      <Separator>
        <span>Login</span>
      </Separator>
      <SubHeading>Already have an account?</SubHeading>

      <Button secondary width="100%">
        Login
      </Button>
    </Page>
  );
};

export default RegisterView;

const SubHeading = styled.p`
  text-align: center;
  margin: 20px 0;
`;

const Separator = styled.h1`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin: 40px 0 20px;

  &:first-of-type {
    margin: 0;
    margin-bottom: 20px;
  }

  span {
    background: #fff;
    padding: 0 10px;
  }
`;
