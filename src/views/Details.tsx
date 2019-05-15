import React from 'react';
import gql from 'graphql-tag';
import {RouteComponentProps} from '@reach/router';
import {Query} from 'react-apollo';
import Details from '../components/Details';

export const GET_VIEWER = gql`
  query getViewer {
    me {
      id
      name
      email
      tel
    }
  }
`;

interface Props extends RouteComponentProps {}
const DetailsView = (_: Props) => {
  return (
    <Query query={GET_VIEWER}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const viewer = data.me;

        return <Details viewer={viewer} />;
      }}
    </Query>
  );
};

export default DetailsView;
