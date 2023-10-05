'use client'

import { UIEvent, useEffect, useRef, useState } from 'react'

import Arrow from '@/components/arrow'

export default function Carousel({ title, children, length, overflow }: { title: string, children: any, length: number, overflow: number }) {

  let [isDesktop, setIsDesktop] = useState(false)

  const carousel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsDesktop(window.innerWidth > 820)
  }, [])

  function nextClickHandler(e: MouseEvent) {
    e.preventDefault();

    const element = carousel.current;

    if (!element) return console.warn('Carousel: nextClickHandler: element not found')

    const x = (element.clientWidth / overflow + 5) + element.scrollLeft;

    element.scroll({
      left: x,
      behavior: 'smooth',
    });
  }

  function prevClickHandler(e: MouseEvent) {
    e.preventDefault();

    const element = carousel.current;

    if (!element) return console.warn('Carousel: prevClickHandler: element not found')

    const x = (element.clientWidth / overflow + 5) - element.scrollLeft;

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
      <h3 className='my-4 text-2xl font-bold'>{title}</h3>
      <div className='relative'>
        {isDesktop &&
          <div>
            <Arrow direction='left' clickFunction={prevClickHandler} visible={false} />
            <Arrow direction='right' clickFunction={nextClickHandler} visible={(length > overflow)} />
          </div>
        }

        <span className='bg-green-600 bg-red-600 bg-slate-500 text-slate-500 text-red-600 text-green-600 hidden'></span>

        <div ref={carousel} className='relative max-w-screen-2xl overflow-x-scroll no-scrollbar' onScroll={onScrollHandler}>
          {children}
        </div>
      </div>
    </div>
  )
}