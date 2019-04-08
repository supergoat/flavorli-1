import React from 'react';
import gql from 'graphql-tag';
import {Mutation, ApolloConsumer} from 'react-apollo';
import {WindowLocation, RouteComponentProps, navigate} from '@reach/router';
import LoginForm from '../Forms/LoginForm';

interface Props extends RouteComponentProps {
  location?: WindowLocation;
}

const LOG_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = ({location}: Props) => {
  const redirectTo = location && location.state && location.state.redirectTo;

  const onLogin = () => {
    navigate(redirectTo || '/');
  };

  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={LOG_IN}
          onCompleted={({token}) => {
            localStorage.setItem('flavorli-token', token);
            client.writeData({data: {isLoggedIn: true}});
            onLogin();
          }}
        >
          {(login, {loading, error, data}) => {
            return <LoginForm login={login} error={error} loading={loading} />;
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  );
};

export default Login;
