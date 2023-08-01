'use client'

import { UIEvent, useEffect, useState } from 'react';

import Image from 'next/image'

import Arrow from './arrow'
import RelatedItem from './related';

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
    <div className='relative mt-8'>
      <div className='relative'>
        <div className='top-1/2 -mt-[1px] absolute h-px bg-transparent w-full border-dashed border-b-2 border-white dark:border-neutral-600'></div>

        {isDesktop &&
          <div>
            <Arrow direction='left' clickFunction={prevClickHandler} visible={false} />
            <Arrow direction='right' clickFunction={nextClickHandler} visible={(data.sources.length > 4)} />
          </div>
        }

        <div className='timeline relative max-w-screen-2xl overflow-x-scroll overflow-y-hidden no-scrollbar' onScroll={onScrollHandler}>
          <ul className='flex flex-nowrap h-[130px] relative pl-[35px]'>
            {data.sources.map((item: any, index: number) => (
              <RelatedItem item={item} index={index} key={index} />
            ))
            }
          </ul>
        </div>
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
            <span className='hidden md:inline-block'>Articles:</span>
            <span className='ml-1'>56</span>
          </li>
          <li className='opacity-50 hover:opacity-100 flex items-center mr-2 cursor-pointer border-2 p-1 px-2 select-none' title='Toggle display'>
            <Image className="mr-2" src="/assets/images/twitter.svg" width={19} height={19} alt='Tweets' />
            <span className='hidden md:inline-block'>Tweets:</span>
            <span className='ml-1'>23</span>
          </li>
          <li className='opacity-50 hover:opacity-100 flex items-center cursor-pointer border-2 p-1 px-2 select-none' title='Toggle display'>
            <Image className="mr-2" src="/assets/images/reddit.svg" width={19} height={19} alt='Posts' />
            <span className='hidden md:inline-block'>Posts:</span>
            <span className='ml-1'>10</span>
          </li>
        </ul>
      </div>
    </div>
  )
}