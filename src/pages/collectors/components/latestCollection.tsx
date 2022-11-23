/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect, useRef } from 'react'
// import FutureImage from 'next/future/image'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const mainFont = 'font-dotGothic text-tb-text antialiased font-normal'
const centerContainerOnly = 'max-w-[1200px] flex mx-auto'

const ImageLoader = ({ item }: any) => {
  const imageSize = '300'
  const loadCount = useRef(0)
  const imageLoaded = useRef(false)

  const reloadImage = () => {
    if (loadCount.current < 3) {
      if (imageLoaded.current === true) {
        return
      }
      loadCount.current += 1

      // console.log('image reloded, loadCount: ', loadCount.current)
      // console.log('reloded image: ', item.token.name)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      callMyTimeOut()
    } else if (imageLoaded.current === false) {
      // console.log('display url failed to load for: ', item.token.name)
      // console.log('switching to artiface url instead')
      setImageURL(switchToArtifactURI(item.token))
    }
  }

  const myTimeout = () => setTimeout(reloadImage, 2000)

  const callMyTimeOut = () => myTimeout()

  const onImageLoaded = () => {
    imageLoaded.current = true
    clearTimeout(myTimeout())
    // console.log('timeout cleared')
  }

  // switch to artifactURI if display_uri can't be loaded
  const switchToArtifactURI = (token: any) => {
    const newLink = token.artifact_uri.replaceAll(
      'ipfs://',
      'https://ipfs.io/ipfs/'
    )
    return newLink
  }

  const retryLoadOnError = () => {
    setImageURL(switchToArtifactURI(item.token))
    // console.log('error occured, switching to artiface url instead for token: ', item.token.name)
  }

  const replaceIPFSLink = (token: any) => {
    if (
      token.display_uri !== null &&
      typeof token.display_uri !== 'undefined'
    ) {
      // replace link with correct header for loading directly from image
      const newLink = token.display_uri.replaceAll(
        'ipfs://',
        'https://ipfs.io/ipfs/'
      )
      return newLink
    }

    // if display_uri is null use artifact_uri
    // replace link with correct header for loading directly from image
    const newLink = token.artifact_uri.replaceAll(
      'ipfs://',
      'https://ipfs.io/ipfs/'
    )
    return newLink
  }

  const [imageURL, setImageURL] = useState(replaceIPFSLink(item.token))

  return (
    // <FutureImage
    //   key={`${loadCount}`}
    // 	src={imageURL}
    // 	loader={({ src }) => src}
    //   alt="Image"
    //   width={imageSize}
    //   height={imageSize}
    //   // className={`w-[${profilePicSize}px] h-[${profilePicSize}px] object-cover`} // set invisible for debugging
    //   // onError={() => retryLoadOnError()}
    //   // onLoadingComplete={() => clearMyTimeOut()}
    // />

    <LazyLoadImage
      alt="Image"
      height={imageSize}
      src={imageURL} // use normal <img> attributes as props
      width={imageSize}
      beforeLoad={() => callMyTimeOut()}
      afterLoad={() => onImageLoaded()}
      onError={() => retryLoadOnError()}
    />
  )
}

const LatestCollection = ({ collector }: any) => {
  const [rank] = useState(collector.rank)
  const [collection] = useState(collector.subject.events_recipient)

  const containerStyle = `flex items justify-center mt-10 text-2xl ${mainFont}`

  return (
    <div className={`${containerStyle} flex`} key={`${rank}-collection`}>
      <div
        className={`${centerContainerOnly} max-w-[960px] grow items-center grid grid-cols-3 md:grid-cols-5 gap-3 mx-3 lg:mx-0 `}
      >
        {collection.map((item: any, index: any) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`${item.fa_contract}-${index}`}>
            <a
              href={`https://objkt.com/asset/${item.fa_contract}/${item.token.token_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageLoader item={item} />
            </a>
            <a
              href={`https://objkt.com/asset/${item.fa_contract}/${item.token.token_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <h1 className="text-[17px] break-all">{item.token.name}</h1>
              <h1 className="text-[17px] break-all">
                for {(parseFloat(item.price) / 1000000).toFixed(2)} XTZ
              </h1>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
