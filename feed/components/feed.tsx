
'use client'

import { useRouter } from 'next/navigation'

import TimeAgo from 'react-timeago'

import { Item } from '@/helpers/api'

export default function Feed({ data }: { data: any, onScrollHandler?: any }) {
  const router = useRouter()

  if (!data || data.length === 0)
    return (<div className='pl-2 text-center text-2xl'>No topics found.</div>)

  return (
    <div className='pl-3'>
      <ul>
        {data.map((item: Item, index: number) => (
          <li className='relative pb-8 pl-5 pr-2 md:px-10 last:pb-4 pt-2 first:pt-1 border-gray-200 border-l-2 border-b-2 border-dashed dark:border-neutral-600 last:border-b-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-40 hover:bg-opacity-30'
            onClick={() => router.push(`/topics/${item.slug}`)}
            key={index}>
              <i className='fad fa-square-full absolute -left-[30.5px] md:-left-[51.5px] top-[25.5px] md:top-[26.5px] text-lg md:text-xl text-gray-800 dark:text-gray-400'></i>
            <TimeAgo
              date={new Date(item.added_at).getTime()}
              className='text-gray-600 dark:text-gray-300 flex text-base pb-2'
            />
            <h3 className='mb-4 text-3xl font-bold leading-snug text-left'>
              {item.title}<br />
              <small className='text-sm'>Summarized from {item.articles} articles.</small>
            </h3>
            <div className='text-left'>
              <ul className='list-inside list-disc'>
                {item.outline.slice(0, 1).map((outline: string, index: number) => (
                  <li className='mb-4 last:mb-0' key={index}>
                    {outline}
                  </li>
                ))}
              </ul>
            </div>

            <div className='mt-6 flex items-center'>
              <ul className='flex w-auto'>
                <li className='flex items-center mr-2 cursor-pointer border-dashed border-2 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 px-2 select-none'>
                  <span className="flex items-center">
                    <b>{item.articles}</b>
                    <i className='fad fa-newspaper ml-2'></i>
                    <span className='hidden md:inline-block ml-2 text-sm'>Articles</span>
                  </span>
                </li>
                <li className='flex items-center mr-2 cursor-pointer border-2 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 px-2 select-none'>
                  <span className="flex items-center">
                    <b>{item.social.length}</b>
                    <i className='fad fa-comments ml-2'></i>
                    <span className='hidden md:inline-block ml-2 text-sm'>Social feedback</span>
                  </span>
                </li>
              </ul>
              <ul className='flex w-auto ml-auto'>
                <li className='flex items-center mr-2 cursor-pointer border-2 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 px-2 select-none'>
                  <span className="flex items-center">
                    <b className='text-green-600'>{item.articles}</b>
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