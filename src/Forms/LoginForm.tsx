import React, {useState, FormEvent} from 'react';
import {RouteComponentProps, navigate} from '@reach/router';
import {MutationFn} from 'react-apollo';
import {ApolloError} from 'apollo-client';
import Page from '../templates/Page';

import Button from '../ui/Button';
import Label from '../ui/Label';
import Input from '../ui/Input';
import styled from 'styled-components/macro';

interface Props extends RouteComponentProps {
  login: MutationFn<any, {email: string; password: string}>;
  loading: boolean;
  error: ApolloError | undefined;
}
const LoginForm = ({login, loading, error}: Props) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Set<String>>(new Set());

  const isFormValid = () => {
    let errors: Set<String> = new Set();

    if (email.trim() === '') errors.add('email');

    if (password.trim() === '') errors.add('password');

    const isValid = errors.size === 0;
    setErrors(errors);

    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;
    login({variables: {email, password}});
  };

  const clearError = (error: string) => {
    const copyErrors = new Set(errors);
    copyErrors.delete(error);
    setErrors(copyErrors);
  };

  return (
    <Page showNavbar>
      <Separator>
        <span>Log In</span>
      </Separator>
      <SubHeading>Log In</SubHeading>

      <form onSubmit={handleSubmit}>
        <DetailsLabel
          hasError={
            errors.has('email') || (error && error.message.includes('email'))
          }
          htmlFor="email"
        >
          Email {errors.has('email') && '- required'}
        </DetailsLabel>
        <DetailsInput
          hasError={
            errors.has('email') || (error && error.message.includes('email'))
          }
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => {
            setEmail(e.currentTarget.value);
            clearError('email');
          }}
        />

        <DetailsLabel hasError={errors.has('password')} htmlFor="password">
          Password {errors.has('password') && '- required'}
        </DetailsLabel>
        <DetailsInput
          hasError={errors.has('password')}
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => {
            setPassword(e.currentTarget.value);
            clearError('password');
          }}
        />

        <LoginButton type="submit">
          {loading ? 'Loging in...' : 'Log In'}
        </LoginButton>
      </form>

      <Separator>
        <span>Create Account</span>
      </Separator>

      <SubHeading>Don't have an account?</SubHeading>

      <Button secondary width="100%" onClick={() => navigate('/register')}>
        Create Account
      </Button>
    </Page>
  );
};

export default LoginForm;

/* Styled Components
============================================================================= */
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

const DetailsLabel = styled(Label)`
  font-size: 15px;
`;

const DetailsInput = styled(Input)`
  margin-bottom: 15px;
`;

const LoginButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;
