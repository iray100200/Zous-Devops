import Koa from 'koa'
import * as schema from './schema'
import * as resolvers from './resolvers'

const { ApolloServer } = require('apollo-server-koa')
const server = new ApolloServer({ typeDefs: Object.values(schema), resolvers: Object.values(resolvers) })

const app = new Koa()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)