import { gql } from '@apollo/client'

const AllLinksQuery = gql`
  query {
    links {
      id
      title
      url
      description
      imageUrl
      category
    }
  }
`

export const TokenQuery = gql`
  query TokenQuery(
    $pk: bigint
    $gte: timestamptz
    $lt: timestamptz
  ) {
    token(
      where: {
        pk: { _gt: $pk }
        timestamp: { _is_null: false, _gte: $gte, _lt: $lt }
      }
      order_by: { timestamp: asc }
    ) {
      pk
      timestamp
      tags {
        tag {
          name
        }
      }
    }
  }
`

export const TokenRankQuery = gql`
	query {
		fetchTokensRanked
	}
`

export const UPDATE_TOKEN_LIST = gql`
  query {
    updateTokenList
  }
`

export default AllLinksQuery
