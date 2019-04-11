import gql from 'graphql-tag';
import {GET_ACTIVE_ORDER} from './views/Order';

export const typeDefs = gql`
  extend type Query {
    activeOrder: AcriveOrder!
  }

  type AcriveOrder {
    restaurant: Restaurant
    items: [OrderItem]!
    total: Float
  }

  extend type Mutation {
    addToOrder(restaurant: Restaurant, orderItem: OrderItem!): AcriveOrder!
  }
`;

type RestaurantType = {
  id: number;
  name: string;
  address: {
    number: string;
    streetName: string;
    city: string;
    postalCode: string;
  };
  tel: string;
};

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
      {
        restaurant,
        orderItem,
      }: {restaurant: RestaurantType; orderItem: OrderItemType},
      {cache}: {cache: any},
    ) => {
      const {activeOrder} = cache.readQuery({
        query: GET_ACTIVE_ORDER,
      });

      const isSameRestaurant = activeOrder.restaurant.id === restaurant.id;
      const id = idIterator.next().value;

      const item = {
        __typename: 'OrderItem',
        id,
        ...orderItem,
      };

      const items = isSameRestaurant ? [...activeOrder.items, item] : [item];
      const total = isSameRestaurant
        ? activeOrder.total + orderItem.price
        : orderItem.price;

      const data = {
        activeOrder: {
          __typename: 'ActiveOrder',
          restaurant: {
            __typename: 'Restaurant',
            ...restaurant,
          },
          items,
          total,
        },
      };

      cache.writeQuery({query: GET_ACTIVE_ORDER, data});

      return {
        restaurant: data.activeOrder.restaurant,
        items: data.activeOrder.items,
        total: data.activeOrder.total,
      };
    },
  },
};
