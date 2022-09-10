import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Link {
    id: String
    title: String
    description: String
    url: String
    category: String
    imageUrl: String
    users: [String]
  }

  type Query {
    tokens: [Token]
    updateTokenList: String
  }

  type Token {
    pk: String
    timestamp: String
    tags: [Tag]
  }

  type Tag {
    name: String
  }
`
export default typeDefs