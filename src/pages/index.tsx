/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Image from 'next/image'
// import FutureImage from 'next/future/image'

import { useQuery } from '@tanstack/react-query'

// used for graphql request to objkt api
import request from 'graphql-request'

// import chart.js
import {
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Chart,
} from 'chart.js'
import { Line, Pie } from 'react-chartjs-2'

// import z from 'zod'
import useGQLQuery from '../../graphql/useGQLQuery'
import { GET_LATEST_DAY_SOLDTOKENS } from '../queries'

// graphql imports
import top100Collectors1DayQueryDocument from '../queries-collectors'
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

type Props = {
  children: any
}

// register category scale to fix "...is not a registered scale" error
Chart.register(CategoryScale)
Chart.register(LinearScale)
Chart.register(PointElement)
Chart.register(LineElement)
Chart.register(LogarithmicScale)

Chart.register(ArcElement)
Chart.register(Legend)

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
          {collector && (
            <CollectorInfo
              key={`${collector.subject.address}-info`}
              collector={collector}
            />
          )}
          {collector && (
            <LatestCollection
              key={`${collector.subject.address}-collection`}
              collector={collector}
            />
          )}
        </div>
      ))}
    </>
  )
}

// Card that contains content of each section of site
const ContentCard = ({ children }: Props) => (
  <div
    className={`${centerContainerOnly} max-w-[1200px] mt-8 grow items-center`}
  >
    <div className="flex grow mx-3 lg:mx-0 px-8 py-8 rounded-[35px] bg-[#F3F3F3]">
      {children}
    </div>
  </div>
)

const PageDescription = () => (
  <h1 className={`${mainFont} text-xl md:text-2xl lg:text-[27px]`}>
    Data to help artists price their work and collectors determine a fair price
    to pay
  </h1>
)

const TokensSoldPriceChart = () => {
  const { status, data, error } = useGQLQuery(
    ['latest_day_soldtokens'],
    GET_LATEST_DAY_SOLDTOKENS,
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

  console.log('data', data)

  const dataInXTZ = data.getLatestDaySoldTokens.map(
    (item: { price: any; amount: any }) => ({
      price: (parseFloat(item.price) / 1000000).toFixed(2),
      amount: item.amount,
    })
  )

  const range0To1XTZ = dataInXTZ.filter((item: any) => item.price <= 1)

  const totalAmount0To1XTZ = range0To1XTZ.reduce(
    (acc: any, curr: any) => acc + curr.amount,
    0
  )
  // console.log('range0To1XTZ', range0To1XTZ)
  // console.log('totalAmount0To1XTZ', totalAmount0To1XTZ)

  const range1To5XTZ = dataInXTZ.filter(
    (item: any) => item.price > 1 && item.price <= 5
  )
  const totalAmount1To5XTZ = range1To5XTZ.reduce(
    (acc: any, curr: any) => acc + curr.amount,
    0
  )

  const priceRange = [
    {
      label: '0 to 1 XTZ',
      amountSold: totalAmount0To1XTZ,
    },
    {
      label: '1 to 5 XTZ',
      amountSold: totalAmount1To5XTZ,
    },
  ]

  const priceRangeData = {
    labels: priceRange.map((row: { label: any }) => row.label),
    datasets: [
      {
        label: 'Price Range of Tokens Sold in XTZ',
        data: priceRange.map((row: { amountSold: any }) => row.amountSold),
        backgroundColor: ['rgba(75,192,192,1)', 'rgba(25,92,192,1)'],
        borderColor: 'white',
        borderWidth: 3,
      },
    ],
  }

  // Sold tokens data for line chart
  // const soldTokensData = {
  //   labels: dataInXTZ.map((row: { price: any }) => row.price),
  //   // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  //   datasets: [
  //     {
  //       label: dataInXTZ.map((row: { price: any }) => row.price),
  //       data: dataInXTZ.map((row: { amount: any }) => row.amount),
  //     },
  //   ],
  // }

  return (
    <div className="relative h-auto w-[250px] md:w-[500px] mx-auto bg-blue-200">
      <h2 style={{ textAlign: 'center' }}>Pie Chart</h2>
      <Pie
        data={priceRangeData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Price Range of Tokens Sold in XTZ',
            },
            legend: {
              display: true,
            },
          },
        }}
      />

      {/* <canvas id="acquisitions" /> */}
      {/* <h2 style={{ textAlign: 'center' }}>Line Chart</h2>
      <Line
        data={soldTokensData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          scales: {
            y: {
              type: 'logarithmic',
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Price of tokens sold last day',
            },
            legend: {
              display: false,
            },
          },
        }}
      /> */}
    </div>
  )
}

const Home: NextPage = () => (
  <>
    <Head>
      <title>Tagbits</title>
    </Head>
    <TopImage />
    {/* <div>
      <div
        className={`mt-4 md:mt-10 ${mainFont} text-2xl md:text-3xl lg:text-4xl ${centerContainerOnly} max-w-[960px] px-4 justify-start`}
      >
        <h1>Top 100 collectors on objkt.com by one day volume</h1>
      </div>
    </div> */}
    <ContentCard>
      <PageDescription />
    </ContentCard>
    <ContentCard>
      <TokensSoldPriceChart />
    </ContentCard>
    <Data />
    <div
      className={`${centerStyle} mt-20 pb-0 ${mainFont} text-2xl hover:underline`}
    >
      <Link href="/">Return to top</Link>
    </div>
  </>
)

export default Home
