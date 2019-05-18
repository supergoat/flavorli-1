import {GET_ACTIVE_ORDER} from '../views/Order';

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
        restaurantId,
        restaurantName,
        orderItem,
        force,
      }: {
        restaurantId: string;
        restaurantName: string;
        orderItem: OrderItemType;
        force?: boolean;
      },
      {cache}: {cache: any},
    ) => {
      const {activeOrder} = cache.readQuery({
        query: GET_ACTIVE_ORDER,
      });

      const isSameRestaurant = activeOrder.restaurantId === restaurantId;

      if (activeOrder.restaurantId !== -1 && !isSameRestaurant && !force) {
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
        ? Number(activeOrder.total) + Number(orderItem.price)
        : orderItem.price;

      const data = {
        activeOrder: {
          __typename: 'ActiveOrder',
          restaurantId,
          restaurantName,
          items,
          total,
        },
      };

      cache.writeQuery({query: GET_ACTIVE_ORDER, data});

      return {
        restaurantId,
        restaurantName,
        items: data.activeOrder.items,
        total: data.activeOrder.total,
      };
    },
  },
};

export default resolvers;
