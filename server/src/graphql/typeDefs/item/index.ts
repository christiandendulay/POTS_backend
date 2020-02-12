import { gql } from "apollo-server";

const typeDefs = gql`
  type Item {
    id: ID!
    itemNo: String!
    description: String!
    quantity: Float!
    uom: String!
    price: Float!
    currency: String!
    poid: String!
  }

  type Query {
    item(id: String): Item
    allItems: [Item]
  }

  type Mutation {
    createItem(item: ItemInput!): Item
    updateItem(item: UpdateItemInput!): Item
    deleteItem(id: ID!): Item
  }

  input ItemInput {
    itemNo: String!
    description: String!
    quantity: Float!
    uom: String!
    price: Float!
    currency: String!
    poid: String
  }

  input UpdateItemInput {
    id: ID!
    itemNo: String!
    description: String!
    quantity: Float!
    uom: String!
    price: Float!
    currency: String!
  }
`;

export default typeDefs;
