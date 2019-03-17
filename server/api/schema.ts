import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Tag {
    id: String!
    content: String!
    reacts: Int!
    ucb: Float
    culled: Boolean!
    user: User!
    userId: String!
    merchantId: String!
    trounds: Int!
    recentReactors: [TagReactor]!
  }

  type User {
    id: String!
    name: String!
    handle: String
    icon: String!
    banned: Boolean!
    tags: [Tag]!
    facebookID: String
    googleID: String
    onFeed: String
  }

  type Merchant {
    id: String!
    name: String!
    url: String
    splash: [String]!
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
    unreact: Boolean!
  }

  type EmojiReactors {
    react: String!
    reactors: [String]!
    total: Int!
  }

  type TagReactor {
    reactId: String!
    userId: String!
  }

  type Report {
    userId: String!
    tagId: String!
    reportId: String!
    user: User!
  }

  type Query {
    user(id: String!): User
    tag(id: String!): Tag
    merchant(id: String!): Merchant

    merchantTags(id: String!): [Tag]!
    activeUsers(merchantId: String!): [User]!

    emojiReactors(tagId: String!): [EmojiReactors]
    tagReactors(tagId: String!): [TagReactor]
    tags: [Tag]
    merchants: [Merchant]
  }

  type Mutation {
    react(userId: String!, tagId: String!, merchantId: String!, reactId: String!, unreact: Boolean!): Reaction
    report(reportId: String!, tagId: String!, userId: String!): Report
    createTag(userId: String!, merchantId: String!, content: String!): Tag
    addMerchant(name: String!): Merchant!
    enterFeed(userId: String!, merchantId: String!): User
    signIn(ID: String!, name: String!, icon: String, authProvider: String): User
  }

  type Subscription {
    tagCreated(merchantId: String!): Tag!
    someoneReacted(tagId: String!, userId: String!): Reaction!
    newActive(merchantId: String!): User
  }
`
