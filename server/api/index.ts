const express = require('express')
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
const cors = require('cors');
require('./config')

import { typeDefs } from './schema'
import { resolvers } from './resolvers'

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())

const apolloServer = new ApolloServer({typeDefs, resolvers, introspection: true})
apolloServer.applyMiddleware({ app })

const httpServer = createServer(app)

apolloServer.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
})
