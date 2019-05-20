import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Item from '../components/Item';

const ADD_TO_ORDER = gql`
  mutation addToOrder($restaurantId: String!, $orderItem: OrderItem!) {
    addToOrder(restaurantId: $restaurantId, orderItem: $orderItem) @client
  }
`;

interface Props extends RouteComponentProps {
  item: any;
  onCloseItem: () => void;
  restaurantId: string;
}
const ItemView = ({item, onCloseItem, restaurantId}: Props) => {
  return (
    <Mutation mutation={ADD_TO_ORDER} onCompleted={() => onCloseItem()}>
      {(addToOrder, {loading, error}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>An error occurred</p>;

        return (
          <Item
            item={item}
            onCancel={onCloseItem}
            addToOrder={addToOrder}
            restaurantId={restaurantId}
          />
        );
      }}
    </Mutation>
  );
};

/*  Export
============================================================================= */
export default ItemView;
