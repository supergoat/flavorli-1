import React from 'react';
import gql from 'graphql-tag';
import {Mutation, ApolloConsumer} from 'react-apollo';
import {WindowLocation, RouteComponentProps, navigate} from '@reach/router';
import RegisterForm from '../Forms/RegisterForm';

interface Props extends RouteComponentProps {
  location?: WindowLocation;
}

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

const RegisterView = ({location}: Props) => {
  const redirectTo = location && location.state && location.state.redirectTo;

  const onRegister = () => {
    navigate(redirectTo || '/');
  };

  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={REGISTER}
          onCompleted={({token}) => {
            localStorage.setItem('flavorli-token', token);
            client.writeData({data: {isLoggedIn: true}});
            onRegister();
          }}
        >
          {(register, {loading, error, data}) => {
            return (
              <RegisterForm
                register={register}
                error={error}
                loading={loading}
              />
            );
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  );
};

export default RegisterView;
