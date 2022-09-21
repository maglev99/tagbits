import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

// import { useQuery } from '@tanstack/react-query'
// import { gql } from 'graphql-request'

import useGQLQuery from '../../graphql/useGQLQuery'

import TEST_QUERY from '../queries'

// const GET_POKEMON = gql`
//   query pokemons($limit: Int, $offset: Int) {
//     pokemons(limit: $limit, offset: $offset) {
//       count
//       next
//       previous
//       status
//       message
//       results {
//         url
//         name
//         image
//       }
//     }
//   }
// `

const Nav = () => (
  <>
    <h1 className="flex items justify-start ml-8 mt-6 text-lg">
      <Link href="/">Home</Link>
    </h1>
    <h1 className="flex items justify-start ml-8 mt-2 text-lg">
      First Post, <Link href="/test-pages/second-post">Second Post</Link>
    </h1>
  </>
)

const Data = () => {
  const { status, data, error } = useGQLQuery(['testQuery'], TEST_QUERY, {})

  if (status === 'loading') {
    return <h1>Loading ...</h1>
  }

  if (status === 'error') {
    if (error instanceof Error) {
      return <h1>Error: {error.message}</h1>
    }

    console.log('Error not an instance of error: ', error)
    return <h1>An unexpected error occured</h1>
  }

  return <h1>{data.testQuery}</h1>
}

const Main = () => (
  <>
    <Head>
      <title>GQL Test</title>
    </Head>
    <Nav />
    <h1 className="flex items justify-center mt-10 text-2xl">Query Data</h1>
    <h1 className="flex items justify-center mt-10 text-xl">Data: </h1>
    <Data />
  </>
)

export default Main
