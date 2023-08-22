'use client'

import { UIEvent, useEffect, useState } from 'react'

import Image from 'next/image'
import TimeAgo from 'react-timeago'

import Spinner from '@/components/spinner'
import Arrow from '@/components/arrow'

import config from '@/config';

const sentiment: any = config.sentiment

export default function Timeline({ data }: { data: any }) {

  let [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth > 820)
  }, [])

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

        <div className='bottom-2 absolute h-px bg-transparent w-full border-dashed border-b-2 border-gray-200 dark:border-neutral-600'></div>

        {isDesktop &&
          <div>
            <Arrow direction='left' clickFunction={prevClickHandler} visible={false} />
            <Arrow direction='right' clickFunction={nextClickHandler} visible={(data.social.length > 3)} />
          </div>
        }

        <span className='bg-green-600 bg-red-600 bg-slate-500 text-slate-500 text-red-600 text-green-600 hidden'></span>

        <div className='timeline relative max-w-screen-2xl overflow-x-scroll no-scrollbar pb-6' onScroll={onScrollHandler}>
          <ul className='flex flex-nowrap h-[170px] relative'>
            {!data.social || data.social.length === 0 && <li className='w-full justify-center mt-0 pt-0 flex items-center justify-center'><Spinner /> Loading social</li>}
            {data.social && data.social.map((item: any, index: number) => {
              const sentimentData = (item.sentiment && sentiment[item.sentiment]) ? sentiment[item.sentiment] : sentiment['neutral']

              return (
                <li className={`group rounded mr-4 min-w-[275px] group select-none cursor-pointer relative items-center relative before:content-[""] before:absolute before:rounded before:-bottom-[21px] before:left-[70px] before:w-3 before:h-3 before:bg-white before:border-[50%]`}
                  onClick={() => window.open(item.url, '_blank')}
                  key={index} >
                  <div className='bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 group-hover:bg-opacity-80 group-hover:dark:bg-opacity-80 p-4 rounded-md text-sm relative overflow-hidden'>
                    <span className='truncate-4-lines box-border min-h-[80px] mr-1'>
                      {item.body}
                    </span>
                    <span className={`absolute top-2 right-2 ${sentimentData.bg} w-2 h-2 opacity-80 rounded`}></span>
                  </div>
                  <div className='flex overflow-x-hidden items-center text-sm mt-3 ml-3'>
                    <span className='mr-2'>
                      <Image src={item.logo} alt={item.name || item.source.name} width={35} height={35} className='h-[28px] w-auto max-w-none' />
                    </span>
                    <span>
                      <span className='leading-4 text-sm'>{item.author}</span>
                      <span className='block leading-4'>
                        <TimeAgo
                          date={new Date(item.added_at).getTime()}
                          className='text-gray-600 dark:text-gray-300 text-xs'
                        />
                      </span>
                    </span>
                    <span className='ml-auto mr-3 pl-3 text-xs flex flex-col items-center justify-center border-gray-200 dark:border-neutral-600 border-dashed border-l-2'>
                      <i className={`fas fa-arrow-alt-up text-gray-400 dark:text-gray-600`} />
                      <span className='text-sm'>{item.score}</span>
                      <i className={`fas fa-arrow-alt-down text-gray-400 dark:text-gray-600`} />
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