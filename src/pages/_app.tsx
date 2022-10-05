/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import '../styles/globals.css'
import type { AppType } from 'next/dist/shared/lib/utils'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Script from 'next/script'

// Create a client
const queryClient = new QueryClient()

// eslint-disable-next-line react/prop-types
const MyApp: AppType = ({ Component, pageProps }) => (
  <>
  {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL &&
    process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
      <Script
        src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        strategy="lazyOnload"
      />
    )}
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  </>
)

export default MyApp
