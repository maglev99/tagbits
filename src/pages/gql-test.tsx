import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import z from 'zod'
import useGQLQuery from '../../graphql/useGQLQuery'

// import TEST_QUERY from '../queries'
import { GET_LATEST_HOURLY_TAGRANKLIST } from '../queries'

const tagRankValidator = z.object({
  name: z.string(),
  count: z.number(),
})

type TagRank = z.infer<typeof tagRankValidator>

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
  const { status, data, error } = useGQLQuery(
    ['latest_hourly_tagranklist'],
    GET_LATEST_HOURLY_TAGRANKLIST,
    {}
  )

  const style = 'flex items justify-center mt-10 text-2xl'

  if (status === 'loading') {
    return <h1 className={style}>Loading ...</h1>
  }

  if (status === 'error') {
    if (error instanceof Error) {
      return <h1 className={style}>Error: {error.message}</h1>
    }

    console.log('Error not an instance of error: ', error)
    return <h1 className={style}>An unexpected error occured</h1>
  }

  return (
    <div className='flex items justify-center mt-10'>
      <table>
        <tr>
          <th className="text-start">Tag Name</th>
          <th className="text-start">Count</th>
        </tr>
        {data.getLatestHourlyTagRankList.map((item: TagRank) => (
          <tr key={item.name} >
            <td>{item.name}</td>
            <td>{item.count}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

const Main = () => (
  <>
    <Head>
      <title>GQL Test</title>
    </Head>
    <Nav />
    <h1 className="flex items justify-center mt-2 text-2xl">Query Data</h1>
    <Data />
  </>
)

export default Main
