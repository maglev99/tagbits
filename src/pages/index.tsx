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
import City from './index-images/City_Bkg.png'
import City_Mobile from './index-images/City_Bkg_Mobile.png'

const tagRankValidator = z.object({
  name: z.string(),
  count: z.number(),
})

type TagRank = z.infer<typeof tagRankValidator>

let socket: any

const serverURL: string = process.env.NEXT_PUBLIC_WS_SERVER_URL ?? ''

const mainFont = 'font-dotGothic text-tb-text antialiased font-normal'

// style for centering elements horizontally with max width
const centerStyle = 'max-w-[1200px] flex justify-center mx-auto'
// const centerStyle = 'bg-blue-200 max-w-[1200px] flex justify-center mx-auto'

const Nav = () => (
  <div className="z-10 sticky top-0 pointer-events-none flex items justify-start pt-4 ml-4 text-lg">
    <Link href="/">
      {/* use button to wrap Image to avoid nextjs link and a tag errors */}
      <button type="button">
        <Image
          src={TagbitsLogo}
          alt="Logo"
          className="pointer-events-auto cursor-pointer"
        />
      </button>
    </Link>
  </div>
)

const Data = () => {
  const { status, data, error } = useGQLQuery(
    ['latest_hourly_tagranklist'],
    GET_LATEST_HOURLY_TAGRANKLIST,
    {}
  )

  const style = `flex items justify-center mt-10 text-2xl ${mainFont}`

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
    <div className={`${centerStyle} max-w-[960px] mt-10`}>
      <table className="w-full">
        <tbody>
          <tr className="flex">
            <th className={`text-start ${mainFont} text-3xl pb-4 grow-0`}>
              Tag Name
            </th>
            <th className="grow" aria-label="empty space" />
            <th className={`text-end  ${mainFont} text-3xl pb-4 grow-0`}>
              Pieces Minted
            </th>
          </tr>
          {data.getLatestHourlyTagRankList.map((item: TagRank) => (
            <tr key={item.name} className="flex">
              <td className="text-start py-2 grow-0 max-w-[600px]">
                <a
                  href={`https://objkt.com/explore/tokens/1?tags=${item.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline ${mainFont} text-2xl break-all`}
                >
                  {item.name}
                </a>
              </td>
              <td className="grow text-center py-2 border-dotted border-t-2 border-tb-text mx-11 mt-[26px]" />
              <td className={`text-end py-2 ${mainFont} text-2xl grow-0`}>
                {item.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const TopImage = () => (
  <>
    <div className={`${centerStyle} max-w-[640px] max-h-[360px] -mt-[80px] md:hidden`}>
      <Image src={City_Mobile} alt="City Background Image" priority />
    </div>
    <div className={`${centerStyle} max-w-[1280px] max-h-[360px] md:-mt-[80px] lg:-mt-[120px] hidden md:flex`}>
      <Image src={City} alt="City Background Image" priority />
    </div>
  </>
)

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
          <TopImage />
          <div className="px-10">
            {/* use antialiased or text blurry with DotGothic16 font */}
            <div className={`mt-10 ${mainFont} text-4xl ${centerStyle}`}>
              {/* div tag wraps h1 tag so spacing between link and other words don't collapse in flexbox */}
              <h1>
                Most Popular Tags used by artists on{' '}
                <a
                  href="https://objkt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  objkt.com
                </a>{' '}
                last hour
              </h1>
            </div>
            <h1 className={`mt-8 ${mainFont} text-3xl ${centerStyle}`}>
              (click on tag names to see art)
            </h1>
          </div>
          <Data />
          <footer
            className={`${centerStyle} mt-40 pb-[100px] ${mainFont} text-2xl`}
          >
            © 2022, Lands Software Inc.
          </footer>
        </div>
      </div>
    </>
  )
}

export default Home
