import React from 'react'
import '../styles/globals.css'
import type { AppType } from 'next/dist/shared/lib/utils'
// import Car from './test-pages/cars/[id]'

// eslint-disable-next-line react/prop-types
const MyApp: AppType = ({ Component, pageProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Component {...pageProps} />
)

export default MyApp
