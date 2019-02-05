import * as admin from 'firebase-admin'

const serviceAccount = require('../service-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

import { ApolloServer, ApolloError, ValidationError, gql } from 'apollo-server'

interface User {
  id: string
  name: string
  handle: string
  icon: string
  banned: boolean
}

interface Tag {
  id: string
  content: string
  reacts: number
  ucb: number
  handle: string
  icon: string
  culled: boolean
  created: string
  userId: string
}

interface Merchant {
  id: string
  name: string
  url: string
  rho: number
  hrounds: number
  paramsId: string
  rewardsId: string
}

<<<<<<< HEAD
interface Reaction {
  id: string
  total: number
  reactors: [string]
}

=======
>>>>>>> 827615074cac1c44de2d1996913b8c113194fd93
const typeDefs = gql`

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

<<<<<<< HEAD
  type Reaction {
    id: String!
    total: Int!
    reactors: [String]!
  }

=======
>>>>>>> 827615074cac1c44de2d1996913b8c113194fd93
  type Query {
    user(id: String!): User
    tags: [Tag]
    merchant(id: String!): Merchant
  }

  type Mutation {
<<<<<<< HEAD
    react(userId: String!, tagId: String!, reactId: String!): Reaction
=======
>>>>>>> 827615074cac1c44de2d1996913b8c113194fd93
    createTag(userId: String!
      , merchantId: String!
      , content: String!
      , hrounds: Int!): Tag!
    addMerchant(name: String!): Merchant!
  }
`

const resolvers = {
  Query: {
    async tags() {
      const tags = await admin
        .firestore()
        .collection('tagsQL')
        .get()
      return tags.docs.map(tag => tag.data()) as Tag[];
    },
<<<<<<< HEAD

=======
>>>>>>> 827615074cac1c44de2d1996913b8c113194fd93
    async user(_: null, args: { id: string }) {
      try {
        const userDoc = await admin
          .firestore()
          .doc(`usersQL/${args.id}`)
          .get()
        const user = userDoc.data() as User | undefined;
        return user || new ValidationError('User ID not found')
      } catch (error) {
        throw new ApolloError(error)
      }
    },
<<<<<<< HEAD

=======
>>>>>>> 827615074cac1c44de2d1996913b8c113194fd93
    async merchant(_: null, args: { id: string }) {
      try {
        const merchantDoc = await admin
          .firestore()
          .doc(`merchantsQL/${args.id}`)
          .get()
        const merchant = merchantDoc.data() as Merchant | undefined
        return merchant || new ValidationError('Merchant ID not found')
      } catch (error) {
        throw new ApolloError(error)
      }
    }
  },

  Mutation: {
<<<<<<< HEAD
    async react(_: null, args: { userId: string
                              , tagId: string
                              , reactId: string }) {
      try {
        const reactDoc = await admin
          .firestore().collection("tagsQL")
          .doc(args.tagId).collection("reacts").doc(args.reactId)

        admin.firestore().runTransaction( transaction => {
          return transaction.get(reactDoc).then( react => {
            const data = react.data()
            const newTotal = data.total + 1
            const newReactors = data.reactors.concat([args.userId])
            transaction.update(reactDoc, { total: newTotal
                                          , reactors: newReactors})
          })
        })
        const reaction = await reactDoc.get()
        const reactData = reaction.data() as Reaction | undefined
        return reactData || new ValidationError('React failed')
      } catch (error) {
        throw new ApolloError(error)
      }
    },

    async createTag(_: null, args: { userId: string
                                  , merchantId: string
                                  , content: string
                                  , hrounds: number}) {
=======
    async createTag(_: null, args: {  userId: string
                                    , merchantId: string
                                    , content: string
                                    , hrounds: number}) {
>>>>>>> 827615074cac1c44de2d1996913b8c113194fd93
      try {
        const tagDoc = await admin
          .firestore()
          .collection("tagsQL")
<<<<<<< HEAD
          .add({ content: args.content
              , created: null
              , culled: false
              , merchantId: args.merchantId
              , userId: args.userId
              , ucb: Infinity
              , reacts: 0 })
        tagDoc.collection("reacts").doc("star").set({total: 0, ids: [null]})

        const newTag = await tagDoc.get()
        const id = newTag.id
        await tagDoc.update({id: id})

        const tagWithId = await tagDoc.get()
        const tag = tagWithId.data() as Tag | undefined

        return tag || new ValidationError('Tag creation failed')

=======
          .add({  content: args.content
                , created: null
                , culled: false
                , merchantId: args.merchantId
                , userId: args.userId
                , ucb: Infinity
                , reacts: 0 })
        const newTag = await tagDoc.get()
        const tag = newTag.data() as Tag | undefined
        return tag || new ValidationError('Tag creation failed')
>>>>>>> 827615074cac1c44de2d1996913b8c113194fd93
      } catch (error) {
        throw new ApolloError(error)
      }
    },
<<<<<<< HEAD

=======
>>>>>>> 827615074cac1c44de2d1996913b8c113194fd93
    async addMerchant(_: null, args: {name: string}) {
      try {
        const merchantDoc = await admin
          .firestore()
          .collection("merchantsQL")
          .add({name: args.name,
                hrounds: 1,
                rho: 0.8,
                url: null,
                paramsId: null,
                rewardsId: null})

        const newMerchant = await merchantDoc.get()
<<<<<<< HEAD
        const id = newMerchant.id
        await merchantDoc.update({id: id})

        const merchantWithId = await merchantDoc.get()
        const merchant = merchantWithId.data() as Merchant | undefined

        return merchant || new ValidationError('Merchant creation failed')

=======
        const merchant = newMerchant.data() as Merchant | undefined
        return merchant || new ValidationError('Merchant creation failed')
>>>>>>> 827615074cac1c44de2d1996913b8c113194fd93
      } catch (error) {
        throw new ApolloError(error)
      }
    }
  },

  User: {
    async tags(user) {
      try {
        const userTags = await admin
          .firestore()
          .collection('tagsQL')
          .where('userId', '==', user.id)
          .get()
        return userTags.docs.map(tag => tag.data()) as Tag[]
      } catch (error) {
        throw new ApolloError(error)
      }
    }
  },

  Tag: {
    async user(tag) {
      try {
        const tagAuthor = await admin
          .firestore()
          .doc(`usersQL/${tag.userId}`)
          .get()
        return tagAuthor.data() as User
      } catch (error) {
        throw new ApolloError(error)
      }
    }
  },

  Merchant: {
    async tags(merchant) {
      try {
        const merchantTags = await admin
          .firestore()
          .collection('tagsQL')
          .where('merchantId', '==', merchant.id)
          .where('culled', '==', false)
          .orderBy("ucb", "desc")
          .get()
        return merchantTags.docs.map(tag => tag.data()) as Tag[]
      } catch (error) {
        throw new ApolloError(error)
      }
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
<<<<<<< HEAD
  console.log(`Server ready at ${url}`)
=======
  console.log(`🚀  Server ready at ${url}`)
>>>>>>> 827615074cac1c44de2d1996913b8c113194fd93
})
