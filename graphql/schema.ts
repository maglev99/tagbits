import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    tokens: [Token]
    updateTokenList: String
    fetchTagsRanked: [TagRank]
  }

  type Token {
    pk: String
    timestamp: String
    tags: [Tag]
  }

  type Tag {
    name: String
  }

  type TagRank {
    name:  String
    count: Int
  }
`
export default typeDefs