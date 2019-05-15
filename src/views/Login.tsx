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
  const navigateTo = location && location.state && location.state.navigateTo;

  const onLogin = () => {
    navigate(navigateTo || '/');
  };

  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={LOG_IN}
          onCompleted={({login}) => {
            const {token} = login;
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
