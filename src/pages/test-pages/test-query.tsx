import React from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
// import AllLinksQuery from '../../queries'

import { UPDATE_TOKEN_LIST } from '../../queries'
// import { TokenQuery } from '../../queries'


const TestQuery = () => {
  const { data, loading, error } = useQuery(UPDATE_TOKEN_LIST)

  // const { data, loading, error } = useQuery(TokenQuery, {
  //   context: { clientName: 'objkt-api' },
  // })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  console.log('data', data)

  return (
    <>
      <Head>
        <title>Test Query</title>
      </Head>
      <h1>Test Query Result:</h1>
      {/* <h1>Result: {data.links[0].title}</h1>
      <h1>{data.links[0].description}</h1>
      <h1>{data.links[0].url}</h1> */}
    </>
  )
}

export default TestQuery



