'use client'

import { UIEvent, useEffect, useState } from 'react';

import Image from 'next/image'
import TimeAgo from 'react-timeago'

import Spinner from '@/components/spinner';
import Arrow from '@/components/arrow'
import config from '@/config';

const sentiment: any = config.sentiment

export default function Timeline({ data }: { data: any }) {

  let [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth > 820)
  })

  function nextClickHandler(e: MouseEvent) {
    e.preventDefault();

    const element = document.querySelector('.timeline');

    if (!element) return console.warn('Timeline: nextClickHandler: element not found')

    const x = element.clientWidth / 2 + element.scrollLeft + 0;

    element.scroll({
      left: x,
      behavior: 'smooth',
    });
  }

  function prevClickHandler(e: MouseEvent) {
    e.preventDefault();

    const element = document.querySelector('.timeline');

    if (!element) return console.warn('Timeline: prevClickHandler: element not found')

    const x = element.clientWidth / 2 - element.scrollLeft + 0;

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
    <div className='relative mt-4'>
      <div className='relative'>

        <div className='bottom-2 absolute h-px bg-transparent w-full border-dashed border-b-2 border-white dark:border-neutral-600'></div>

        {isDesktop &&
          <div>
            <Arrow direction='left' clickFunction={prevClickHandler} visible={false} />
            <Arrow direction='right' clickFunction={nextClickHandler} visible={(data.social.length > 2)} />
          </div>
        }

        <div className='timeline relative max-w-screen-2xl overflow-x-scroll no-scrollbar pb-6' onScroll={onScrollHandler}>
          <ul className='flex flex-nowrap h-[170px] relative'>
            {!data.social || data.social.length === 0 && <li className='w-full justify-center mt-0 pt-0 flex items-center justify-center'><Spinner /> Loading social</li>}
            {data.social && data.social.map((item: any, index: number) => (
              <li className={`hover:${sentiment[item.sentiment].bg} hover:bg-opacity-5 dark:hover:bg-opacity-10 rounded mr-4 min-w-[260px] group select-none cursor-pointer relative items-center relative before:content-[""] before:absolute before:rounded before:-bottom-[21px] before:left-[70px] before:w-3 before:h-3 before:bg-white before:border-[50%]`}
                onClick={() => window.open(item.url, '_blank')}
                title={item.title}
                key={index} >
                <div className='bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 p-4 rounded-md text-sm relative overflow-hidden'>
                  <span className='truncate-4-lines box-border min-h-[80px] mr-1'>
                    {item.summary}
                  </span>
                  <span className={`absolute top-0 right-0 ${sentiment[item.sentiment].bg} p-0.5 px-1 opacity-60 dark:opacity-80 text-xs rounded`}>
                    <i className={`far ${sentiment[item.sentiment].icon} text-white`} />
                  </span>
                </div>
                <div className='flex overflow-x-hidden items-center text-sm mt-3 ml-3'>
                  <span className='mr-2'>
                    <Image src={item.logo} alt={item.name} width={35} height={35} className='h-[28px] w-auto max-w-none' />
                  </span>
                  <span>
                    <span className='leading-4 text-sm'>{item.handle}</span>
                    <span className='block leading-4'>
                      <TimeAgo
                        date={new Date(item.added_at).getTime()}
                        className='text-gray-600 dark:text-gray-300 text-xs'
                        title={item.title}
                      />
                    </span>
                  </span>
                  <span className='ml-auto mr-2 text-xs flex flex-col'>
                    <span className='leading-4 text-right'><b>{item.likes}</b> likes </span>
                    <span className='leading-4 text-right'><b>{item.views}</b> views</span>
                  </span>
                </div>
              </li>
            ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}