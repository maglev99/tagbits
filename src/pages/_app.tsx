/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import '../styles/globals.css'
import type { AppType } from 'next/dist/shared/lib/utils'
// import Car from './test-pages/cars/[id]'

import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'

// eslint-disable-next-line react/prop-types
const MyApp: AppType = ({ Component, pageProps }) => (
  <ApolloProvider client={apolloClient}>
    <Component {...pageProps} />
  </ApolloProvider>
)

export default MyApp
