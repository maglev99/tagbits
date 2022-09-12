// /lib/apollo.ts

import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client'

// link to app database for ranking fetched tokens and displaying results to user 
export const defaultLink = new HttpLink({
  uri: 'http://localhost:3000/api/graphql',
})

// link for fetching tokens from objkt api
export const objktAPILink = new HttpLink({
  uri: 'https://data.objkt.com/v2/graphql',
})

const apolloClient = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === 'objkt-api',
    objktAPILink,
    defaultLink
  ),
  cache: new InMemoryCache(),
})

export default apolloClient
