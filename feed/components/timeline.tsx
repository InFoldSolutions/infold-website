'use client'

import { UIEvent, useEffect, useState } from 'react';

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
    <div className='relative mt-4'>
      <div className='relative'>

        <div className='bottom-3 absolute h-px bg-transparent w-full border-dashed border-b-2 border-white dark:border-neutral-600'></div>

        {isDesktop &&
          <div>
            <Arrow direction='left' clickFunction={prevClickHandler} visible={false} />
            <Arrow direction='right' clickFunction={nextClickHandler} visible={(data.social.length > 2)} />
          </div>
        }

        <div className='timeline relative max-w-screen-2xl overflow-x-scroll no-scrollbar pb-8' onScroll={onScrollHandler}>
          <ul className='flex flex-nowrap h-[180px] relative'>
            {data.social.map((item: any, index: number) => (
              <RelatedItem item={item} index={index} key={index} />
            ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}