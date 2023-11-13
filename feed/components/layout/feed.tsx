
'use client'

import { MouseEventHandler, MouseEvent, Suspense, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { Item } from '@/helpers/api'

import Thumbs from '@/components/story/thumbs'
import StoryMeta from '@/components/story/meta'


export default function Feed({ data }: { data: any, onScrollHandler?: any }) {
  const router = useRouter()

  const openSection: MouseEventHandler = useCallback((e: MouseEvent) => {
    e.stopPropagation()

    // @ts-ignore   
    const section = e.target.textContent

    router.push(`/section/${section}`)
  }, [router])

  return (
    <div>
      <ul>
        {data.map((item: Item, index: number) => (
          <li className='relative md:pt-5 py-4 pb-2 md:px-6 px-2 no-highlight-tap border-gray-200 border-b-2 border-dashed dark:border-gray-800 dark:border-opacity-80 rounded last:border-b-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-40 hover:bg-opacity-30'
            onClick={() => router.push(`/story/${item.slug}`)}
            key={index}>

            {item.category &&
              <div className='text-gray-600 dark:text-gray-300'>
                <span className='text-base group flex items-center' onClick={openSection}>
                  <i className={`fad ${item.categoryIcon} mr-3 ${item.categoryIcon !== 'fa-user-chart' ? 'text-[17px]' : ''}`} />
                  <span className='group-hover:underline'>{item.category}</span>
                </span>
              </div>
            }

            <div className='flex items-center my-2'>
              {(item.media?.length > 0) &&
                <Thumbs media={item.media} />
              }
              <h3 className='text-3xl font-bold leading-snug text-left md:truncate-2-lines'>
                {item.title}
              </h3>
            </div>

            <div className='text-left'>
              {item.outline.slice(0, 1).map((outline: any, index: number) => (
                <p className='text-base text-gray-600 dark:text-gray-300 truncate-2-lines' key={index}>
                  {outline}
                </p>
              ))}
            </div>

            <StoryMeta data={item} time={true} />
          </li>
        ))}
      </ul>
    </div>
  )
}