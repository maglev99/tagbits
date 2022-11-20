/* eslint-disable no-nested-ternary */
import React, { Fragment, useState } from 'react'
// import type { NextPage } from 'next'
// import Link from 'next/link'
// import Head from 'next/head'

import FutureImage from 'next/future/image'
import TwitterLogo from '../../app-icons/twitter-logo-128.png'

const mainFont = 'font-dotGothic text-tb-text antialiased font-normal'
const centerContainerOnly = 'max-w-[1200px] flex mx-auto'

const ProfilePicture = ({
  profilePic,
  walletAddress,
  onErrorFunction,
}: any) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const loaderStyle =
    'bg-blue-700 after:block after:shadow-[0_0_150px_80px_rgba(254,254,254)] after:animate-[load_2.5s_infinite]' // after:animate-[load_1s_infinite]

  const [visibility, setVisibility] = useState(`${loaderStyle}`)

  const profilePicSize = 60

  return (
    <div
      data-placeholder
      className={`overflow-hidden mx-1 w-[${profilePicSize}px] h-[${profilePicSize}px] rounded-full ${visibility}`}
    >
      <a
        href={`https://objkt.com/profile/${walletAddress}/activity`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FutureImage
          src={profilePic}
          alt="Profile Photo"
          width={profilePicSize}
          height={profilePicSize}
          className={`w-[${profilePicSize}px] h-[${profilePicSize}px] object-cover`} // set invisible for debugging
          onError={() => onErrorFunction()}
          onLoadingComplete={() => setVisibility('')}
        />
      </a>
    </div>
  )
}

const ProfilePictureMobile = ({
  profilePic,
  walletAddress,
  onErrorFunction,
}: any) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const loaderStyle =
    'bg-blue-700 after:block after:shadow-[0_0_150px_80px_rgba(254,254,254)] after:animate-[load_2.5s_infinite]' // after:animate-[load_1s_infinite]

  const [visibility, setVisibility] = useState(`${loaderStyle}`)

  const profilePicSize = 50

  return (
    <div
      data-placeholder
      className={`overflow-hidden mx-1 w-[${profilePicSize}px] h-[${profilePicSize}px] rounded-full ${visibility}`}
    >
      <a
        href={`https://objkt.com/profile/${walletAddress}/activity`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FutureImage
          src={profilePic}
          alt="Profile Photo"
          width={profilePicSize}
          height={profilePicSize}
          className={`w-[${profilePicSize}px] h-[${profilePicSize}px] object-cover`} // set invisible for debugging
          onError={() => onErrorFunction()}
          onLoadingComplete={() => setVisibility('')}
        />
      </a>
    </div>
  )
}

const TwitterIcon = ({ twitterURL, iconSize }: any) => (
  <div className={`ml-4 w-[${iconSize}px] h-[${iconSize}px]`}>
    <a href={twitterURL} target="_blank" rel="noopener noreferrer">
      <FutureImage
        src={TwitterLogo}
        alt="Twitter"
        width={iconSize}
        height={iconSize}
      />
    </a>
  </div>
)

const CollectorInfo = ({ collector }: any) => {
  const rowDataStyle = `bg-green-200`
  const containerStyle = `flex items justify-center mt-10 text-2xl ${mainFont} bg-gray-200`

  const [rank] = useState(collector.rank)
  const [profilePic, setProfilePic] = useState(collector.subject.logo)
  const [nickname] = useState(collector.subject.alias)
  const [tzDomain] = useState(collector.subject.tzdomain)
  const [twitter] = useState(collector.subject.twitter)
  const [walletAddress] = useState(collector.subject.address)
  const [volume] = useState(collector.volume)

  // clear image link for images that can't load
  const clearImageLink = () => {
    // console.log('clear image link called')
    setProfilePic('')
  }

  const iconSize = '30'

  const defaultTzktProfilePic = `${'https://services.tzkt.io/v1/avatars/'}${walletAddress}`

  return (
    <>
      {/* mobile view */}
      <div className={`${containerStyle} md:hidden`} key={`${rank}-info-mobile`}>
        <div
          className={`${centerContainerOnly} max-w-[960px] grow items-center bg-blue-200`}
        >
          <h1 className={`${rowDataStyle} w-11 ml-4`}>{rank}.</h1>
          {profilePic !== null &&
          profilePic !== 'N/A' &&
          profilePic.slice(0, 21) === 'https://pbs.twimg.com' ? (
            <ProfilePictureMobile
              profilePic={profilePic}
              walletAddress={walletAddress}
              onErrorFunction={clearImageLink}
            />
          ) : (
            <ProfilePictureMobile
              profilePic={defaultTzktProfilePic}
              walletAddress={walletAddress}
              onErrorFunction={null}
            />
          )}
          <a
            href={`https://objkt.com/profile/${walletAddress}/activity`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* if have alias display alias (nickname), else if have tzdomain display tzdomain, else display shortened address */}
            {nickname !== null && nickname.trim().length > 0 ? (
              <h1 className={`${rowDataStyle} hover:underline ml-2`}>
                {nickname}
              </h1>
            ) : tzDomain !== null && tzDomain.trim().length > 0 ? (
              <h1 className={`${rowDataStyle} hover:underline ml-2`}>
                {tzDomain}
              </h1>
            ) : (
              <h1
                className={`${rowDataStyle} hover:underline ml-2`}
              >{`${walletAddress.slice(0, 5)}...${walletAddress.slice(
                -5
              )}`}</h1>
            )}
          </a>
        </div>
      </div>
      <div className={`${containerStyle} md:hidden`} key={`${rank}-volume-mobile`}>
        <div
          className={`${centerContainerOnly} -mt-6 max-w-[960px] grow items-center bg-blue-200`}
        >
          <div className={`${rowDataStyle} ml-4 mr-1`}>
            Volume: {(parseFloat(volume) / 1000000).toFixed(2)} XTZ
          </div>
					{twitter !== null && (
            <TwitterIcon twitterURL={twitter} iconSize={iconSize} />
          )}
        </div>
      </div>

      {/* tablet and desktop view */}
      <div className={`${containerStyle} hidden md:flex`} key={`${rank}-info`}>
        <div
          className={`${centerContainerOnly} max-w-[960px] grow items-center bg-blue-200`}
        >
          <h1 className={`${rowDataStyle} w-11`}>{rank}.</h1>
          {profilePic !== null &&
          profilePic !== 'N/A' &&
          profilePic.slice(0, 21) === 'https://pbs.twimg.com' ? (
            <ProfilePicture
              profilePic={profilePic}
              walletAddress={walletAddress}
              onErrorFunction={clearImageLink}
            />
          ) : (
            <ProfilePicture
              profilePic={defaultTzktProfilePic}
              walletAddress={walletAddress}
              onErrorFunction={null}
            />
          )}
          <a
            href={`https://objkt.com/profile/${walletAddress}/activity`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* if have alias display alias (nickname), else if have tzdomain display tzdomain, else display shortened address */}
            {nickname !== null && nickname.trim().length > 0 ? (
              <h1 className={`${rowDataStyle} hover:underline ml-2`}>
                {nickname}
              </h1>
            ) : tzDomain !== null && tzDomain.trim().length > 0 ? (
              <h1 className={`${rowDataStyle} hover:underline ml-2`}>
                {tzDomain}
              </h1>
            ) : (
              <h1
                className={`${rowDataStyle} hover:underline ml-2`}
              >{`${walletAddress.slice(0, 5)}...${walletAddress.slice(
                -5
              )}`}</h1>
            )}
          </a>
          {twitter !== null && (
            <TwitterIcon twitterURL={twitter} iconSize={iconSize} />
          )}
          <div className={`${rowDataStyle} mr-0 ml-auto`}>
            Volume: {(parseFloat(volume) / 1000000).toFixed(2)} XTZ
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectorInfo
