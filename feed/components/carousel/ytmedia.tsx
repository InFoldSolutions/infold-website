'use client'

import { useCallback } from 'react'

import Image from 'next/image'
import TimeAgo from 'react-timeago'

import { kFormatter } from '@/helpers/utils'
import { trackEvent } from '@/helpers/analytics'

import Carousel from '@/components/carousel/carousel'

export default function YTMedia({ data }: { data: any }) {

  const videoClick = useCallback((item: any) => {
    trackEvent({
      action: "video",
      params: {
        name: item.title,
        url: item.url,
      }
    })

    window.open(item.url, '_blank')
  }, [])

  return (
    <Carousel title='Related Video' length={data.length} overflow={3}>
      <ul className='flex flex-nowrap relative'>
        {data.map((item: any, index: number) => {
          return (
            <li className={`group rounded mr-4 min-w-[275px] group select-none cursor-pointer relative items-center relative`}
              onClick={() => videoClick(item)}
              title={`Youtube: ${item.title}`}
              key={index} >
              <div className='h-[150px] rounded-md relative overflow-hidden'>
                <Image src={item.thumbnails.high.url}
                  width='480'
                  height='320'
                  alt={item.title}
                  className='-mt-7' />
                <span className='absolute top-0 bottom-0 left- right-0 w-full bg-black opacity-0 group-hover:opacity-60 flex items-center justify-center z-40 transition-all text-5xl text-white'>
                  <i className='fad fa-play z-50' />
                </span>
              </div>
              <div className='flex overflow-x-hidden items-center text-sm mt-3 ml-1'>
                <span className='mr-3 text-2xl self-start'>
                  <i className='fab fa-youtube text-red-600' />
                </span>
                <span className='flex flex-col'>
                  <span className='leading-4 text-sm font-medium truncate-2-lines'>{item.title}</span>
                  <span className='text-gray-600 dark:text-gray-300 text-xs'>
                    <span className='flex mt-1.5 mb-0.5'>{item.channel.name}</span>
                    <span>
                      <span>
                        {kFormatter(item.statistics.viewCount)}
                        <span className='ml-1'>views</span>
                      </span>
                      <span className='ml-1.5 mr-1.5'>•</span>
                      <TimeAgo
                        date={new Date(item.published_at).getTime()}
                      />
                    </span>
                  </span>
                </span>
              </div>
            </li>
          )
        })
        }
      </ul>
    </Carousel>
  )
}