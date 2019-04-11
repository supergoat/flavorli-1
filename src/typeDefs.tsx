import gql from 'graphql-tag';

const typeDefs = gql`
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

export default typeDefs;
