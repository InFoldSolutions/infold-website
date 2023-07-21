'use client'

import { UIEvent } from 'react';

import TimeAgo from 'react-timeago'

import Image from 'next/image'

import Arrow from './arrow'

export default function Timeline({ data }: { data: any }) {

  const sortedSources = data.sources.sort((a: any, b: any) => {
    return new Date(b.articles[0].added_at).getTime() - new Date(a.articles[0].added_at).getTime()
  })

  function nextClickHandler(e: MouseEvent) {
    e.preventDefault();

    const element = document.querySelector('.timeline');

    if (!element) return console.warn('Keywords: nextClickHandler: element not found')

    const x = element.clientWidth / 2 + element.scrollLeft + 0;

    element.scroll({
      left: x,
      behavior: 'smooth',
    });
  }

  function prevClickHandler(e: MouseEvent) {
    e.preventDefault();

    const element = document.querySelector('.timeline');

    if (!element) return console.warn('Keywords: prevClickHandler: element not found')

    const x = element.clientWidth / 2 - element.scrollLeft + 0;

    element.scroll({
      left: -x,
      behavior: 'smooth',
    });
  }

  function onScrollHandler(e: UIEvent<HTMLDivElement>) {
    const element = e.target as HTMLElement;

    const leftArrow = document.querySelector('.left.arrow') as HTMLElement;
    const rightArrow = document.querySelector('.right.arrow') as HTMLElement;

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
    <div className='relative mt-8'>
      <div className='top-1/2 -mt-[1px] absolute h-px bg-neutral-800 dark:bg-neutral-400 w-full'></div>
      <Arrow direction='left' clickFunction={prevClickHandler} visible={false} />
      <Arrow direction='right' clickFunction={nextClickHandler} visible={true} />
      <div className='timeline relative max-w-screen-2xl overflow-x-scroll overflow-y-hidden no-scrollbar' onScroll={onScrollHandler}>
        <ul className='flex flex-nowrap h-[130px] relative pl-[35px]'>
          {sortedSources.map((item: any, index: number) => (
            <li className='group timeline-item select-none flex cursor-pointer relative items-center h-[50px] top-[75px] even:top-[5px] relative before:content-[""] before:absolute before:rounded before:-top-[15px] before:left-[16px] before:w-3 before:h-3 before:bg-neutral-800 dark:before:bg-neutral-400 before:border-[50%]'
              onClick={() => window.open(item.articles[0].url, '_blank')}
              title={item.articles[0].title}
              key={index} >
              <Image src={item.source.logo} alt={item.source.name} width={80} height={80} className='w-11 h-11 max-w-none rounded-full mr-2 border-2 border-transparent group-hover:border-sky-400' />
              <div className='flex flex-col min-w-[110px] overflow-x-hidden'>
                <span className='leading-4'>{item.source.name}</span>
                <TimeAgo
                  date={new Date(item.articles[0].added_at).getTime()}
                  className='text-gray-600 dark:text-gray-300 text-xs'
                />
              </div>
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}