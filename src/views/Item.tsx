import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Item from '../components/Item';

const ADD_TO_ORDER = gql`
  mutation addToOrder(
    $restaurantName: String!
    $restaurantId: String!
    $orderItem: OrderItem!
  ) {
    addToOrder(
      restaurantName: $restaurantName
      restaurantId: $restaurantId
      orderItem: $orderItem
    ) @client
  }
`;

interface Props extends RouteComponentProps {
  item: any;
  onCloseItem: () => void;
  restaurantId: string;
  restaurantName: string;
}
const ItemView = ({item, onCloseItem, restaurantId, restaurantName}: Props) => {
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
            restaurantName={restaurantName}
          />
        );
      }}
    </Mutation>
  );
};

/*  Export
============================================================================= */
export default ItemView;
