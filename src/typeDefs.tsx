import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    activeOrder: AcriveOrder!
  }

  type AcriveOrder {
    restaurantName: String
    restaurantId: String
    orderItems: [OrderItem]
    total: String
  }

  extend type Mutation {
    addToOrder(
      restaurantName: String!
      restaurantId: String!
      orderItem: OrderItem!
    ): AcriveOrder!
  }
`;

export default typeDefs;
