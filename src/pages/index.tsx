/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Image from 'next/image'
// import FutureImage from 'next/future/image'

import { useQuery } from '@tanstack/react-query'

// import z from 'zod'
// import useGQLQuery from '../../../graphql/useGQLQuery'
// import { GET_LATEST_HOURLY_TAGRANKLIST } from '../../queries'

// graphql imports
import request from 'graphql-request'
import top100Collectors1DayQueryDocument from './collectors/queries-collectors'
import CollectorInfo from './collectors/components/collectorInfo'
import LatestCollection from './collectors/components/latestCollection'

// Image Imports
import City from './index-images/City_Bkg.png'
import City_Mobile from './index-images/City_Bkg_Mobile.png'

const mainFont = 'font-dotGothic text-tb-text antialiased font-normal'

// style for centering elements horizontally with max width
const centerStyle = 'max-w-[1200px] flex justify-center mx-auto'
const centerContainerOnly = 'max-w-[1200px] flex mx-auto'
// const centerStyle = 'bg-blue-200 max-w-[1200px] flex justify-center mx-auto'

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

const Data = () => {
  const { data, status, error } = useQuery({
    queryKey: ['top-100-collectors-1-day'],
    queryFn: async () =>
      request(
        'https://data.objkt.com/v3/graphql',
        top100Collectors1DayQueryDocument
      ),
  })

  const containerStyle = `flex items justify-center mt-10 text-2xl ${mainFont}`

  if (status === 'loading') {
    return <h1 className={containerStyle}>Loading ...</h1>
  }

  if (status === 'error') {
    if (error instanceof Error) {
      return <h1 className={containerStyle}>Error: {error.message}</h1>
    }

    console.log('Error not an instance of error: ', error)
    return <h1 className={containerStyle}>An unexpected error occured</h1>
  }

  // console.log('data', data.sales_stat)

  return (
    <>
      {data.sales_stat.map((collector: any) => (
        <div key={`${collector.subject.address}`}>
          <CollectorInfo
            key={`${collector.subject.address}-info`}
            collector={collector}
          />
          <LatestCollection
            key={`${collector.subject.address}-collection`}
            collector={collector}
          />
        </div>
      ))}
    </>
  )
}

const Home: NextPage = () => (
  <>
    <Head>
      <title>Tagbits</title>
    </Head>
    <TopImage />
    <div>
      <div
        className={`mt-4 md:mt-10 ${mainFont} text-2xl md:text-3xl lg:text-4xl ${centerContainerOnly} max-w-[960px] px-4 justify-start`}
      >
        <h1>Top 100 collectors on objkt.com by one day volume</h1>
      </div>
    </div>
    <Data />
    <div
      className={`${centerStyle} mt-20 pb-0 ${mainFont} text-2xl hover:underline`}
    >
      <Link href="/">Return to top</Link>
    </div>
  </>
)

export default Home
