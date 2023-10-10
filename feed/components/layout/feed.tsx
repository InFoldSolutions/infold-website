
'use client'

import { useRouter } from 'next/navigation'

import TimeAgo from 'react-timeago'

import { Item } from '@/helpers/api'

export default function Feed({ data }: { data: any, onScrollHandler?: any }) {
  const router = useRouter()

  return (
    <div>
      <ul>
        {data.map((item: Item, index: number) => (
          <li className='relative md:py-6 py-4 md:px-6 px-2 no-highlight-tap border-gray-200 border-b-2 border-dashed dark:border-gray-800 dark:border-opacity-80 rounded last:border-b-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-40 hover:bg-opacity-30'
            onClick={() => router.push(`/story/${item.slug}`)}
            key={index}>
            <TimeAgo
              date={new Date(item.updated_at).getTime()}
              className='text-gray-600 dark:text-gray-300 flex text-base pb-2'
            />
            <h3 className='mb-4 text-3xl font-bold leading-snug text-left'>
              {item.title}<br />
              <small className='text-sm'>Summarized from {item.meta.articles} articles.</small>
            </h3>
            <div className='text-left'>
              {item.short_description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}