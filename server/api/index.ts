const express = require('express')
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
const cors = require('cors');
require('./config')


import { typeDefs } from './schema'
import { resolvers } from './resolvers'

const PORT = process.env.PORT || 4000
const path = require("path")  

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

const apolloServer = new ApolloServer({typeDefs, resolvers, introspection: true})
apolloServer.applyMiddleware({ app })

const httpServer = createServer(app)

apolloServer.installSubscriptionHandlers(httpServer)

//app.use(express.static(path.join(__dirname, "../../../client/build")))

//app.get("*", function(req, res) {
//    res.sendFile(path.join(__dirname, "../../../client/build", "index.html"))
//})

httpServer.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
})
