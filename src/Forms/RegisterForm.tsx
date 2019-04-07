import React, {useState, FormEvent} from 'react';
import gql from 'graphql-tag';
import {RouteComponentProps} from '@reach/router';
import {Mutation, MutationFn} from 'react-apollo';
import FAButton from '../ui/Button';
import Label from '../ui/Label';
import Input from '../ui/Input';
import styled from 'styled-components/macro';

const REGISTER = gql`
  mutation register(
    $email: String!
    $password: String!
    $name: String!
    $tel: String!
  ) {
    register(email: $email, password: $password, name: $name, tel: $tel) {
      token
    }
  }
`;

interface Props extends RouteComponentProps {
  onRegister: (token: string) => void;
}
const RegisterForm = ({onRegister}: Props) => {
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

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    register: MutationFn<
      any,
      {email: string; name: string; tel: string; password: string}
    >,
  ) => {
    e.preventDefault();

    // Do not submit form if its invalid
    if (!isFormValid()) return;

    register();
  };

  const clearError = (error: string) => {
    const copyErrors = new Set(errors);

    copyErrors.delete(error);

    setErrors(copyErrors);
  };

  return (
    <Mutation
      mutation={REGISTER}
      variables={{
        email,
        name,
        tel,
        password,
      }}
    >
      {(register, {loading, error, data}) => {
        if (data && data.register && data.register.token) {
          onRegister(data.register.token);
        }
        return (
          <>
            <form onSubmit={e => handleSubmit(e, register)}>
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
                  errors.has('email') ||
                  (error && error.message.includes('email'))
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
                  errors.has('email') ||
                  (error && error.message.includes('email'))
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

              <DetailsLabel
                hasError={errors.has('password')}
                htmlFor="password"
              >
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
                By creating an acount, you agree to our Terms and Conditions.
                Learn how we use your data to improve your experience in our
                Data Policy.
              </TermsAndConditions>
            </form>
          </>
        );
      }}
    </Mutation>
  );
};

export default RegisterForm;

/* Styled Components
============================================================================= */
const DetailsLabel = styled(Label)`
  font-size: 15px;
`;

const DetailsInput = styled(Input)`
  margin-bottom: 15px;
`;

const CreateAccountButton = styled(FAButton)`
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
