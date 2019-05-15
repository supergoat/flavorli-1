import {GET_ACTIVE_ORDER} from '../views/Order';

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

const resolvers = {
  Mutation: {
    addToOrder: (
      _: any,
      {
        restaurant,
        orderItem,
        force,
      }: {
        restaurant: RestaurantType;
        orderItem: OrderItemType;
        force?: boolean;
      },
      {cache}: {cache: any},
    ) => {
      const {activeOrder} = cache.readQuery({
        query: GET_ACTIVE_ORDER,
      });

      const isSameRestaurant = activeOrder.restaurant.id === restaurant.id;

      if (activeOrder.restaurant.id !== -1 && !isSameRestaurant && !force) {
        return {
          error: 'Cannot add order item from two different restaurants',
        };
      }

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

export default resolvers;
