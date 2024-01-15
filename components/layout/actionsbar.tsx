'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ActionsBar() {
  return (
    <div className='flex items-start flex-col h-[100dvh] w-[55px] py-2 border-r-2 border-gray-800'>
      <div className='items-center text-center w-full mb-3 p-1'>
        <Image unoptimized src="/assets/images/logo-infold-black.png" alt="InFold - logo" width={42} height={42} className="rounded m-auto" />
      </div>
      <div className='items-center text-center w-full mb-2 p-3 hover:dark:bg-gray-800 hover:dark:bg-opacity-60 cursor-pointer'>
        <i className='fad fa-terminal text-xl text-white'></i>
      </div>
      <div className='items-center text-center w-full mb-2 p-2 p-3 hover:dark:bg-gray-800 hover:dark:bg-opacity-60 cursor-pointer'>
        <i className='fad fa-user-friends text-xl text-white'></i>
      </div>
      <div className='items-center text-center w-full mt-auto p-2'>
        <Link href="https://infold.medium.com/a-lot-of-knowledge-is-a-dangerous-thing-6a4d2560cc83" target="_blank"
          title='Read more on our Medium'
          className="items-center text-center w-full">
          <i className='fab fa-medium text-2xl text-white' />
        </Link>
      </div>
    </div>
  )
}
