'use client'

import Image from 'next/image'

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

import ReactTimeAgo from 'react-time-ago'

export default function Timeline({ data }: { data: any }) {
  return (
    <div className='relative mt-6'>
      <div className='relative mt-6'></div>
      <div className='top-1/2 relative h-px bg-neutral-400 dark:bg-neutral-800 w-full'> </div>
      <ul className='max-w-screen-2xl flex flex-nowrap gap-x-2 overflow-x-scroll no-scrollbar pb-6'>
        {data.sources.map((item: any, index: number) => (
          <li className='mr-6 flex relative items-center inline-block' key={index} >
            <Image src={item.source.logo} alt={item.source.name} width={80} height={80} className='w-10 h-10 max-w-none rounded mr-2' />
            <span className='flex flex-nowrap'>{item.source.name}</span>
            <ReactTimeAgo
              date={new Date(item.articles[0].added_at).getTime()}
              locale="en-US"
              className='text-gray-600 dark:text-gray-300 flex text-base pb-2 relative before:content-[""] before:absolute before:rounded before:right-[100%] before:top-[50%] before:w-4 before:h-4 before:bg-black dark:before:bg-neutral-400 before:border-[50%] before:transform before:-translate-y-3 before:-translate-x-3 md:before:-translate-x-8'
            />
          </li>
        ))
        }
      </ul>
    </div>
  )
}