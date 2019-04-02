import React from 'react';
import {RouteComponentProps, navigate} from '@reach/router';
import Tile from '../ui/Tile';
import Page from '../templates/Page';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      name
      email
      tel
    }
  }
`;

interface Props extends RouteComponentProps {}
const Account = (_: Props) => {
  return (
    <Query query={GET_USER} variables={{id: '1'}}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <Page heading="Account" showNavbar>
            <Tile
              onClick={() => navigate('/details')}
              heading={data.user.name}
              subHeading={
                <>
                  <p>{data.user.email}</p>
                  <p>{data.user.tel}</p>
                </>
              }
              cta={'Change Details'}
            />

            <Tile
              onClick={() => navigate('/details')}
              heading={'American Express'}
              subHeading={'Ending 0000'}
              cta={'Change Payment'}
            />
          </Page>
        );
      }}
    </Query>
  );
};

export default Account;
