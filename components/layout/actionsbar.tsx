'use client'

import Image from 'next/image'
import Link from 'next/link'

import Tooltip from '@/components/helpers/tooltip'

export default function ActionsBar({ addNewFeed }: { addNewFeed: any }) {
  return (
    <div className='flex items-start flex-col h-[100dvh] w-[55px] py-2 border-r-2 border-gray-200 dark:border-gray-800 sticky left-0 z-40 bg-gray-100 dark:bg-black text-center'>
      <div className='items-center text-center w-full mb-3 p-1'>
        <Image unoptimized src='/assets/images/logo-infold-black.png' alt='InFold - logo' width={42} height={42} className='rounded m-auto' />
      </div>
      <Tooltip message={'Add new Feed'} left={16} top={3} padding={1} minWidth={103}>
        <div className='items-center text-center w-full mb-2 p-3 hover:bg-gray-200 hover:dark:bg-gray-800 hover:dark:bg-opacity-60 cursor-pointer group'
          onClick={addNewFeed}>
          <i className='fad fa-terminal text-xl text-black dark:text-white group-hover:text-blue-500'></i>
        </div>
      </Tooltip>
      <Tooltip message={'Connect Social'} left={16} top={3} padding={1} minWidth={120}>
        <div className='items-center text-center w-full mb-2 p-3 hover:bg-gray-200 hover:dark:bg-gray-800 hover:dark:bg-opacity-60 cursor-pointer group'>
          <i className='fad fa-user-friends text-2xl text-black dark:text-white group-hover:text-blue-500'></i>
        </div>
      </Tooltip>
      <div className='flex flex-col items-center mt-auto text-center w-full'>
        <Tooltip message={'About InFold'} left={16} top={3} padding={1} minWidth={110}>
          <Link href='/about' target='_self'
            title='About InFold'
            className='items-center text-center w-full mb-2 p-3 hover:bg-gray-200 hover:dark:bg-gray-800 hover:dark:bg-opacity-60 cursor-pointer group'>
            <i className='fad fa-question text-2xl text-black dark:text-white group-hover:text-blue-500' />
          </Link>
        </Tooltip>
        <Tooltip message={'Read on Medium'} left={16} top={3} padding={1} minWidth={125}>
          <Link href='https://infold.medium.com/a-lot-of-knowledge-is-a-dangerous-thing-6a4d2560cc83' target='_blank'
            title='Read more on our Medium'
            className='items-center text-center w-full mb-2 p-3 hover:bg-gray-200 hover:dark:bg-gray-800 hover:dark:bg-opacity-60 cursor-pointer group'>
            <i className='fab fa-medium text-3xl text-black dark:text-white group-hover:text-blue-500' />
          </Link>
        </Tooltip>
      </div>
    </div>
  )
}
