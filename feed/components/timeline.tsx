'use client'

import { UIEvent } from 'react';

import TimeAgo from 'react-timeago'

import Image from 'next/image'

import Arrow from './arrow'

export default function Timeline({ data }: { data: any }) {

  const isDesktop: boolean = (window.innerWidth > 650);
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

    if (!leftArrow || !rightArrow) return;

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
      <div className='top-1/2 -mt-[36px] absolute h-px bg-transparent w-full border-dashed border-b-2 border-white dark:border-neutral-600'></div>

      {isDesktop &&
        <div>
          <Arrow direction='left' clickFunction={prevClickHandler} visible={false} />
          <Arrow direction='right' clickFunction={nextClickHandler} visible={(sortedSources.length > 4)} />
        </div>
      }

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
                  title={item.articles[0].title}
                />
              </div>
            </li>
          ))
          }
        </ul>
      </div>

      <div className='mt-9 flex items-center'>
        <ul className='flex ml-auto w-auto'>
          <li className='flex items-center mr-2 cursor-pointer border-2 p-1 px-2 select-none' title='Toggle display'>
            <picture className="mr-2">
              <source srcSet="/assets/images/article-icon-white.png" media="(prefers-color-scheme: dark)" />
              <Image
                src="/assets/images/article-icon.png"
                alt="Related Articles"
                width={18}
                height={18}
              />
            </picture>
            <span className='hidden md:inline-block'>Related articles -</span>
            <span className='ml-1'>56</span>
          </li>
          <li className='opacity-50 hover:opacity-100 flex items-center mr-2 cursor-pointer border-2 p-1 px-2 select-none' title='Toggle display'>
            <Image className="mr-2" src="/assets/images/twitter.svg" width={19} height={19} alt='Tweets' />
            <span className='hidden md:inline-block'>Tweets -</span>
            <span className='ml-1'>23</span>
          </li>
          <li className='opacity-50 hover:opacity-100 flex items-center cursor-pointer border-2 p-1 px-2 select-none' title='Toggle display'>
            <Image className="mr-2" src="/assets/images/reddit.svg" width={19} height={19} alt='Posts' />
            <span className='hidden md:inline-block'>Posts -</span>
            <span className='ml-1'>10</span>
          </li>
        </ul>
      </div>
    </div>
  )
}