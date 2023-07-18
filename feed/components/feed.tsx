
'use client'

import Link from 'next/link'

import ReactTimeAgo from 'react-time-ago'

import { Item } from '@/helpers/api'
import Keywords from './keywords'

export default function Feed({ data, onKeywordClick }: { data: any, onKeywordClick: any }) {
  return (
    <div>
      {!data.topics && <div className='text-center text-2xl'>No topics found.</div>}
      {data.topics &&
        <ul>
          {data.topics.map((item: Item) => (
            <li className='py-10 px-5 md:px-10 border-l-2 border-b-2 border-dashed first:pt-4' key={item.slug}>
              <ReactTimeAgo
                date={new Date(item.added_at).getTime()}
                locale="en-US"
                className='text-gray-600 dark:text-gray-300 flex text-base pb-2 relative before:content-[""] before:absolute before:rounded before:right-[100%] before:top-[50%] before:w-4 before:h-4 before:bg-black dark:before:bg-neutral-400 before:border-[50%] before:transform before:-translate-y-3 before:-translate-x-3 md:before:-translate-x-8'
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
                      {index === 1 && <Link href={`/topics/${item.slug}`} className="text-blue-500 underline ml-2">more..</Link>}
                    </li>
                  ))}
                </ul>
              </div>
              {item.keywords.length > 0 && <Keywords item={item} onKeywordClick={onKeywordClick} />}
            </li>
          ))}
        </ul>}
    </div>
  )
}