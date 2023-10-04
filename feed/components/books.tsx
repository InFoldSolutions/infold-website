'use client'

import Image from 'next/image'

import { kFormatter } from '@/helpers/utils'
import Carousel from './carousel'

export default function Books({ data }: { data: any }) {
  return (
    <Carousel title='Library' length={data.length} overflow={5}>
      <ul className='flex flex-nowrap relative'>
        {data.map((item: any, index: number) => {
          return (
            <li className={`group rounded mr-4 max-w-[135px] group select-none cursor-pointer relative items-center relative`}
              onClick={() => window.open(item.url, '_blank')}
              title={`Amazon: ${item.title}`}
              key={index} >
              <div className='w-[130px] mx-1 rounded-md relative overflow-hidden'>
                <Image src={item.img}
                  width='297'
                  height='466'
                  alt={item.title}
                  className='w-auto h-[196px]' />
                <span className='absolute top-0 bottom-0 left- right-0 w-full bg-black opacity-0 group-hover:opacity-60 flex items-center justify-center z-40 transition-all text-5xl text-white'>
                  <i className='fad fa-books z-50' />
                </span>
              </div>
              <div className='flex overflow-x-hidden items-center text-sm mt-3 ml-1'>
                <span className='flex flex-col'>
                  <span className='leading-4 text-sm font-medium truncate-2-lines'>{item.title}</span>
                  <span className='text-gray-600 dark:text-gray-300 text-xs'>
                    <span className='flex mt-1.5 mb-0.5'>{item.author}</span>
                    <span>
                      <span>
                        {kFormatter(item.ratingsCount)}
                      </span>
                      <span className='ml-1.5 mr-1.5'>•</span>
                      <span>
                        {item.rating} <i className='fad fa-star text-yellow-500' />
                      </span>
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