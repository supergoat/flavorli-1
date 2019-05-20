import {GET_ACTIVE_ORDER} from '../views/Order';

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
        orderItem,
      }: {
        restaurantId: string;
        orderItem: any;
      },
      {cache}: {cache: any},
    ) => {
      const {activeOrder} = cache.readQuery({
        query: GET_ACTIVE_ORDER,
      });

      const isSameRestaurant = activeOrder.restaurantId === restaurantId;

      const id = idIterator.next().value;

      const item = {
        __typename: 'OrderItem',
        id,
        name: orderItem.name,
        price: orderItem.price,
        total: orderItem.total,
        quantity: orderItem.quantity,
        options: orderItem.options.map((option: any) => ({
          __typename: 'OrderItemOption',
          name: option.name,
          items: option.items.map((item: any) => ({
            __typename: 'OrderItemOptionItem',
            name: item.name,
            price: item.price,
          })),
        })),
      };

      const orderItems = isSameRestaurant
        ? [...activeOrder.orderItems, item]
        : [item];
      const total = isSameRestaurant
        ? Number(activeOrder.total) + Number(orderItem.price)
        : orderItem.price;

      const data = {
        activeOrder: {
          __typename: 'ActiveOrder',
          restaurantId,
          orderItems,
          total,
        },
      };

      cache.writeQuery({query: GET_ACTIVE_ORDER, data});

      return {
        restaurantId,
        orderItems: data.activeOrder.orderItems,
        total: data.activeOrder.total,
      };
    },
  },
};

export default resolvers;
