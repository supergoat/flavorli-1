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
  register: MutationFn<
    any,
    {email: string; name: string; tel: string; password: string}
  >;
  loading: boolean;
  error: ApolloError | undefined;
  navigateTo: string;
}
const RegisterForm = ({register, loading, error}: Props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [errors, setErrors] = useState<Set<String>>(new Set());

  const isFormValid = () => {
    let errors: Set<String> = new Set();
    if (name.trim() === '') errors.add('name');

    if (email.trim() === '') errors.add('email');

    if (tel.trim() === '') errors.add('tel');

    if (password.trim() === '') errors.add('password');

    const isValid = errors.size === 0;
    setErrors(errors);

    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;
    register({variables: {email, name, tel, password}});
  };

  const clearError = (error: string) => {
    const copyErrors = new Set(errors);
    copyErrors.delete(error);
    setErrors(copyErrors);
  };

  return (
    <Page showNavbar>
      <Separator>
        <span>Create Account</span>
      </Separator>
      <SubHeading>Create an account</SubHeading>

      <form onSubmit={handleSubmit}>
        <DetailsLabel hasError={errors.has('name')} htmlFor="name">
          Name {errors.has('name') && ' - required'}
        </DetailsLabel>
        <DetailsInput
          hasError={errors.has('name')}
          id="name"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => {
            setName(e.currentTarget.value);
            clearError('name');
          }}
        />

        <DetailsLabel
          hasError={
            errors.has('email') || (error && error.message.includes('email'))
          }
          htmlFor="email"
        >
          Email {errors.has('email') && '- required'}
          {error &&
            error.message.includes('email') &&
            ' - has already been taken'}
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

        <DetailsLabel hasError={errors.has('tel')} htmlFor="tel">
          Mobile Phone {errors.has('tel') && '- required'}
        </DetailsLabel>
        <DetailsInput
          hasError={errors.has('tel')}
          id="tel"
          type="tel"
          placeholder="Mobile Phone"
          name="tel"
          value={tel}
          onChange={e => {
            setTel(e.currentTarget.value);
            clearError('tel');
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

        <CreateAccountButton type="submit">
          {loading ? 'Creating Account...' : 'Create Account'}
        </CreateAccountButton>

        <TermsAndConditions>
          By creating an acount, you agree to our Terms and Conditions. Learn
          how we use your data to improve your experience in our Data Policy.
        </TermsAndConditions>
      </form>
      <Separator>
        <span>Login</span>
      </Separator>
      <SubHeading>Already have an account?</SubHeading>

      <Button
        secondary
        width="100%"
        onClick={() => navigate('/login', {state: {navigateTo: '/checkout'}})}
      >
        Login
      </Button>
    </Page>
  );
};

export default RegisterForm;

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

const CreateAccountButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;

const TermsAndConditions = styled.p`
  color: var(--osloGrey);
  font-size: 14px;
  margin-top: 20px;
  margin-left: 5px;
  line-height: 1.4em;
`;
