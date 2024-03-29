'use client'

import { useState, useEffect } from 'react';

import Image from 'next/image'
import Link from 'next/link'

import Tooltip from '@/components/helpers/tooltip'
import XIcon from '@/components/helpers/xIcon'

export default function ActionsBar({ addNewFeed, removeNewFeed }: { addNewFeed: any, removeNewFeed: any }) {
  const [browserLink, setBrowserLink] = useState("https://chrome.google.com/webstore/detail/infoldai/dfmmanoiegndhgdjendeidcakajifnlb?hl=en") // default

  useEffect(() => {
    const isFirefox = navigator?.userAgent.match(/firefox|fxios/i);

    if (isFirefox)
      setBrowserLink("https://addons.mozilla.org/en-US/firefox/addon/infold/");
  }, [])

  return (
    <div className='flex items-start flex-col h-[100dvh] w-[55px] py-2 border-r-2 border-gray-200 dark:border-gray-800 sticky left-0 z-40 bg-gray-100 dark:bg-black text-center'>
      <div className='items-center text-center w-full mb-3 p-1' onClick={removeNewFeed}>
        <Link href='/' target='_self'>
          <Image unoptimized src='/assets/images/logo-infold-black.png' alt='InFold - logo' width={42} height={42} className='rounded m-auto' />
        </Link>
      </div>
      <Tooltip message={'Add new Feed'} left={16} top={3} padding={1} minWidth={103}>
        <div className='items-center text-center w-full mb-2 p-3 hover:bg-gray-200 hover:dark:bg-gray-800 hover:dark:bg-opacity-60 cursor-pointer group'
          onClick={addNewFeed}>
          <i className='fad fa-terminal text-xl text-black dark:text-white group-hover:text-blue-500'></i>
        </div>
      </Tooltip>
      <div className='flex flex-col items-center mt-auto text-center w-full'>
        <Tooltip message={'About InFold'} left={16} top={3} padding={1} minWidth={105}>
          <Link href='/about' target='_self'
            className='items-center text-center w-full p-3 hover:bg-gray-200 hover:dark:bg-gray-800 hover:dark:bg-opacity-60 cursor-pointer group'>
            <i className='fad fa-question text-2xl text-black dark:text-white group-hover:text-blue-500' />
          </Link>
        </Tooltip>
        <Tooltip message={'Extension'} left={16} top={3} padding={1} minWidth={95}>
          <Link href={browserLink} target='_blank'
            className='items-center text-center w-full p-3 hover:bg-gray-200 hover:dark:bg-gray-800 hover:dark:bg-opacity-60 cursor-pointer group'>
            <i className='fad fa-sliders-h text-2xl text-black dark:text-white group-hover:text-blue-500' />
          </Link>
        </Tooltip>
        <Tooltip message={'InFold on X'} left={16} top={3} padding={1} minWidth={100}>
          <Link href='https://x.com/infoldai' target='_blank'
            className='flex items-center text-center w-full p-2 py-3 md:mb-2 hover:bg-gray-200 hover:dark:bg-gray-800 hover:dark:bg-opacity-60 cursor-pointer group text-black dark:text-white group-hover:text-blue-500'>
            <XIcon />
          </Link>
        </Tooltip>
      </div>
    </div>
  )
}