
'use client'

import Link from 'next/link'

import TimeAgo from 'react-timeago'

import { Item } from '@/helpers/api'
import Keywords from './keywords'

export default function Feed({ data }: { data: any, onScrollHandler?: any }) {
  return (
    <div className='px-2'>
      {!data || data.length === 0 && <div className='text-center text-2xl'>No topics found.</div>}
      {data.length > 0 &&
        <ul>
          {data.map((item: Item, index: number) => (
            <li className='py-10 px-5 md:px-10 border-white border-l-2 border-b-2 border-dashed dark:border-neutral-600 last:border-b-0 last:pb-4 first:pt-4' key={index}>
              <TimeAgo
                date={new Date(item.added_at).getTime()}
                className='text-gray-600 dark:text-gray-300 flex text-base pb-2 relative before:content-[""] before:absolute before:rounded before:right-[100%] before:top-[50%] before:w-4 before:h-4 before:bg-black dark:before:bg-neutral-400 before:border-[50%] before:transform before:-translate-y-3 before:-translate-x-3 md:before:-translate-x-8'
              />
              <h3 className='mb-4 text-3xl font-bold leading-snug text-left'>
                <Link href={`/topics/${item.slug}`}>{item.title}</Link><br />
                <small className='text-sm'>Summarized from {item.articles} articles.</small>
              </h3>
              <div className='text-left'>
                <ul className='list-inside list-disc'>
                  {item.outline.slice(0, 2).map((outline: string, index: number) => (
                    <li className='mb-4 last:mb-0' key={index}>
                      {outline}
                      {index === 1 && <Link href={`/topics/${item.slug}`} className="text-blue-500 underline ml-2">more..</Link>}
                    </li>
                  ))}
                </ul>
              </div>
              {item.keywords.length > 0 && <Keywords item={item} />}
            </li>
          ))}
        </ul>}
    </div>
  )
}