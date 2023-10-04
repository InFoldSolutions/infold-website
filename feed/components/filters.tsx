'use client'

import { useRef, useCallback } from 'react'

import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import config from '@/config'
import { capitalize } from '@/helpers/utils'

const topOptions = [
  { label: 'Hour', value: 'hour' },
  { label: 'Today', value: 'day' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  //{ label: 'This Year', value: 'year' },
]

export default function Filters({ isMenuOpen, setIsMenuOpen, totalResults }: { isMenuOpen: boolean, setIsMenuOpen: any, totalResults: number, showToTop: boolean }) {
  let keywords: any = '';

  const router = useRouter()
  const searchParams: any = useSearchParams()
  const pathname: string = usePathname()
  const pathnameParts = pathname.split('/')
  const endpoint = pathnameParts[1]
  const bucket = pathnameParts[2] || config.api.defaultBucket

  if (endpoint === 'keyword')
    keywords = decodeURIComponent(bucket)

  const searchInputRef = useRef(null)

  const removeKeywordFilter = useCallback((e: any) => {
    e.preventDefault();

    let target = e.target;

    if (!target.classList.contains('keyword'))
      target = e.target.parentNode;

    const keywordText = target.innerText.replace('×', '').trim()
    const keywordsArray = keywords.split(',')
    const queryString = keywordsArray.filter((keyword: string) => keyword !== keywordText).join(',')

    if (queryString)
      router.push(`/keyword/${queryString}`)
    else
      router.push('/')
  }, [searchParams, router])

  const onKeyDown = useCallback((e: any) => {
    if (e.key === 'Enter') {
      // @ts-ignore
      const keywordText = searchInputRef?.current?.value.trim()

      if (keywordText && keywordText.length > 3)
        router.push(`/keyword/${keywordText}`)
      else
        router.push('/')
    }
  }, [searchInputRef, router])

  if (keywords) {
    return (
      <div className='flex py-4 px-5 pr-3 dark:bg-gray-800 dark:bg-opacity-60 rounded items-center'>
        <span className='mr-3 flex items-center'>
          <i className='fad fa-search mr-3'></i>
          Search:
        </span>
        {keywords.split(',').map((keyword: string, index: number) => (
          <div
            className='keyword cursor-pointer mr-2 flex items-center'
            title="Remove filter for keyword"
            onClick={removeKeywordFilter}
            key={index}>
            <i className='fad fa-window-close mr-2 text-gray-800 dark:text-gray-200' />
            {keyword}
          </div>
        ))}
        <span className={`${!totalResults ? 'hidden' : ''} ml-auto mr-3 flex items-center`}>
          <i className='fad fa-books mr-2'></i>
          {totalResults} results
        </span>
      </div>
    )
  } else {
    return (
      <div className='relative flex py-3 px-5 pr-3 dark:bg-gray-800 dark:bg-opacity-60 rounded items-center'>
        <div className='flex items-center'>
          <Link className='group flex items-center' href={`/`} prefetch={false}>
            <i className={`${!endpoint ? 'mr-3' : 'lg:mr-3'} fad fa-head-side-brain`}></i>
            <span className={`${!endpoint ? 'underline flex' : 'hidden lg:flex'} group-hover:underline`}>Feed</span>
          </Link>
          <span className='ml-3 mr-3'>|</span>
        </div>
        <div className='flex items-center'>
          <Link className='group flex items-center' href={`/rising`} prefetch={false}>
            <i className={`fad fa-pepper-hot ${endpoint === 'rising' ? 'mr-3' : 'lg:mr-3'}`}></i>
            <span className={`${endpoint === 'rising' ? 'underline flex' : 'hidden lg:flex'} group-hover:underline`}>Rising</span>
          </Link>
          <span className='ml-3 mr-3'>|</span>
        </div>
        <div className="relative inline-block text-left">
          <div className='flex items-center'>
            <button className="group flex w-full justify-center gap-x-1.5 rounded items-center"
              onClick={() => { setIsMenuOpen((current: boolean) => !current) }}>
              <i className='fad fa-fire mr-1'></i>
              <span className={`${endpoint === 'top' ? 'underline flex' : 'hidden lg:flex'} group-hover:underline`}>Top</span>
              <svg className={`${(isMenuOpen) ? 'rotate-180' : ''} h-5 w-5 text-gray-400`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
              <span className={`underline`}>{endpoint === 'top' && capitalize(bucket)}</span>
            </button>
          </div>

          <div className={`${!isMenuOpen ? 'hidden' : ''} absolute left-[50%] -ml-[80px] r-auto z-10 mt-4 md:mt-5 w-40 rounded bg-gray-200 dark:bg-black`}>
            <div className='dark:bg-gray-800 dark:bg-opacity-60 py-1 rounded'>
              {topOptions.map((option: any, index: number) => (
                <span className='group cursor-pointer flex justify-center border-b-2 border-dashed border-gray-100 dark:border-black last:border-transparent' key={index}>
                  <Link className={`${(endpoint === 'top' && bucket === option.value) ? 'underline' : ''} group-hover:underline block w-full text-center py-0.5`}
                    href={`/top/${option.value}`}
                    prefetch={false}>
                    {option.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={`ml-auto bg-gray-100 dark:bg-black hidden md:flex items-center rounded`}>
          <input ref={searchInputRef} type='text' placeholder='Search' className='bg-transparent focus:outline-none p-1 px-3 max-w-[231px]' onKeyDown={onKeyDown} />
          <i className='fad fa-search mr-3' />
        </div>
      </div>
    )
  }
}

//  <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->