'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ActionsBar() {
  return (
    <div className='flex items-start flex-col h-[100dvh] w-[55px] py-2 border-r-2 border-gray-200 dark:border-gray-800 sticky left-0 z-40 relative bg-gray-100 dark:bg-black'>
      <div className='items-center text-center w-full mb-3 p-1'>
        <Image unoptimized src="/assets/images/logo-infold-black.png" alt="InFold - logo" width={42} height={42} className="rounded m-auto" />
      </div>
      <div className='items-center text-center w-full mb-2 p-3 hover:bg-gray-200 hover:dark:bg-gray-800 hover:dark:bg-opacity-60 cursor-pointer group'>
        <i className='fad fa-terminal text-xl text-black dark:text-white group-hover:text-blue-600 group-hover:dark:text-blue-300'></i>
      </div>
      <div className='items-center text-center w-full mb-2 p-2 p-3 hover:bg-gray-200 hover:dark:bg-gray-800 hover:dark:bg-opacity-60 cursor-pointer group'>
        <i className='fad fa-user-friends text-xl text-black dark:text-white group-hover:text-blue-600 group-hover:dark:text-blue-300'></i>
      </div>
      <div className='flex flex-col items-center mt-auto text-center w-full'>
        <div className='items-center text-center w-full mt-auto p-2 mb-1'>
          <Link href='/about' target="_self"
            title='About InFold'
            className={`items-center text-center w-full`}>
            <i className='fad fa-question text-xl text-black dark:text-white' />
 
          </Link>
        </div>
        <div className='items-center text-center w-full mt-auto p-2 mb-2'>
          <Link href="https://infold.medium.com/a-lot-of-knowledge-is-a-dangerous-thing-6a4d2560cc83" target="_blank"
            title='Read more on our Medium'
            className="items-center text-center w-full">
            <i className='fab fa-medium text-2xl text-black dark:text-white' />
          </Link>
        </div>
      </div>
    </div>
  )
}
