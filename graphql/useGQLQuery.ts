import { useQuery } from '@tanstack/react-query'
import { GraphQLClient } from 'graphql-request'

const useGQLQuery = (key: any, query: any, variables: any, config = {}) => {
  const endpoint = 'https://graphql-pokeapi.graphcdn.app/'

  const graphQLClient = new GraphQLClient(endpoint)

  const fetchData = async () => graphQLClient.request(query, variables)

  return useQuery(key, fetchData, config)
}

export default useGQLQuery
