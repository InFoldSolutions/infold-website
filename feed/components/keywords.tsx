'use client'

import { UIEvent } from 'react';

import { useRouter, useSearchParams } from 'next/navigation'

import config from '@/config'

import AnalyzedIcon from '@/components/icon'
import Arrow from './arrow'
import { findParentByCls } from '@/helpers/utils';

export default function Keywords({ item }: { item: any }) {

  const isDesktop: boolean = (window.innerWidth > 650);
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

  const filteredKeywords = item.keywords.filter(filterKeywords);

  return (
    <div className='relative mt-6'>
      {isDesktop &&
        <div>
          <Arrow direction='left' clickFunction={prevClickHandler} visible={false} />
          <Arrow direction='right' clickFunction={nextClickHandler} visible={(filteredKeywords.length > 4)} />
        </div>
      }

      <ul className='max-w-screen-2xl flex flex-nowrap gap-x-2 overflow-x-scroll no-scrollbar keywords' onClick={onKeywordClick} onScroll={onScrollHandler}>
        {filteredKeywords.map((keyword: any, k: number) => (
          <li className='group w-auto flex items-center items-stretch whitespace-nowrap' key={k}>
            <AnalyzedIcon analyzed={keyword.analyzed} keyword={keyword.keyword} />
            <span className='keyword bg-neutral-100 hover:bg-neutral-200 py-1 px-2 cursor-pointer text-base dark:text-white dark:bg-neutral-900 dark:hover:bg-neutral-800 select-none' title="Search topics for keyword">
              {keyword.keyword}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// We filter some obvious false positives
function filterKeywords(data: any) {
  if (data.keyword.length < 3)
    return false;

  if (config.keywordsBlacklist.includes(data.keyword.toLowerCase()))
    return false;

  if (data.type === "person") { // check for type person to have at least two full words
    const words = data.keyword.split(" ");

    if (words.length < 2)
      return false;
  }

  return true;
}