
'use client'

import { useRouter } from 'next/navigation'

import TimeAgo from 'react-timeago'

import { Item } from '@/helpers/api'
import Thumbs from '@/components/story/thumbs'

export default function Feed({ data }: { data: any, onScrollHandler?: any }) {
  const router = useRouter()

  return (
    <div>
      <ul>
        {data.map((item: Item, index: number) => (
          <li className='relative md:py-6 py-4 md:px-6 px-2 no-highlight-tap border-gray-200 border-b-2 border-dashed dark:border-gray-800 dark:border-opacity-80 rounded last:border-b-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-40 hover:bg-opacity-30'
            onClick={() => router.push(`/story/${item.slug}`)}
            key={index}>
            <div className='flex items-center'>
              <TimeAgo
                date={new Date(item.updated_at).getTime()}
                className='text-gray-600 dark:text-gray-300 flex text-base'
              />
              <span className="ml-2 mr-2">·</span>
              <span className='text-gray-600 dark:text-gray-300 flex text-base'>Summarized from {item.meta.articles} articles.</span>
            </div>
            <div className='flex items-center my-2'>
              {item.media?.length > 0 &&
                <Thumbs media={item.media} />
              }
              <h3 className='text-3xl font-bold leading-snug text-left'>
                {item.title}
              </h3>
            </div>

            <div className='text-left'>
              {item.outline.slice(0, 1).map((outline: any, index: number) => (
                <p className='text-base text-gray-600 dark:text-gray-300' key={index}>
                  {outline}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}