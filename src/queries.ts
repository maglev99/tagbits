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
  query TokenQuery($pk: bigint = 0) {
    token(
      where: {
        pk: { _gt: $pk }
        timestamp: {
          _is_null: false
          _gte: "2022-09-06T00:00:00+00:00"
          _lt: "2022-09-06T00:10:00+00:00"
        }
      }
      order_by: { timestamp: asc }
      limit: 2
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

export const UPDATE_TOKEN_LIST = gql`
  query {
    updateTokenList
  }
`

export default AllLinksQuery
