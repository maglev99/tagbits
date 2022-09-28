import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Image from 'next/image'

import { io } from 'socket.io-client'

import { useQueryClient } from '@tanstack/react-query'

import z from 'zod'
import useGQLQuery from '../../graphql/useGQLQuery'

import { GET_LATEST_HOURLY_TAGRANKLIST } from '../queries'

// Image Imports
import TagbitsLogo from './index-images/Tagbits_Logo.png'

const tagRankValidator = z.object({
  name: z.string(),
  count: z.number(),
})

type TagRank = z.infer<typeof tagRankValidator>

let socket: any

const serverURL: string = process.env.NEXT_PUBLIC_WS_SERVER_URL ?? ''

const Nav = () => (
  <div className="sticky top-0 pointer-events-none flex items justify-start pt-4 ml-4 text-lg">
    <Link href="/">
      <Image
        src={TagbitsLogo}
        alt="Logo"
        className="pointer-events-auto cursor-pointer"
      />
    </Link>
  </div>
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
    <div className="flex items justify-center mt-10">
      <table>
        <tr>
          <th className="text-start">Tag Name</th>
          <th className="text-start">Count</th>
        </tr>
        {data.getLatestHourlyTagRankList.map((item: TagRank) => (
          <tr key={item.name}>
            <td>{item.name}</td>
            <td>{item.count}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

const Home: NextPage = () => {
  // Get QueryClient from the context
  const queryClient = useQueryClient()

  // Initialize Websocket
  const socketInitializer = async () => {
    socket = io(serverURL, {
      reconnectionDelay: 1000,
      reconnection: true,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    })

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('refetch', (data: string) => {
      console.log('refetch: ', data)
      if (data === 'hourly_tagranklist') {
        queryClient.invalidateQueries(['latest_hourly_tagranklist'])
        console.log('refetched query')
      }
    })
  }

  useEffect(() => {
    socketInitializer()
  }, [])

  return (
    <>
      <Head>
        <title>Tagbits</title>
      </Head>
      <div className="h-screen bg-tb-background">
        {/* h-screen so that background color covers entire screen if content length shorter than screen size */}
        <div className="h-max bg-tb-background">
          {/* h-max so that background color covers content that overflows screen size */}
          <Nav />
          <div className="px-10">
            <h1 className="flex justify-center mt-10 text-2xl font-dotGothic text-tb-text text-3xl">
              Most Popular Tags used by artists on objkt.com last hour
            </h1>
            <h1 className="flex justify-center mt-8 text-2xl font-dotGothic text-tb-text text-2xl">
              (click on tag names to see art)
            </h1>
          </div>
          <Data />
        </div>
      </div>
    </>
  )
}

export default Home
