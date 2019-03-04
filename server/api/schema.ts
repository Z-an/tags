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
    tround: Int!
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
    age: Int!
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

  type Reactors {
    react: String!
    reactors: [String]!
    total: Int!
  }

  type Query {
    user(id: String!): User
    tag(id: String!): Tag
    merchant(id: String!): Merchant

    merchantTags(id: String!): [Tag]!
    activeUsers(merchantId: String!): [User]!

    reactors(tagId: String!): [Reactors]
    tags: [Tag]
    merchants: [Merchant]
  }

  type Mutation {
    react(userId: String!, tagId: String!, merchantId: String!, reactId: String!): Reaction
    createTag(userId: String!, merchantId: String!, content: String!): Tag
    addMerchant(name: String!): Merchant!
    enterFeed(userId: String!, merchantId: String!): User
  }

  type Subscription {
    tagCreated(merchantId: String!): Tag!
    someoneReacted(tagId: String!, userId: String!): Reaction!
    newActive(merchantId: String!): User
  }
`
