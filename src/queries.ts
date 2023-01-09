import gql from 'graphql-tag'

const TEST_QUERY = gql`
  query {
    testQuery
  }
`

export const GET_LATEST_HOURLY_TAGRANKLIST = gql`
query {
	getLatestHourlyTagRankList {
		tags
		count
	}
}
`

export const GET_LATEST_24HOURS_TAGRANKLIST = gql`
query {
	getLatest24HoursTagRankList {
		tags
		count
	}
}
`

export const GET_LATEST_DAY_TAGRANKLIST = gql`
query {
	getLatestDayTagRankList {
		tags
		count
	}
}
`

export const GET_LATEST_DAY_SOLDTOKENS = gql`
query {
	getLatestDaySoldTokens {
		price
		amount
	}
}
`

export default TEST_QUERY


