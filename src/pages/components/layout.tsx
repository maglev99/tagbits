/* eslint-disable react/prop-types */
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import FutureImage from 'next/future/image'

import TagbitsLogo from '../index-images/Tagbits_Logo.png'
import TwitterLogo from '../app-icons/twitter-logo-128.png'

type Props = {
  children: any
}

const mainFont = 'font-dotGothic text-tb-text antialiased font-normal'

// style for centering elements horizontally with max width
const centerStyle = 'max-w-[1200px] flex justify-center mx-auto'
// const centerContainerOnly = 'max-w-[1200px] flex mx-auto'
// const centerStyle = 'bg-blue-200 max-w-[1200px] flex justify-center mx-auto'

// style used if current page is active link
const activeLinkStyle = 'underline'

const Nav = () => {
  const router = useRouter()

  return (
    <div className="z-10 top-0 grid grid-cols-2 pt-4 px-4 text-lg md:w-full lg:max-w-[1200px]  lg:mx-auto lg:pl-2">
      <div className="justify-self-start">
        <Link href="/">
          {/* use button to wrap Image to avoid nextjs link and a tag errors */}
          <button type="button">
            <FutureImage
              src={TagbitsLogo}
              alt="Logo"
              className="pointer-events-auto cursor-pointer"
            />
          </button>
        </Link>
        <div
          className={`${mainFont} text-xl mt-[10px] hover:underline md:text-2xl md:ml-10 md:mt-[7px] md:inline-flex align-top pt-[7px]`}
        >
          <a
            href="https://twitter.com/TagbitsXYZ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FutureImage
              src={TwitterLogo}
              alt="Twitter"
              width={35}
              height={35}
              className="ml-2 mr-auto md:ml-0"
            />
          </a>
        </div>
      </div>
      <div
        className={`${mainFont} text-xl mt-[10px] justify-self-end md:text-2xl md:ml-10 md:mt-[12px] pt-[6px] mr-2 
      md:inline-flex`}
      >
        <Link href="/">
          <h1
            className={`md:mr-12 cursor-pointer hover:underline ${
              router.pathname === '/' ? activeLinkStyle : ''
            }`}
          >
            Collectors
          </h1>
        </Link>
        <Link href="/tags">
          <h1 className={`md:mr-12 cursor-pointer hover:underline mt-6 md:mt-0 ${(router.pathname === '/tags' || router.pathname === '/tags/last-24-hours') ? activeLinkStyle : ''}`}>
            Tags
          </h1>
        </Link>
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
}

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
