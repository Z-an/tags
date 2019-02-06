import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Tag {
    id: String!
    content: String!
    reacts: Int!
    ucb: Float!
    culled: Boolean!
    user: User!
    userId: String!
    merchantId: String!
  }

  type User {
    id: String!
    name: String!
    handle: String
    icon: String!
    banned: Boolean!
    tags: [Tag]!
  }

  type Merchant {
    id: String!
    name: String!
    url: String
    rho: Float!
    hrounds: Int!
    paramsId: String
    rewardsId: String
    tags: [Tag]!
  }

  type Reaction {
    userId: String!
    tagId: String!
    reactId: String!
    user: User!
  }

  type Query {
    user(id: String!): User
    tags: [Tag]
    merchant(id: String!): Merchant
  }

  type Mutation {
    react(userId: String!, tagId: String!, reactId: String!): Reaction
    createTag(userId: String!
      , merchantId: String!
      , content: String!
      , hrounds: Int!): Tag!
    addMerchant(name: String!): Merchant!
  }

  type Subscription {
    tagCreated(merchantId: String!): Tag!
    someoneReacted(tagId: String!): Reaction!
  }
`
