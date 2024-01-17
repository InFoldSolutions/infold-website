'use client'

import { useCallback, useEffect, useState } from 'react'

import Image from 'next/image'

import Carousel from '@/components/carousel/carousel'

import { kFormatter } from '@/helpers/utils'
import { trackEvent } from '@/helpers/gtm'
import { getTopicAffiliate } from '@/apis/infold'

export default function Affiliate({ slug }: { slug: string }) {

  const [data, setData] = useState<any>(null)
  const [type, setType] = useState<any>(null)
  const [title, setTitle] = useState<any>(null)
  const [overflow, setOverflow] = useState<any>(null)
  const [icon, setIcon] = useState<any>(null)
  const [minWidth, setMinWidth] = useState<any>(null)
  const [padding, setPadding] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)

  const affiliateClick = useCallback((item: any) => {
    trackEvent({
      action: "affiliate",
      params: {
        name: item.name,
        url: item.url,
      }
    })

    window.open(item.url, '_blank')
  }, [trackEvent])

  useEffect(() => {
    const fetchStoryData = async () => {
      const affiliateData = await getTopicAffiliate(slug)
      setIsLoading(false);

      if (affiliateData?.length > 0)
        setData(affiliateData)
    }

    fetchStoryData()
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (data && data[0]?.category)
      setType(data[0].category)
  }, [data])

  useEffect(() => {
    if (type) {
      setTitle(type === 'Books' ? 'Library' : 'Accessories')
      setOverflow(type === 'Books' ? 5 : 4)
      setIcon(type === 'Books' ? 'fa-books' : 'fa-shopping-cart')
      setPadding(type === 'Books' ? 'p-0' : 'p-2')
      setMinWidth(type === 'Books' ? 'min-w-[150px]' : 'min-w-[194px]')
    }
  }, [type])

  if (isLoading)
    return null //(<div className='w-auto text-small text-center pt-6 mt-6 mb-3'>Loading ..</div>)
  else if (!data && !isLoading)
    return null

  return (
    <Carousel title={title} length={data.length} overflow={overflow}>
      <span className='hidden min-w-[121px] min-w-[194px] z-0'></span>
      <ul className='flex flex-nowrap relative'>
        {data.map((item: any, index: number) => {
          return (
            <li className={`w-full group rounded-md mr-4 group select-none cursor-pointer relative items-center relative`}
              onClick={() => affiliateClick(item)}
              title={`Amazon: ${item.name}`}
              key={index} >
              <div className={`w-full mx-1 relative rounded-md overflow-hidden`}>
                <div className={`w-full h-[220px] ${minWidth} relative rounded-md`}>
                  <Image unoptimized src={item.thumbnails[0].url}
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