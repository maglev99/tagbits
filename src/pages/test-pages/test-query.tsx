import React from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import AllLinksQuery from '../../queries'

const TestQuery = () => {
  const { data, loading, error } = useQuery(AllLinksQuery)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <>
      <Head>
        <title>Test Query</title>
      </Head>
      <h1>Test Query Result:</h1>
      <h1>Result: {data.links[0].title}</h1>
    </>
  )
}

export default TestQuery
