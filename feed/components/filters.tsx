'use client';

import config from '@/config';
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const topOptions = [
  { label: 'Hour', value: 'hour' },
  { label: 'Today', value: 'day' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'This Year', value: 'year' },
]

export default function Filters() {
  const [menuOpen, setMenuOpen] = useState(false)

  const router = useRouter()
  const searchParams: any = useSearchParams()

  const keywords = searchParams.get('keywords') || '';
  const endpoint = searchParams.get('sort') || config.api.defaultSort;
  const bucket = searchParams.get('time') || config.api.defaultBucket;

  function removeKeywordFilter(e: any) {
    e.preventDefault();

    let target = e.target;

    if (!target.classList.contains('keyword'))
      target = e.target.parentNode;

    const keywordText = target.innerText.replace('×', '').trim()
    const keywords = searchParams.get('keywords') || ''
    const keywordsArray = keywords.split(',')
    const queryString = keywordsArray.filter((keyword: string) => keyword !== keywordText).join(',')

    if (queryString)
      router.push(`/?keywords=${queryString}`)
    else
      router.push('/')
  }

  if (keywords) {
    return (
      <div className='dark:bg-gray-800 dark:bg-opacity-60 rounded'>
        <span className='mr-2'>Keywords:</span>
        {keywords.split(',').map((keyword: string, index: number) => (
          <span
            className='keyword bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 py-1 px-2 cursor-pointer dark:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700 mr-2'
            title="Remove filter for keyword"
            onClick={removeKeywordFilter}
            key={index}>
            <span className='mr-2 text-xl'>&times;</span>
            {keyword}
          </span>
        ))}
      </div>
    )
  } else {
    return (
      <div className='relative max-w-screen-2xl flex py-3 px-5 dark:bg-gray-800 dark:bg-opacity-60 rounded'>
        <div>
          <Link className='hover:underline' href={`#`}>Feed</Link>
          <span className='ml-3 mr-3'>|</span>
        </div>
        <div>
          <Link className='hover:underline' href={`#`}>Latest</Link>
          <span className='ml-3 mr-3'>|</span>
        </div>
        <div className="relative inline-block text-left">
          <div>
            <button type="button"
              className="flex w-full justify-center gap-x-1.5 rounded items-center"
              onClick={() => { setMenuOpen(current => !current) }}>
              Top
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className={`${!menuOpen ? 'hidden' : ''} absolute -right-10 z-10 mt-5 w-40 rounded bg-gray-200 dark:bg-black`}>
            <div className='dark:bg-gray-800 dark:bg-opacity-60 py-2 rounded'>
              {topOptions.map((option: any, index: number) => (
                <span className='group cursor-pointer flex justify-center' key={index}>
                  <Link className={`${(endpoint === 'top' && bucket === option.value) ? 'underline' : ''} group-hover:underline`} href={`?sort=top&time=${option.value}`} prefetch={false}>{option.label}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//  <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->