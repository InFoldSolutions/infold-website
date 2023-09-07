'use client';

import { useState } from 'react'

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

import config from '@/config'
import { capitalize } from '@/helpers/utils'

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
  const endpoint = searchParams.get('sort');
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
      <div className='relative max-w-screen-2xl flex py-3 px-5 pr-3 dark:bg-gray-800 dark:bg-opacity-60 rounded items-center'>
        <div className='flex items-center' onClick={() => { setMenuOpen(false) }}>
          <Link className='group flex items-center' href={`/`}>
            <i className='fad fa-head-side-brain mr-3'></i>
            <span className={`${!endpoint ? 'underline' : ''} group-hover:underline`}>Feed</span>
          </Link>
          <span className='ml-3 mr-3'>|</span>
        </div>
        <div className='flex items-center' onClick={() => { setMenuOpen(false) }}>
          <Link className='group flex items-center' href={`?sort=rising`}>
            <i className='fad fa-pepper-hot mr-3'></i>
            <span className={`${endpoint === 'rising' ? 'underline' : ''} group-hover:underline`}>Rising</span>
          </Link>
          <span className='ml-3 mr-3'>|</span>
        </div>
        <div className="relative inline-block text-left">
          <div className='flex items-center'>
            <button className="group flex w-full justify-center gap-x-1.5 rounded items-center"
              onClick={() => { setMenuOpen(current => !current) }}>
              <i className='fad fa-fire mr-1'></i>
              <span className={`${endpoint === 'top' ? 'underline' : ''} group-hover:underline`}>Top</span>
              <svg className={`${(menuOpen) ? 'rotate-180' : ''} h-5 w-5 text-gray-400`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <span className='flex ml-1.5 underline'>{endpoint === 'top' && capitalize(bucket)}</span>
          </div>

          <div className={`${!menuOpen ? 'hidden' : ''} absolute left-[50%] -ml-[80px] r-auto z-10 mt-5 md:mt-6 w-40 rounded bg-gray-200 dark:bg-black`}>
            <div className='dark:bg-gray-800 dark:bg-opacity-60 py-2 rounded'>
              {topOptions.map((option: any, index: number) => (
                <span className='group cursor-pointer flex justify-center' key={index} onClick={() => setMenuOpen(false)}>
                  <Link className={`${(endpoint === 'top' && bucket === option.value) ? 'underline' : ''} group-hover:underline`} href={`?sort=top&time=${option.value}`} prefetch={false}>{option.label}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className='ml-auto bg-gray-300 dark:bg-black hidden md:flex items-center rounded'>
          <input type='text' placeholder='Search' className='bg-transparent focus:outline-none p-1 px-3 max-w-[231px]' />
          <i className='fad fa-search mr-3' />
        </div>
      </div>
    )
  }
}

//  <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->