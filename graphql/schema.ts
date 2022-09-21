import gql from 'graphql-tag'

const typeDefs = gql`
  type Query {
    testQuery: String
  }
`
export default typeDefs