
'use client'

import Link from 'next/link'

import TimeAgo from 'react-timeago'

import { Item } from '@/helpers/api'
import Keywords from './keywords'

export default function Feed({ data }: { data: any, onScrollHandler?: any }) {

  if (!data || data.length === 0) 
    return (<div className='pl-2 text-center text-2xl'>No topics found.</div>)

  return (
    <div className='pl-2'>
      <ul>
        {data.map((item: Item, index: number) => (
          <li className='py-10 pb-8 pl-5 md:px-10 border-white border-l-2 border-b-2 border-dashed dark:border-neutral-600 last:border-b-0 last:pb-4 first:pt-4 pr-0' key={index}>
            <TimeAgo
              date={new Date(item.added_at).getTime()}
              className='text-gray-600 dark:text-gray-300 flex text-base pb-2 relative before:content-[""] before:absolute before:rounded before:right-[100%] before:top-[50%] before:w-4 before:h-4 before:bg-black dark:before:bg-neutral-400 before:border-[50%] before:transform before:-translate-y-3 before:-translate-x-[13px] md:before:-translate-x-[32.5px]'
            />
            <h3 className='mb-4 text-3xl font-bold leading-snug text-left'>
              <Link href={`/topics/${item.slug}`} prefetch={false}>{item.title}</Link><br />
              <small className='text-sm'>Summarized from {item.articles} articles.</small>
            </h3>
            <div className='text-left'>
              <ul className='list-inside list-disc'>
                {item.outline.slice(0, 2).map((outline: string, index: number) => (
                  <li className='mb-4 last:mb-0' key={index}>
                    {outline}
                    {index === 1 && <Link href={`/topics/${item.slug}`} prefetch={false} className="text-blue-500 underline ml-2">more..</Link>}
                  </li>
                ))}
              </ul>
            </div>

            {item.keywords.length > 0 &&
              <div className='mt-6'>
                <Keywords item={item} />
              </div>
            }
          </li>
        ))}
      </ul>
    </div>
  )
}