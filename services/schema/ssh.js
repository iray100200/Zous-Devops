const { gql } = require('apollo-server-koa')

const typeDefs = gql`
  type message {
    id: Int
    message:  String
  }
  type Query {
    hello: String
    message: message
  }
`
export default typeDefs