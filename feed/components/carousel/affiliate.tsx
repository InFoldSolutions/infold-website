'use client'

import Image from 'next/image'

import { kFormatter } from '@/helpers/utils'

import Carousel from '@/components/carousel/carousel'

export default function Affiliate({ data }: { data: any }) {

  const type = data[0].category
  const title = type === 'book' ? 'Library' : 'Accessories'
  const overflow = type === 'book' ? 5 : 4
  const icon = type === 'book' ? 'fa-books' : 'fa-shopping-cart'
  const padding = type === 'book' ? 'p-0' : 'p-2'
  const minWidth = type === 'book' ? 'min-w-[150px]' : 'min-w-[194px]'

  return (
    <Carousel title={title} length={data.length} overflow={overflow}>
      <span className='hidden min-w-[121px] min-w-[194px] z-0'></span>
      <ul className='flex flex-nowrap relative'>
        {data.map((item: any, index: number) => {
          return (
            <li className={`w-full group rounded-md mr-4 group select-none cursor-pointer relative items-center relative`}
              onClick={() => window.open(item.url, '_blank')}
              title={`Amazon: ${item.name}`}
              key={index} >
              <div className={`w-full mx-1 relative rounded-md overflow-hidden`}>
                <div className={`w-full h-[220px] ${minWidth} relative rounded-md`}>
                  <Image src={item.thumbnails[0].url}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    alt={item.name}
                    className={`w-auto h-auto ${padding} bg-white`} />
                </div>
                <span className='absolute top-0 bottom-0 left- right-0 w-full bg-black opacity-0 group-hover:opacity-60 flex items-center justify-center z-40 transition-all text-5xl text-white'>
                  <i className={`fad ${icon} z-50`} />
                </span>
              </div>
              <div className='flex overflow-x-hidden items-center text-sm mt-3 ml-1'>
                <span className='flex flex-col'>
                  <span className='leading-4 text-sm font-medium truncate-2-lines'>{item.name}</span>
                  <span className='text-gray-600 dark:text-gray-300 text-xs'>
                    <span className='flex mt-1.5 mb-0.5'>{item.meta.author || item.meta.brand}</span>

                    {item.ratings.score > 0 &&
                      <span>
                        <span>
                          {item.ratings.score} <i className='fad fa-star text-yellow-500' />
                        </span>
                        <span className='ml-1.5 mr-1.5'>•</span>
                        <span>
                          {kFormatter(item.ratings.count)}
                        </span>
                      </span>
                    }
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