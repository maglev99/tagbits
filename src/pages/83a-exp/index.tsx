/* eslint-disable react/button-has-type */
import React, { Fragment, useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

// import Image from 'next/image'

import { io } from 'socket.io-client'

import { useQueryClient } from '@tanstack/react-query'

import z from 'zod'
import useGQLQuery from '../../../graphql/useGQLQuery'

import { GET_LATEST_DAY_TAGRANKLIST } from '../../queries'

import chooseTagColor from '../components/utils/tagColor'

// Image Imports
// import TagbitsLogo from '../index-images/Tagbits_Logo.png'
// import City from '../index-images/City_Bkg.png'
// import City_Mobile from '../index-images/City_Bkg_Mobile.png'

// Component Imports
// import Filters from '../components/filters'
// import Tagline from '../components/tagline'

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

// // Colored Background Palettes Code START
// const tagBackgroundPalettes = [
//   'bg-[#465B90]',
//   'bg-[#b06868]',
//   'bg-[#7DA863]',
//   'bg-[#67518A]',
//   'bg-[#894A83]',
//   'bg-[#B69059]',
//   'bg-[#A971AA]',
// ]

// const getRandomInt = (max: number) => Math.floor(Math.random() * max)

// let currentBgColorIndex = getRandomInt(7)

// // keeps track of current count for each tag to switch colors when next tag has a different count than previous 
// let currentCount = 0 

// const chooseBgColor = (count: number) => {
//   if (count && currentCount !== count)
//   {
//     currentCount = count
//     currentBgColorIndex = 0 + ((currentBgColorIndex + 1) % 7)
//   }

//   return tagBackgroundPalettes[currentBgColorIndex]
// }
// // Colored Background Palettes Code END

const lastDay = (daysAgo: number) => {
  const date = new Date()
  // set date to UTC
  date.setDate(date.getUTCDate())
  date.setDate(date.getDate() - daysAgo)

  const year = date.getFullYear()

  const month = date.getMonth() + 1
  const day = date.getDate()

  const withHyphens = [year, month, day].join('-')
  return withHyphens
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LastDayData = React.forwardRef((props, ref: any) => {
  const { status, data, error } = useGQLQuery(
    ['latest_day_tagranklist'],
    GET_LATEST_DAY_TAGRANKLIST,
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
    <div
      className={`${centerContainerOnly} w-[1000px] px-1 flex-wrap bg-tb-background`}
      ref={ref}
    >
      <div
        className={`${centerContainerOnly} w-[960px] px-1 pl-4 flex-wrap pb-10`}
      >
        <div
          className={`mt-10 ${mainFont} text-[39px] ${centerContainerOnly} w-[960px] px-4 justify-start`}
        >
          <h1>Top 100 most minted tags on objkt.com last day</h1>
        </div>
        <div
          className={`mt-2 mb-[50px] ${mainFont} text-[22px] ${centerContainerOnly} w-[960px] px-4 justify-start`}
        >
          <h1>{`from ${lastDay(1)} 00:00 UTC to ${lastDay(0)} 00:00 UTC`}</h1>
        </div>

        {data.getLatestDayTagRankList.map((item: TagRank) => (
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
                    className={`"font-sans lg:font-light mx-2 px-2 py-1 rounded-xl my-2 text-[#F3F3F3] ${chooseTagColor(item?.count)} hover:underline max-w-sm truncate text-ellipsis"`}
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
        <div
          className={`mt-10 ${mainFont} text-[32px] ${centerContainerOnly} w-[960px] px-6 justify-end`}
        >
          <h1>tagbits.xyz</h1>
        </div>
        {/* <div className="flex w-[960px] justify-center mt-6">
	<div className="">
		<Image
          src={TagbitsLogo}
          alt="Logo"		
        />
	</div>
</div> */}
      </div>
    </div>
  )
})

const Home: NextPage = () => {
  // Get QueryClient from the context
  const queryClient = useQueryClient()

  // ref for exporting component as image
  const componentRef = React.useRef<HTMLDivElement>(null)

  // used to remove white bar on top of exported image
  const exportParams = {
    html2CanvasOptions: {
      scrollX: typeof window !== 'undefined' ? -window.scrollX : 0,
      scrollY: typeof window !== 'undefined' ? -window.scrollY : 0,
      windowWidth:
        typeof document !== 'undefined'
          ? document.documentElement.offsetWidth
          : 0,
      windowHeight:
        typeof document !== 'undefined'
          ? document.documentElement.offsetHeight
          : 0,
    },
  }

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
        queryClient.invalidateQueries(['latest_day_tagranklist'])
        console.log('refetched query')
      }
    })
  }

  useEffect(() => {
    socketInitializer()
    console.log('component ref: ', componentRef)
    console.log('component ref current: ', componentRef.current)
  }, [])

  return (
    <>
      <Head>
        <title>Tagbits</title>
      </Head>

      <div
        className={`${centerContainerOnly} flex w-[960px] justify-start my-12 pl-8`}
      >
        <button
          className="border-solid border-2 border-tb-text px-2 py-2 rounded-md"
          onClick={async () => {
            const { exportComponentAsPNG } = await import(
              'react-component-export-image'
            )
            if (componentRef.current) {
              exportComponentAsPNG(componentRef, exportParams)
            } else {
              console.log('component ref: ', componentRef)
              console.log('component ref current: ', componentRef.current)
            }
          }}
        >
          Export as PNG
        </button>
      </div>
      <LastDayData ref={componentRef} />
      <div
        className={`${centerStyle} mt-20 pb-0 ${mainFont} text-2xl hover:underline`}
      >
        <Link href="/last-24-hours">Return to top</Link>
      </div>
    </>
  )
}

export default Home
