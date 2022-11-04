import React, { Fragment } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Image from 'next/image'

// import { useQueryClient } from '@tanstack/react-query'

import z from 'zod'
import useGQLQuery from '../../../graphql/useGQLQuery'

import { GET_LATEST_HOURLY_TAGRANKLIST } from '../../queries'

// Image Imports
import City from '../index-images/City_Bkg.png'
import City_Mobile from '../index-images/City_Bkg_Mobile.png'

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

const Home: NextPage = () => {
  const tempVal = 0 // standin value not used

  return (
    <>
      <Head>
        <title>Tagbits</title>
      </Head>
      <TopImage />
      <div>
        <div
          className={`mt-4 md:mt-10 ${mainFont} text-2xl md:text-3xl lg:text-4xl ${centerContainerOnly} max-w-[960px] px-4 justify-start`}
        >
          <h1>Top 100 collectors on objkt.com by volume last day</h1>
        </div>
      </div>
      <div
        className={`${centerStyle} mt-20 pb-0 ${mainFont} text-2xl hover:underline`}
      >
        <Link href="/">Return to top</Link>
      </div>
    </>
  )
}

export default Home
