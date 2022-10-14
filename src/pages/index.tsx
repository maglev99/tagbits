import React, { Fragment, useEffect } from 'react'
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
  tags: z.string().array(),
  count: z.number(),
})

type TagRank = z.infer<typeof tagRankValidator>

let socket: any

const serverURL: string = process.env.NEXT_PUBLIC_WS_SERVER_URL ?? ''

const mainFont = 'font-dotGothic text-tb-text antialiased font-normal'

// style for centering elements horizontally with max width
const centerStyle = 'max-w-[1200px] flex justify-center mx-auto'
const centerContainerOnly = 'max-w-[1200px] flex mx-auto'
// const centerStyle = 'bg-blue-200 max-w-[1200px] flex justify-center mx-auto'

const LastHourData = () => {
  const { status, data, error } = useGQLQuery(
    ['latest_hourly_tagranklist'],
    GET_LATEST_HOURLY_TAGRANKLIST,
    {}
  )

  const style = `flex items justify-center mt-10 text-2xl ${mainFont}`

  // replace # with %23 when searching or objkt.com won't recognize # symbol in tag search
  const replaceLinkHashtags = (link: string) => link.replaceAll('#', '%23')

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
    <div className={`${centerContainerOnly} max-w-[960px] mt-4 px-1 flex-wrap`}>
      {data.getLatestHourlyTagRankList.map((item: TagRank) => (
        <div key={`${item.tags[0]}_${item.count}`}>
          {/* remove empty tags from list using filter */}
          {item.tags
            .filter((tag) => tag.trim().length > 0)
            .map((filteredTag: string) => (
              <div
                key={filteredTag}
                className="inline-flex flex-wrap mx-1 items-center"
              >
                <a
                  href={`https://objkt.com/explore/tokens/1?tags=${replaceLinkHashtags(
                    filteredTag
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-light mx-2 px-2 py-1 rounded-xl my-2 text-[#F3F3F3] bg-tb-text hover:underline"
                >
                  {filteredTag}
                </a>
                {item.tags.indexOf(filteredTag) === item.tags.length - 1 && (
                  <h1 className={`${mainFont} text-xl translate-y-2`}>
                    {item.count}
                  </h1>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}

// const Last24HourData = () => (
//   <h1>Last 24 Hour Data</h1>
// )

const TopImage = () => (
  <div className={`${centerStyle} pointer-events-none`}>
    <div className="max-w-[640px] max-h-[360px] -mt-[80px] md:hidden">
      <Image src={City_Mobile} alt="City Background Image" priority />
    </div>
    <div className="max-w-[1280px] max-h-[360px] md:-mt-[80px] lg:-mt-[120px] hidden md:flex">
      <Image src={City} alt="City Background Image" priority />
    </div>
  </div>
)

const Filters = () => (
  <div
    className={`${centerContainerOnly} max-w-[960px] pl-4 justify-start my-8 bg-blue-200`}
  >
    <h1>Last Hour</h1>
    <h1>Last 24 Hours</h1>
  </div>
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
      <TopImage />
      <div className="">
        {/* use antialiased or text blurry with DotGothic16 font */}
        <div
          className={`mt-4 md:mt-10 ${mainFont} text-2xl md:text-3xl lg:text-4xl ${centerContainerOnly} max-w-[960px] pl-4 justify-start`}
        >
          {/* div tag wraps h1 tag so spacing between link and other words don't collapse in flexbox */}
          <h1>
            Most Minted Tags on{' '}
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
        <Filters />
        <div
          className={`${mainFont} text-xl md:text-2xl ${centerContainerOnly} max-w-[960px] pl-4 justify-start`}
        >
          <h3>*number is pieces minted</h3>
        </div>
      </div>
      <LastHourData />
      <div
        className={`${centerStyle} mt-20 pb-0 ${mainFont} text-2xl hover:underline`}
      >
        <Link href="/">Return to top</Link>
      </div>
    </>
  )
}

export default Home
