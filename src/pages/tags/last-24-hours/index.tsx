import React, { Fragment, useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Image from 'next/image'

import { io } from 'socket.io-client'

import { useQueryClient } from '@tanstack/react-query'

import z from 'zod'
import useGQLQuery from '../../../../graphql/useGQLQuery'

import { GET_LATEST_24HOURS_TAGRANKLIST } from '../../../queries'

// Image Imports
import City from '../../index-images/City_Bkg.png'
import City_Mobile from '../../index-images/City_Bkg_Mobile.png'

// Component Imports
import Filters from '../components/filters'
import Tagline from '../components/tagline'

import chooseTagColor from '../components/utils/tagColor'

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

const Last24HoursData = () => {
  const { status, data, error } = useGQLQuery(
    ['latest_24hours_tagranklist'],
    GET_LATEST_24HOURS_TAGRANKLIST,
    {}
  )

  const style = `flex items justify-center mt-10 text-2xl ${mainFont}`

  // replace # with %23, replace & with %26 when searching or objkt.com won't recognize # symbol in tag search
  const replaceLinkSymbols = (link: string) =>
    link.replaceAll('#', '%23').replaceAll('&', '%26')

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
      {data.getLatest24HoursTagRankList.map((item: TagRank) => (
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
                  href={`https://objkt.com/explore/tokens/1?tags=${replaceLinkSymbols(
                    filteredTag
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`"font-sans lg:font-light mx-2 px-2 py-1 rounded-xl my-2 text-[#F3F3F3] ${chooseTagColor(
                    item?.count
                  )} hover:underline max-w-sm truncate text-ellipsis"`}
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
        queryClient.invalidateQueries(['latest_24hours_tagranklist'])
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
      <div>
        <Tagline />
        <Filters />
        <div
          className={`${mainFont} text-xl md:text-2xl ${centerContainerOnly} max-w-[960px] pl-4 justify-start`}
        >
          <h3>*number is pieces minted</h3>
        </div>
      </div>
      <Last24HoursData />
      <div
        className={`${centerStyle} mt-20 pb-0 ${mainFont} text-2xl hover:underline`}
      >
        <Link href="/tags/last-24-hours">Return to top</Link>
      </div>
    </>
  )
}

export default Home
