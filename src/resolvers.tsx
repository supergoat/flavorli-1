import gql from 'graphql-tag';
import {GET_ACTIVE_ORDER} from './views/Order';

export const typeDefs = gql`
  extend type Query {
    activeOrderItems: [OrderItem]!
    total: Float
  }

  extend type Mutation {
    addToOrder(orderItem: OrderItem!): Float
  }
`;

type OrderItemType = {
  name: string;
  selections: string[];
  price: number;
  quantity: number;
};

function* generateId() {
  let x = 0;
  while (true) yield x++;
}
const idIterator = generateId();

export const resolvers = {
  Mutation: {
    addToOrder: (
      _: any,
      {orderItem}: {orderItem: OrderItemType},
      {cache}: {cache: any},
    ) => {
      const {activeOrderItems, total} = cache.readQuery({
        query: GET_ACTIVE_ORDER,
      });
      const id = idIterator.next().value;
      const data = {
        activeOrderItems: [...activeOrderItems, {id, ...orderItem}],
        total: total + orderItem.price,
      };

      cache.writeQuery({query: GET_ACTIVE_ORDER, data});
      return data.total;
    },
  },
};
