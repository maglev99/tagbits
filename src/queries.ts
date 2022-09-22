import gql from 'graphql-tag'

const TEST_QUERY = gql`
  query {
    testQuery
  }
`

export const GET_LATEST_HOURLY_TAGRANKLIST = gql`
query {
	getLatestHourlyTagRankList {
		name
		count
	}
}
`

export default TEST_QUERY


