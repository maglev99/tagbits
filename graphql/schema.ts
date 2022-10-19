import gql from 'graphql-tag'

const typeDefs = gql`
  type Query {
    testQuery: String
    getLatestHourlyTagRankList: [TagRank]
    getLatest24HoursTagRankList: [TagRank]
    getLatestDayTagRankList: [TagRank]
  }

  type TagRank {
    tags: [String]
    count: Int
  }
`
export default typeDefs


