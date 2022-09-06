import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const FirstPost = () => (
  <>
     <Head>
        <title>First Post</title>
      </Head>
    <h1>
      <Link href="/">Home</Link>
    </h1>
    <h1>
      First Post, <Link href="/test-pages/second-post">Second Post</Link>
    </h1>
  </>
)

export default FirstPost
