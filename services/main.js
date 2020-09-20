import Koa from 'koa'
import * as path from 'path'
import { loadFileSync } from './tools/loaders/file-loader'
import { visitFolders, visitFiles } from './tools/fs'
import { SchemaPattern, ResolverPattern } from './tools/pattern'

const { mergeResolvers, mergeTypeDefs } = require('@graphql-tools/merge')
const { ApolloServer } = require('apollo-server-koa')

const typeDefs = []
const resolvers = []

visitFolders(path.resolve(__dirname, 'schema'), (pathname) => {
  visitFiles(pathname, (filePath, filename) => {
    /**
     * schema generator
     */
    if(SchemaPattern.test(filename)) {
      typeDefs.push(
        loadFileSync(filePath)
      )
    }
    /**
     * resolver generator
     */
    if(ResolverPattern.test(filename)) {
      resolvers.push(
        require(filePath).default
      )
    }
  })
})

const app = new Koa()
const server = new ApolloServer({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers)
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)