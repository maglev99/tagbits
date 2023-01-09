import gql from 'graphql-tag'

const typeDefs = gql`
  type Query {
    testQuery: String
    getLatestHourlyTagRankList: [TagRank]
    getLatest24HoursTagRankList: [TagRank]
    getLatestDayTagRankList: [TagRank]
    
    getLatestDaySoldTokens: [SoldTokens]
  }

  type TagRank {
    tags: [String]
    count: Int
  }

  type SoldTokens {
    price: Float
    amount: Int
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
