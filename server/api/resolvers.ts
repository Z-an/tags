import {ApolloError, ValidationError, UserInputError, PubSub, withFilter } from 'apollo-server'

import * as admin from 'firebase-admin'

import './types'

import { lapseMerchant, updateUCB, updateReacts, duplicate } from '../cloud/functions'

const pubsub = new PubSub()

const TAG_CREATED = 'TAG_CREATED'
const NEW_REACT = 'NEW_REACT'
const NEW_ACTIVE = 'NEW_ACTIVE'
const NEW_REPORT = 'NEW_REPORT'

export const resolvers = {
  Subscription: {

    tagCreated: {
      resolve: (payload) => payload.newTag,
      subscribe: withFilter(
        () => pubsub.asyncIterator(TAG_CREATED),
          (payload, variables) => {
            return payload.newTag.merchantId === variables.merchantId
        }
      )
    },

    someoneReacted: {
      resolve: (payload) => payload.reaction,
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_REACT),
          (payload, variables) => {
            return (payload.reaction.tagId === variables.tagId) && (payload.reaction.userId !== variables.userId)
          }
      )
    },

    /*newActive: {
      resolve: (payload) => payload.user,
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_ACTIVE),
          (payload, variables) => {
          }
      )
    }*/
  },

  Query: {
    async tags() {
      const tags = await admin
        .firestore()
        .collection('tagsQL')
        .get()
      return tags.docs.map(tag => tag.data()) as Tag[];
    },

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
    },

    async merchantTags(_: null, args: {id: string}) {
      try {
        const merchantTags = await admin
          .firestore()
          .collection('tagsQL')
          .where('merchantId', '==', args.id)
          .where('culled', '==', false)
          .orderBy("ucb", "desc")
          .get()
        return merchantTags.docs.map(tag => tag.data()) as Tag[]
      } catch (error) {
        throw new ApolloError(error)
      }
    },

    async merchants() {
      const merchants = await admin
        .firestore()
        .collection('merchantsQL')
        .get()
      return merchants.docs.map(merchant => merchant.data()) as Merchant[]
    },

    async tag(_: null, args: {id: string}) {
      try {
        const tagDoc = await admin
          .firestore()
          .doc(`tagsQL/${args.id}`)
          .get()
        const tag = tagDoc.data() as Tag | undefined
        return tag || new ValidationError('Tag ID not found')
      } catch (error) {
        throw new ApolloError(error)
      }
    },

    async user(_: null, args: { id: string }) {
      console.log('yare yare')
      try {
        const userDoc = await admin
          .firestore()
          .doc(`usersQL/${args.id}`)
          .get()
        const user = userDoc.data() as User | undefined
        return user || new ValidationError('User ID not found')
      } catch (error) {
        throw new ApolloError(error)
      }
    },

    async activeUsers(_: null, args: {merchantId: string}) {
      try {
        const activeUsers = await admin
          .firestore()
          .collection('usersQL')
          .where('onFeed', '==', args.merchantId)
          .get()
        return activeUsers.docs.map(user => user.data()) as User[]
      } catch (error) {
        throw new ApolloError(error)
      }
    },

    async reactors(_: null, args: {tagId: string}) {
      console.log('yare yare')
      try {
        const reactsCol = await admin
          .firestore()
          .collection(`tagsQL/${args.tagId}/reacts`)
          .get()

        const reactors = reactsCol.docs.map(react => 
          ({react: react.id
          , reactors: react.data().reactors
          , total: react.data().total})) as Reactors[]

        var reactTotal = reactors.reduce(function(prev, cur) {
          return prev + cur.total
        }, 0)

        return reactors
      } catch (error) {
        throw new ApolloError(error)
      }
    }
  },

  Mutation: {
    async react(_: null, args: { userId: string
                              , tagId: string
                              , merchantId: string
                              , reactId: string
                              , unreact: boolean }) {
      try {
        const reactDoc = await admin
          .firestore().collection("tagsQL")
          .doc(args.tagId).collection("reacts").doc(args.reactId)

// tslint:disable-next-line: no-floating-promises
        admin.firestore().runTransaction( transaction => {
          return transaction.get(reactDoc).then( react => {
            const data = react.data()
            const newTotal = data.total + 1
            const newReactors = data.reactors.concat([args.userId])

            const reaction = {tagId: args.tagId
                            , reactId: args.reactId
                            , userId: args.userId} as Reaction | undefined

            pubsub.publish(NEW_REACT, {reaction: reaction})
            
            args.unreact? updateReacts(args.tagId, -1):updateReacts(args.tagId, 1)

            lapseMerchant(args.merchantId)
            updateUCB(args.merchantId)
            
            return transaction.update(reactDoc, {total: newTotal
                                              , reactors: newReactors})
          })
        })
      } catch (error) {
        throw new ApolloError(error)
      }
    },

    async createTag(_: null, args: { userId: string
                                  , merchantId: string
                                  , content: string}) {
                                    
      const verdict = await duplicate(args.content,args.merchantId)
      if (verdict.outcome === true) {
        return new UserInputError('Tag not unique', {match: verdict.tag} )
      }

      const merchant = await admin.firestore().collection("merchantsQL").doc(args.merchantId).get()
      const age = merchant.data().age

      try {
        const tagDoc = await admin
          .firestore()
          .collection("tagsQL")
          .add({ content: args.content
              , created: null
              , culled: false
              , merchantId: args.merchantId
              , userId: args.userId
              , ucb: Infinity
              , reacts: 0
              , trounds: age })
        tagDoc.collection("reacts").doc("fire").set({total: 0, reactors: [null]})
        tagDoc.collection("reacts").doc("tongue").set({total: 0, reactors: [null]})
        tagDoc.collection("reacts").doc("heart-eyes").set({total: 0, reactors: [null]})
        tagDoc.collection("reacts").doc("shock").set({total: 0, reactors: [null]})
        tagDoc.collection("reacts").doc("sleep").set({total: 0, reactors: [null]})
        tagDoc.collection("reacts").doc("cry").set({total: 0, reactors: [null]})
        tagDoc.collection("reacts").doc("angry").set({total: 0, reactors: [null]})

        tagDoc.collection("reports").doc("abuse").set({total: 0, reporters: [null]})
        tagDoc.collection("reports").doc("duplicacy").set({total: 0, reporters: [null]})
        tagDoc.collection("reports").doc("inaccuracy").set({total: 0, reporters: [null]})
        

        const newTag = await tagDoc.get()
        const id = newTag.id
        await tagDoc.update({id: id})

        const tagWithId = await tagDoc.get()
        const tag = tagWithId.data() as Tag | undefined

        //Publish to subscribed clients; return to creator client.
        pubsub.publish(TAG_CREATED, {newTag: tag})
        console.log('tag',tag)

        return tag || new ValidationError('Tag creation failed')

      } catch (error) {
        throw new ApolloError(error)
      }
    },

    async report(_: null, args: {reportId: string, userId: string, tagId: string}) {
      try {
        const reportDoc = await admin
          .firestore().collection("tagsQL")
          .doc(args.tagId).collection("reports").doc(args.reportId)

// tslint:disable-next-line: no-floating-promises
        admin.firestore().runTransaction( transaction => {
          return transaction.get(reportDoc).then( rep => {
            const data = rep.data()
            const newTotal = data.total + 1
            const newReporters = data.reporters.concat([args.userId])

            const report = {tagId: args.tagId
                            , reportId: args.reportId
                            , userId: args.userId} as Report | undefined

            pubsub.publish(NEW_REPORT, {report: report})
            
            return transaction.update(reportDoc, {total: newTotal
                                              , reporters: newReporters})
          })
        })
      } catch (error) {
        throw new ApolloError(error)
      }
    },

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

        const id = newMerchant.id
        await merchantDoc.update({id: id})

        const merchantWithId = await merchantDoc.get()
        const merchant = merchantWithId.data() as Merchant | undefined

        return merchant || new ValidationError('Merchant creation failed')

      } catch (error) {
        throw new ApolloError(error)
      }
    },

    async enterFeed(_: null, args: {userId: string, merchantId: string}) {
      try {
        const userDoc = await admin
          .firestore().collection("usersQL").doc(args.userId)

        // tslint:disable-next-line: no-floating-promises
        admin.firestore().runTransaction( transaction => {
          return transaction.get(userDoc).then( user => {

            pubsub.publish(NEW_ACTIVE, {user: user.data()})
            
            return transaction.update( userDoc, {onFeed: args.merchantId} )
          })
        })
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
    },

    async reactors(tag) {
      try {
        const reactsCol = await admin
          .firestore()
          .collection(`tagsQL/${tag.id}/reacts`)
          .get()

        const reactors = reactsCol.docs.map(react => 
          ({react: react.id
          , reactors: react.data().reactors
          , total: react.data().total})) as Reactors[]

        var reactTotal = reactors.reduce(function(prev, cur) {
          return prev + cur.total
        }, 0)
        return reactors

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

  Reaction: {
    async user(reaction) {
      try {
        const reactorData = await admin
          .firestore()
          .collection('usersQL')
          .doc(reaction.userId)
          .get()
        return reactorData.data() as User
      } catch (error) {
        throw new ApolloError(error)
      }
    }
  }
}
