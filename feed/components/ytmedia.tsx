'use client'

import { UIEvent, useEffect, useState } from 'react'

import Image from 'next/image'
import TimeAgo from 'react-timeago'

import Arrow from '@/components/arrow'

import { kFormatter } from '@/helpers/utils'

export default function YTMedia({ data }: { data: any }) {

  let [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth > 820)
  }, [])

  function nextClickHandler(e: MouseEvent) {
    e.preventDefault();

    const element = document.querySelector('.timeline');

    if (!element) return console.warn('Timeline: nextClickHandler: element not found')

    const x = (element.clientWidth / 3 + 5) + element.scrollLeft;

    element.scroll({
      left: x,
      behavior: 'smooth',
    });
  }

  function prevClickHandler(e: MouseEvent) {
    e.preventDefault();

    const element = document.querySelector('.timeline');

    if (!element) return console.warn('Timeline: prevClickHandler: element not found')

    const x = (element.clientWidth / 3 + 5) - element.scrollLeft;

    element.scroll({
      left: -x,
      behavior: 'smooth',
    });
  }

  function onScrollHandler(e: UIEvent<HTMLDivElement>) {
    const element = e.target as HTMLElement;

    const leftArrow = (element.parentElement) ? element.parentElement.querySelector('.left.arrow') as HTMLElement : null
    const rightArrow = (element.parentElement) ? element.parentElement.querySelector('.right.arrow') as HTMLElement : null

    if (!leftArrow || !rightArrow) return

    if (element.scrollLeft === 0)
      leftArrow.classList.add('hidden')

    if (element.scrollLeft > 0)
      leftArrow.classList.remove('hidden')

    if ((element.scrollLeft + element.clientWidth) < element.scrollWidth)
      rightArrow.classList.remove('hidden')

    if ((element.scrollLeft + element.clientWidth + 10) >= element.scrollWidth)
      rightArrow.classList.add('hidden')
  }

  return (
    <div className='relative mt-6'>
      <h3 className='my-4 text-2xl font-bold'>Video Coverage</h3>
      <div className='relative'>
        {isDesktop &&
          <div>
            <Arrow direction='left' clickFunction={prevClickHandler} visible={false} />
            <Arrow direction='right' clickFunction={nextClickHandler} visible={(data.length > 3)} />
          </div>
        }

        <span className='bg-green-600 bg-red-600 bg-slate-500 text-slate-500 text-red-600 text-green-600 hidden'></span>

        <div className='timeline relative max-w-screen-2xl overflow-x-scroll no-scrollbar' onScroll={onScrollHandler}>
          <ul className='flex flex-nowrap relative'>
            {data.map((item: any, index: number) => {
              return (
                <li className={`group rounded mr-4 min-w-[275px] group select-none cursor-pointer relative items-center relative`}
                  onClick={() => window.open(item.url, '_blank')}
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
                            <i className='fad fa-eye mr-1' />
                            {kFormatter(item.statistics.viewCount)}
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
        </div>
      </div>
    </div>
  )
}