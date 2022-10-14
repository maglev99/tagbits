/* eslint-disable react/prop-types */
import React from 'react'
import Link from 'next/link'

import Image from 'next/image'

import TagbitsLogo from '../index-images/Tagbits_Logo.png'

type Props = {
  children: any
}

const mainFont = 'font-dotGothic text-tb-text antialiased font-normal'

// style for centering elements horizontally with max width
const centerStyle = 'max-w-[1200px] flex justify-center mx-auto'
// const centerContainerOnly = 'max-w-[1200px] flex mx-auto'
// const centerStyle = 'bg-blue-200 max-w-[1200px] flex justify-center mx-auto'

const Nav = () => (
  <div className="z-10 top-0 flex items justify-start pt-4 ml-4 text-lg w-[250px] md:w-full lg:max-w-[1200px] lg:justify-start lg:mx-auto lg:pl-2">
    <Link href="/">
      {/* use button to wrap Image to avoid nextjs link and a tag errors */}
      <button type="button">
        <Image
          src={TagbitsLogo}
          alt="Logo"
          className="pointer-events-auto cursor-pointer"
        />
      </button>
    </Link>
    <div
      className={`${mainFont} text-xl mt-[10px] ml-6 hover:underline md:text-2xl md:ml-10 md:mt-[12px]`}
    >
      <a
        href="https://twitter.com/TagbitsXYZ"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
    </div>
    {/* <div
      className={`${mainFont} text-xl mt-[10px] ml-6 hover:underline md:text-2xl md:ml-10 md:mt-[12px]`}
    >
      <a href="/" target="_blank" rel="noopener noreferrer">
        Discord
      </a>
    </div> */}
  </div>
)

const Footer = () => (
  <>
    <footer className={`${centerStyle} mt-28 ${mainFont} text-2xl`}>
      © 2022, Lands Software Inc.
    </footer>
    <div className={`${centerStyle} mt-6 pb-[100px] ${mainFont} text-lg`}>
      <div>
        <a
          href="https://chiseled-asteroid-e55.notion.site/Terms-of-Service-e23a61e6f1f54bc0b40bb2f7e2ffe72c"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Terms of Service
        </a>{' '}
        |{' '}
        <a
          href="https://chiseled-asteroid-e55.notion.site/Privacy-Policy-e5456aef63fa4ffc866028e0d7a28ce8"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  </>
)

const Layout = ({ children }: Props) => (
  <div className="h-screen bg-tb-background">
    {/* h-screen so that background color covers entire screen if content length shorter than screen size */}
    <div className="h-max bg-tb-background">
      {/* h-max so that background color covers content that overflows screen size */}
      <Nav />
      {children}
			<Footer />
    </div>
  </div>
)

export default Layout
