/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Image from 'next/image'
// import FutureImage from 'next/future/image'

// import { useQuery } from '@tanstack/react-query'

// used for graphql request to objkt api
// import request from 'graphql-request'

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
  defaults,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

// import z from 'zod'
import useGQLQuery from '../../../graphql/useGQLQuery'
import { GET_LATEST_DAY_SOLDTOKENS } from '../../queries'

// graphql imports
// import top100Collectors1DayQueryDocument from '../queries-collectors'
// import CollectorInfo from './collectors/components/collectorInfo'
// import LatestCollection from './collectors/components/latestCollection'

// Image Imports
import City from '../index-images/City_Bkg.png'
import City_Mobile from '../index-images/City_Bkg_Mobile.png'

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

// set chart defaults
defaults.font.size = 21

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

// const Data = () => {
//   const { data, status, error } = useQuery({
//     queryKey: ['top-100-collectors-1-day'],
//     queryFn: async () =>
//       request(
//         'https://data.objkt.com/v3/graphql',
//         top100Collectors1DayQueryDocument
//       ),
//   })

//   const containerStyle = `flex items justify-center mt-10 text-2xl ${mainFont}`

//   if (status === 'loading') {
//     return <h1 className={containerStyle}>Loading ...</h1>
//   }

//   if (status === 'error') {
//     if (error instanceof Error) {
//       return <h1 className={containerStyle}>Error: {error.message}</h1>
//     }

//     console.log('Error not an instance of error: ', error)
//     return <h1 className={containerStyle}>An unexpected error occured</h1>
//   }

//   // console.log('data', data.sales_stat)

//   return (
//     <>
//       {data.sales_stat.map((collector: any) => (
//         <div key={`${collector.subject.address}`}>
//           {collector && (
//             <CollectorInfo
//               key={`${collector.subject.address}-info`}
//               collector={collector}
//             />
//           )}
//           {collector && (
//             <LatestCollection
//               key={`${collector.subject.address}-collection`}
//               collector={collector}
//             />
//           )}
//         </div>
//       ))}
//     </>
//   )
// }

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
  const { status, data, error }: { status: string, data: any, error: any } = useGQLQuery(
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

  // console.log('data', data)

  const dataInXTZ: any = data.getLatestDaySoldTokens.map(
    (item: { price: any; amount: any }) => ({
      price: (parseFloat(item.price) / 1000000).toFixed(2),
      amount: item.amount,
    })
  )

  const totalAmount = dataInXTZ.reduce(
    (acc: any, curr: any) => acc + curr.amount,
    0
  )

  // console.log('total amount: ', totalAmount)

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

  const range5To10XTZ = dataInXTZ.filter(
    (item: any) => item.price > 5 && item.price <= 10
  )
  const totalAmount5To10XTZ = range5To10XTZ.reduce(
    (acc: any, curr: any) => acc + curr.amount,
    0
  )

  const range10To50XTZ = dataInXTZ.filter(
    (item: any) => item.price > 10 && item.price <= 50
  )
  const totalAmount10To50XTZ = range10To50XTZ.reduce(
    (acc: any, curr: any) => acc + curr.amount,
    0
  )

  const range50To100XTZ = dataInXTZ.filter(
    (item: any) => item.price > 50 && item.price <= 100
  )
  const totalAmount50To100XTZ = range50To100XTZ.reduce(
    (acc: any, curr: any) => acc + curr.amount,
    0
  )

  const range100To500XTZ = dataInXTZ.filter(
    (item: any) => item.price > 100 && item.price <= 500
  )
  const totalAmount100To500XTZ = range100To500XTZ.reduce(
    (acc: any, curr: any) => acc + curr.amount,
    0
  )

  const range500To1000XTZ = dataInXTZ.filter(
    (item: any) => item.price > 500 && item.price <= 1000
  )
  const totalAmount500To1000XTZ = range500To1000XTZ.reduce(
    (acc: any, curr: any) => acc + curr.amount,
    0
  )

  const rangeOver1000XTZ = dataInXTZ.filter((item: any) => item.price > 1000)
  const totalAmountOver1000XTZ = rangeOver1000XTZ.reduce(
    (acc: any, curr: any) => acc + curr.amount,
    0
  )

  const priceRange = [
    {
      label: `0 to 1 XTZ`,
      amountSold: totalAmount0To1XTZ,
    },
    {
      label: `1 to 5 XTZ`,
      amountSold: totalAmount1To5XTZ,
    },
    {
      label: `5 to 10 XTZ`,
      amountSold: totalAmount5To10XTZ,
    },
    {
      label: `10 to 50 XTZ`,
      amountSold: totalAmount10To50XTZ,
    },
    {
      label: `50 to 100 XTZ`,
      amountSold: totalAmount50To100XTZ,
    },
    {
      label: `100 to 500 XTZ`,
      amountSold: totalAmount100To500XTZ,
    },
    {
      label: `500 to 1000 XTZ`,
      amountSold: totalAmount500To1000XTZ,
    },
    {
      label: `Over 1000 XTZ`,
      amountSold: totalAmountOver1000XTZ,
    },
  ]

  const priceRangeData = {
    labels: priceRange.map((row: { label: any }) => row.label),
    datasets: [
      {
        label: 'Price Range of Tokens Sold in XTZ',
        data: priceRange.map((row: { amountSold: any }) => row.amountSold),
        backgroundColor: [
          '#465B90',
          '#B06868',
          '#7DA863',
          '#67518A',
          '#894A83',
          '#B69059',
          '#6BADC2',
          '#A06BA1',
        ],
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
    <div className="relative h-auto w-auto md:w-[650px] mx-auto">
      <h2 className={`text-center ${mainFont} text-[25px] md:text-[30px] mb-8`}>
        Pieces sold last day by price range
      </h2>
      <div className="w-auto md:w-[400px] mx-auto">
        <Pie
          data={priceRangeData}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Price Range of Tokens Sold in XTZ',
              },
              legend: {
                display: false,
                position: 'bottom',
                labels: {
                  color: '#505050',
                  boxWidth: 15,
                  padding: 20,
                },
              },
            },
          }}
        />
      </div>

      <div className="mt-6 mb-8">
        <div className="text-center mx-auto">
          <div className="inline-block bg-[#465B90] w-6 h-6 mr-5 -mb-[6px]" />
          <h2 className={`inline-block ${mainFont} text-[20px]`}>
            0 to 1 XTZ: {totalAmount0To1XTZ} (
            {((totalAmount0To1XTZ / totalAmount) * 100).toFixed(2)}%)
          </h2>
        </div>

        <div className="text-center mx-auto mt-2">
          <div className="inline-block bg-[#B06868] w-6 h-6 mr-5 -mb-[6px]" />
          <h2 className={`inline-block ${mainFont} text-[20px]`}>
            1 to 5 XTZ: {totalAmount1To5XTZ} (
            {((totalAmount1To5XTZ / totalAmount) * 100).toFixed(2)}%)
          </h2>
        </div>

        <div className="text-center mx-auto mt-2">
          <div className="inline-block bg-[#7DA863] w-6 h-6 mr-5 -mb-[6px]" />
          <h2 className={`inline-block ${mainFont} text-[20px]`}>
            5 to 10 XTZ: {totalAmount5To10XTZ} (
            {((totalAmount5To10XTZ / totalAmount) * 100).toFixed(2)}%)
          </h2>
        </div>

        <div className="text-center mx-auto mt-2">
          <div className="inline-block bg-[#67518A] w-6 h-6 mr-5 -mb-[6px]" />
          <h2 className={`inline-block ${mainFont} text-[20px]`}>
            10 to 50 XTZ: {totalAmount10To50XTZ} (
            {((totalAmount10To50XTZ / totalAmount) * 100).toFixed(2)}%)
          </h2>
        </div>

        <div className="text-center mx-auto mt-2">
          <div className="inline-block bg-[#894A83] w-6 h-6 mr-5 -mb-[6px]" />
          <h2 className={`inline-block ${mainFont} text-[20px]`}>
            50 to 100 XTZ: {totalAmount50To100XTZ} (
            {((totalAmount50To100XTZ / totalAmount) * 100).toFixed(2)}%)
          </h2>
        </div>

        <div className="text-center mx-auto mt-2">
          <div className="inline-block bg-[#B69059] w-6 h-6 mr-5 -mb-[6px]" />
          <h2 className={`inline-block ${mainFont} text-[20px]`}>
            100 to 500 XTZ: {totalAmount100To500XTZ} (
            {((totalAmount100To500XTZ / totalAmount) * 100).toFixed(2)}%)
          </h2>
        </div>

        <div className="text-center mx-auto mt-2">
          <div className="inline-block bg-[#6BADC2] w-6 h-6 mr-5 -mb-[6px]" />
          <h2 className={`inline-block ${mainFont} text-[20px]`}>
            500 to 1000 XTZ: {totalAmount500To1000XTZ} (
            {((totalAmount500To1000XTZ / totalAmount) * 100).toFixed(2)}%)
          </h2>
        </div>

        <div className="text-center mx-auto mt-2">
          <div className="inline-block bg-[#A06BA1] w-6 h-6 mr-5 -mb-[6px]" />
          <h2 className={`inline-block ${mainFont} text-[20px]`}>
            Over 1000 XTZ: {totalAmountOver1000XTZ} (
            {((totalAmountOver1000XTZ / totalAmount) * 100).toFixed(2)}%)
          </h2>
        </div>
      </div>
      
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
    {/* <Data /> */}
    <div
      className={`${centerStyle} mt-20 pb-0 ${mainFont} text-2xl hover:underline`}
    >
      <Link href="/price">Return to top</Link>
    </div>
  </>
)

export default Home
