/* eslint-disable no-nested-ternary */
import React, { Fragment, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Image from 'next/image'

import { useQuery } from '@tanstack/react-query'

// import z from 'zod'
// import useGQLQuery from '../../../graphql/useGQLQuery'
// import { GET_LATEST_HOURLY_TAGRANKLIST } from '../../queries'

// graphql imports
import request from 'graphql-request'
import gql from 'graphql-tag'

// Image Imports
import City from '../index-images/City_Bkg.png'
import City_Mobile from '../index-images/City_Bkg_Mobile.png'

const mainFont = 'font-dotGothic text-tb-text antialiased font-normal'

// style for centering elements horizontally with max width
const centerStyle = 'max-w-[1200px] flex justify-center mx-auto'
const centerContainerOnly = 'max-w-[1200px] flex mx-auto'
// const centerStyle = 'bg-blue-200 max-w-[1200px] flex justify-center mx-auto'

const top100Collectors1DayQueryDocument = gql(/* GraphQL */ `
  query top100Collectors1DayQuery {
    sales_stat(
      where: { interval_days: { _eq: 1 }, type: { _eq: "buyer" } }
      order_by: { rank: asc }
      limit: 100
    ) {
      volume
      subject {
        address
        alias
        logo
        events_recipient(
          where: {
            _and: {
              _or: [
                { marketplace_event_type: { _eq: "list_buy" } }
                { marketplace_event_type: { _eq: "offer_accept" } }
                { marketplace_event_type: { _eq: "english_auction_settle" } }
                { marketplace_event_type: { _eq: "dutch_auction_buy" } }
                { marketplace_event_type: { _eq: "offer_floor_accept" } }
              ]
            }
          }
          limit: 5
          order_by: { timestamp: desc }
        ) {
          token {
            name
            thumbnail_uri
            token_id
          }
          timestamp
          price
          fa_contract
        }
        twitter
        tzdomain
      }
      rank
    }
  }
`)

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

const ProfilePicture = ({ profilePicSize, profilePic, onErrorFunction }: any) => (
  <div
    className={`overflow-hidden mx-1 w-[${profilePicSize}] h-[${profilePicSize}]`}
  >
    <Image
      src={profilePic}
      alt="Profile Photo"
      width={profilePicSize}
      height={profilePicSize}
      layout="fixed"
      objectFit="cover"
      onError={() => onErrorFunction()}
    />
  </div>
)

const CollectorInfoRow = ({ collector }: any) => {
  const rowDataStyle = `bg-green-200`
  const containerStyle = `flex items justify-center mt-10 text-2xl ${mainFont} bg-gray-200`

  const [rank] = useState(collector.rank)
  const [profilePic, setProfilePic] = useState(collector.subject.logo)
  const [nickname] = useState(collector.subject.alias)
  const [tzDomain] = useState(collector.subject.tzdomain)
  const [walletAddress] = useState(collector.subject.address)
  const [volume] = useState(collector.volume)

  // clear image link for images that can't load
  const clearImageLink = () => {
    // console.log('clear image link called')
    setProfilePic('')
  }

  const profilePicSize = '60px'

  const defaultTzktProfilePic = `${'https://services.tzkt.io/v1/avatars/'}${walletAddress}`

  return (
    <div className={containerStyle} key={rank}>
      <div className={`${centerContainerOnly} max-w-[960px] grow bg-blue-200`}>
        <h1 className={rowDataStyle}>{rank}.</h1>
        {profilePic !== null &&
        profilePic !== 'N/A' &&
        profilePic.slice(0, 21) === 'https://pbs.twimg.com' ? (
          <ProfilePicture profilePicSize={profilePicSize} profilePic={profilePic} onErrorFunction={clearImageLink} />
        ) : (
          <ProfilePicture profilePicSize={profilePicSize} profilePic={defaultTzktProfilePic} onErrorFunction={clearImageLink} />
        )}
        {/* if have alias display alias (nickname), else if have tzdomain display tzdomain, else display shortened address */}
        {nickname !== null && nickname.trim().length > 0 ? (
          <h1 className={rowDataStyle}>{nickname}</h1>
        ) : tzDomain !== null && tzDomain.trim().length > 0 ? (
          <h1 className={rowDataStyle}>{tzDomain}</h1>
        ) : (
          <h1 className={rowDataStyle}>{`${walletAddress.slice(
            0,
            5
          )}...${walletAddress.slice(-5)}`}</h1>
        )}
        {/* <h1 className={collectorStyle}>
            Twitter: {collector.subject.twitter}
          </h1> */}
        <div className={`${rowDataStyle} mr-0 ml-auto`}>
          Volume: {(parseFloat(volume) / 1000000).toFixed(2)} XTZ
        </div>
      </div>
    </div>
  )
}

const Data = () => {
  const { data, status, error } = useQuery({
    queryKey: ['top-100-collectors-1-day'],
    queryFn: async () =>
      request(
        'https://data.objkt.com/v3/graphql',
        top100Collectors1DayQueryDocument
      ),
  })

  const containerStyle = `flex items justify-center mt-10 text-2xl ${mainFont} bg-gray-200`

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

  console.log('data', data.sales_stat)

  return (
    <>
      {data.sales_stat.map((collector: any) => (
        <CollectorInfoRow key={collector.subject.address} collector={collector} />
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
      <Link href="/top-collectors">Return to top</Link>
    </div>
  </>
)

export default Home
