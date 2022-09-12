import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    tokens: [Token]
    updateTokenList: String
    fetchTokensRanked: [Token]
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