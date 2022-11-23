import React from 'react'

const centerContainerOnly = 'max-w-[1200px] flex mx-auto'
const mainFont = 'font-dotGothic text-tb-text antialiased font-normal'

const Tagline = () => (
		<>
		<div className={`mt-4 md:mt-10 ${mainFont} text-2xl md:text-3xl lg:text-4xl ${centerContainerOnly} max-w-[960px] px-4 justify-start`}>
			<h1>Find out what artists are minting</h1>
		</div>
     {/* use antialiased or text blurry with DotGothic16 font */}
		 <div className={`mt-3 md:mt-6 ${mainFont} text-xl md:text-2xl lg:text-3xl ${centerContainerOnly} max-w-[960px] px-4 justify-start`}>
		 {/* div tag wraps h1 tag so spacing between link and other words don't collapse in flexbox */}
		 <h1>
			 All tags indexed on{' '}
			 <a
				 href="https://objkt.com"
				 target="_blank"
				 rel="noopener noreferrer"
				 className="hover:underline"
			 >
				 objkt.com
			 </a>{' '}
		 </h1>
	 </div>
	 </>
	)

	export default Tagline