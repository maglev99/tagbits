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
const centerContainerOnly = 'max-w-[1200px] flex mx-auto'
// const centerStyle = 'bg-blue-200 max-w-[1200px] flex justify-center mx-auto'

const Nav = () => (
  <div className="z-10 top-0 flex items justify-start pt-4 ml-4 text-lg w-[250px] md:w-full lg:max-w-[1200px] lg:justify-start lg:mx-auto lg:pl-2">
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
    <div
      className={`${mainFont} text-xl mt-[10px] ml-6 hover:underline md:text-2xl md:ml-10 md:mt-[12px]`}
    >
      <a
        href="https://twitter.com/TagbitsXYZ"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
    </div>
    {/* <div
      className={`${mainFont} text-xl mt-[10px] ml-6 hover:underline md:text-2xl md:ml-10 md:mt-[12px]`}
    >
      <a href="/" target="_blank" rel="noopener noreferrer">
        Discord
      </a>
    </div> */}
  </div>
)

const Data = () => {
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
    <div className={`${centerStyle} max-w-[960px] mt-10`}>
      <table className="w-full">
        <tbody>
          <tr className="flex">
            <th
              className={`mx-6 md:ml-10 lg:mx-0 text-start ${mainFont} text-2xl md:text-3xl pb-4 grow-0`}
            >
              Tag Name
            </th>
            <th className="grow" aria-label="empty space" />
            <th
              className={`mx-6 md:mr-10 lg:mx-0 text-end  ${mainFont} text-2xl md:text-3xl pb-4 grow-0`}
            >
              Pieces Minted
            </th>
          </tr>
          {data.getLatestHourlyTagRankList.map((item: TagRank) => (
            <tr key={item.name} className="flex mx-6 md:mx-10 lg:mx-0">
              <td className="text-start py-2 grow-0 max-w-[600px]">
                <a
                  href={`https://objkt.com/explore/tokens/1?tags=${replaceLinkHashtags(
                    item.name
                  )}`}
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
          <div className="px-6 lg:px-10">
            {/* use antialiased or text blurry with DotGothic16 font */}
            <div
              className={`mt-4 md:mt-10 ${mainFont} text-2xl md:text-3xl lg:text-4xl ${centerContainerOnly} justify-start md:justify-center`}
            >
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
            <h1
              className={`mt-6 md:mt-8 ${mainFont} text-xl md:text-3xl ${centerContainerOnly} justify-start md:justify-center`}
            >
              (click on tag names to see art)
            </h1>
          </div>
          <Data />
          <div
            className={`${centerStyle} mt-20 pb-0 ${mainFont} text-2xl hover:underline`}
          >
            <Link href="/">Return to top</Link>
          </div>
          <footer className={`${centerStyle} mt-28 ${mainFont} text-2xl`}>
            © 2022, Lands Software Inc.
          </footer>
          <div
            className={`${centerStyle} mt-6 pb-[100px] ${mainFont} text-lg`}
          >
            <div>
              <a
                href="https://chiseled-asteroid-e55.notion.site/Terms-of-Service-e23a61e6f1f54bc0b40bb2f7e2ffe72c"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Terms of Service
              </a>{' '}
              |{' '}
              <a
                href="https://chiseled-asteroid-e55.notion.site/Privacy-Policy-e5456aef63fa4ffc866028e0d7a28ce8"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
