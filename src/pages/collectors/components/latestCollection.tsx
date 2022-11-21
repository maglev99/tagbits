import React, { useState } from 'react'
import FutureImage from 'next/future/image'

const mainFont = 'font-dotGothic text-tb-text antialiased font-normal'
const centerContainerOnly = 'max-w-[1200px] flex mx-auto'

const LatestCollection = ({ collector }: any) => {
  const [rank] = useState(collector.rank)
  const [collection] = useState(collector.subject.events_recipient)

  const tempval = 1
  const containerStyle = `flex items justify-center mt-10 text-2xl ${mainFont} bg-gray-200`

  console.log('collection', collection)

  const replaceIPFSLink = (link: string) => {
    // console.log("IPFS link", link)
    // console.log("IPFS link type", typeof(link))
    if (link !== null && typeof link !== 'undefined') {
      // replace link with correct header for loading directly from image
      const newLink = link.replaceAll('ipfs://', 'https://ipfs.io/ipfs/')
      console.log('link', newLink)
      return newLink
    }
    return ''
  }

  const imageSize = '300'

  return (
    <div className={`${containerStyle} flex`} key={`${rank}-collection`}>
      <div
        className={`${centerContainerOnly} max-w-[960px] grow items-center grid grid-cols-3 md:grid-cols-5 gap-3 mx-3 lg:mx-0 bg-blue-200`}
      >

        {collection.map((item: any, index: any) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`${item.fa_contract}-${index}`}>
            <a
              href={`https://objkt.com/asset/${item.fa_contract}/${item.token.token_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FutureImage
                unoptimized
                src={replaceIPFSLink(item.token.display_uri)}
                alt={item.token.display_uri}
                width={imageSize}
                height={imageSize}
                // className={`w-[${profilePicSize}px] h-[${profilePicSize}px] object-cover`} // set invisible for debugging
                // onError={() => onErrorFunction()}
                // onLoadingComplete={() => setVisibility('')}
              />
            </a>
						<a
              href={`https://objkt.com/asset/${item.fa_contract}/${item.token.token_id}`}
              target="_blank"
              rel="noopener noreferrer"
							className='hover:underline'
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
