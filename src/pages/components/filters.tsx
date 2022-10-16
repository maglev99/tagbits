/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const centerContainerOnly = 'max-w-[1200px] flex mx-auto'
const filterButtonStyle = 'font-sans font-light mr-2 px-3 py-2 text-xl rounded-xl my-2 text-tb-text hover:bg-[#D4D4D4]'

const activeFilterStyle = 'border-solid border-2 border-tb-text bg-[#D4D4D4]'
const inactiveFilterStyle = 'border-solid border-2 border-tb-background'

const Filters = () => {
	const router = useRouter()

	return (
  <div
    className={`${centerContainerOnly} max-w-[960px] pl-4 justify-start my-8`}
  >
    <div>
      <Link href="/"><a className={`${filterButtonStyle} ${router.pathname === "/" ? activeFilterStyle : inactiveFilterStyle}`}>Last Hour</a></Link>
    </div>
    <div>
      <Link href="/last-24-hours"><a className={`${filterButtonStyle} ${router.pathname === "/last-24-hours" ? activeFilterStyle : inactiveFilterStyle}`}>Last 24 Hours</a></Link>
    </div>
  </div>
	)
}

export default Filters