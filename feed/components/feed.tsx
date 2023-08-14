
'use client'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

import TimeAgo from 'react-timeago'

import { Item } from '@/helpers/api'

export default function Feed({ data }: { data: any, onScrollHandler?: any }) {
  const router = useRouter()

  if (!data || data.length === 0)
    return (<div className='pl-2 text-center text-2xl'>No topics found.</div>)

  return (
    <div className='pl-2'>
      <ul>
        {data.map((item: Item, index: number) => (
          <li className='py-10 pb-8 pl-5 pr-2 md:px-10 border-white border-l-2 border-b-2 border-dashed dark:border-neutral-600 last:border-b-0 last:pb-4 first:pt-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-40 hover:bg-opacity-30'
            onClick={() => router.push(`/topics/${item.slug}`)}
            key={index}>
            <TimeAgo
              date={new Date(item.added_at).getTime()}
              className='text-gray-600 dark:text-gray-300 flex text-base pb-2 relative before:content-[""] before:absolute before:rounded before:right-[100%] before:top-[50%] before:w-4 before:h-4 before:bg-black dark:before:bg-neutral-400 before:border-[50%] before:transform before:-translate-y-3 before:-translate-x-[13px] md:before:-translate-x-[32.5px]'
            />
            <h3 className='mb-4 text-3xl font-bold leading-snug text-left'>
              {item.title}<br />
              <small className='text-sm'>Summarized from {item.articles} articles.</small>
            </h3>
            <div className='text-left'>
              <ul className='list-inside list-disc'>
                {item.outline.slice(0, 2).map((outline: string, index: number) => (
                  <li className='mb-4 last:mb-0' key={index}>
                    {outline}
                  </li>
                ))}
              </ul>
            </div>

            <div className='mt-6 flex items-center'>
              <ul className='flex w-auto'>
                <li className='flex items-center mr-2 cursor-pointer border-2 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 px-2 select-none'>
                  <span className="flex items-center">
                    <b>56</b>
                    <i className='fad fa-newspaper ml-2'></i>
                    <span className='hidden md:inline-block ml-2 text-sm'>Articles</span>
                  </span>
                </li>
                <li className='flex items-center mr-2 cursor-pointer border-2 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 px-2 select-none'>
                  <span className="flex items-center">
                    <b>23</b>
                    <i className='fad fa-comments ml-2'></i>
                    <span className='hidden md:inline-block ml-2 text-sm'>Social feedback</span>
                  </span>
                </li>
              </ul>
              <ul className='flex w-auto ml-auto'>
                <li className='flex items-center mr-2 cursor-pointer border-2 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 px-2 select-none'>
                  <span className="flex items-center">
                    <b className='text-green-600'>56</b>
                    <i className='far text-green-600 fa-smile ml-2'></i>
                  </span>
                </li>
                <li className='flex items-center mr-2 cursor-pointer border-2 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 px-2 select-none'>
                  <span className="flex items-center">
                    <b className='text-red-600'>23</b>
                    <i className='far fa-frown text-red-600 ml-2'></i>
                  </span>
                </li>
                <li className='flex items-center cursor-pointer border-2 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 px-2 select-none'>
                  <span className="flex items-center">
                    <b className='text-slate-500'>10</b>
                    <i className='far fa-meh text-slate-500 ml-2'></i>
                  </span>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}