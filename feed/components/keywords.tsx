'use client'

import { UIEvent, useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation'

import AnalyzedIcon from '@/components/icon'
import Arrow from './arrow'
import { findParentByCls } from '@/helpers/utils';

export default function Keywords({ item }: { item: any }) {

  let [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth > 820)
  })

  const searchParams: any = useSearchParams()
  const router = useRouter()

  async function onKeywordClick(e: any) {
    if (!e.target.classList.contains('keyword') || e.target.tagName === 'A' || e.target.parentNode.tagName === 'A') return;

    e.preventDefault();

    const keywords = searchParams.get('keywords') || '';
    const queryString = keywords ? `${keywords},${e.target.innerText}` : e.target.innerText;

    router.push(`/?keywords=${queryString}`)
  }

  function nextClickHandler(e: UIEvent<HTMLDivElement>) {
    e.preventDefault();
    
    let target = findParentByCls(e.target as HTMLElement, 'arrow', 4);
    const element = target.parentElement?.parentElement?.querySelector('.keywords');

    if (!element) return console.warn('Keywords: nextClickHandler: element not found')

    const x = element.clientWidth / 2 + element.scrollLeft + 0;

    element.scroll({
      left: x,
      behavior: 'smooth',
    });
  }

  function prevClickHandler(e: UIEvent<HTMLDivElement>) {
    e.preventDefault();

    let target = findParentByCls(e.target as HTMLElement, 'arrow', 4);
    const element = target.parentElement?.parentElement?.querySelector('.keywords');

    if (!element) return console.warn('Keywords: prevClickHandler: element not found')

    const x = element.clientWidth / 2 - element.scrollLeft + 0;

    element.scroll({
      left: -x,
      behavior: 'smooth',
    });
  }

  function onScrollHandler(e: UIEvent<HTMLUListElement>) {
    const element = e.target as HTMLElement;

    const leftArrow = element.parentElement?.querySelector('.left.arrow') as HTMLElement
    const rightArrow = element.parentElement?.querySelector('.right.arrow') as HTMLElement

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

  const filteredKeywords = [...new Map(item.keywords.map((item: any) => [item['keyword'], item])).values()];

  // onClick={onKeywordClick} on ul

  return (
    <div className='relative'>
      {isDesktop &&
        <div>
          <Arrow direction='left' clickFunction={prevClickHandler} visible={false} />
          <Arrow direction='right' clickFunction={nextClickHandler} visible={(filteredKeywords.length > 3)} />
        </div>
      }

      <ul className='max-w-screen-2xl flex flex-nowrap gap-x-2 overflow-x-scroll no-scrollbar keywords' onScroll={onScrollHandler}>
        {filteredKeywords.map((keyword: any, k: number) => (
          <li className='group w-auto flex items-center items-stretch whitespace-nowrap' key={k}>
            <AnalyzedIcon analyzed={keyword.analyzed} keyword={keyword.keyword} />
          </li>
        ))}
      </ul>
    </div>
  )
}