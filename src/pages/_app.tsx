/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import '../styles/globals.css'
import type { AppType } from 'next/dist/shared/lib/utils'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

// eslint-disable-next-line react/prop-types
const MyApp: AppType = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

export default MyApp
