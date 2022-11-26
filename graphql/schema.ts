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

// Currently not used since collector info retrieved directly from react query via gql
// type Collector {
//   rank: Int
//   volume: Float
//   address: String
//   alias: String
//   profilePicLink: String
//   twitter: String
// }
