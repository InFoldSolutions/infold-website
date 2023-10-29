'use client'

import { useRef, useState, useCallback } from 'react'

import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import config from '@/config'
import { capitalize, slugifyKeyword, unSlugifyKeyword } from '@/helpers/utils'

const topOptions = [
  //{ label: 'Hour', value: 'hour' },
  { label: 'Today', value: 'day' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  //{ label: 'This Year', value: 'year' },
]

const categoryOptions = [
  { label: 'Politics', value: 'Politics', icon: 'fa-landmark' },
  { label: 'Technology', value: 'Technology', icon: 'fa-computer-classic' },
  { label: 'Sports', value: 'Sports', icon: 'fa-football-ball' },
  { label: 'Finance', value: 'Finance', icon: 'fa-user-chart' },
  { label: 'Creative', value: 'Creative', icon: 'fa-alien-monster' },
  //{ label: 'Health', value: 'Health', icon: 'fa-heartbeat' },
]

export default function Filters({ totalResults }: { isMenuOpen: boolean, setIsMenuOpen: any, totalResults: number, showToTop: boolean }) {
  let keywords: any = '';

  const router = useRouter()
  const searchParams: any = useSearchParams()
  const pathname: string = usePathname()
  const pathnameParts = pathname.split('/')
  const endpoint = pathnameParts[1]
  const bucket = pathnameParts[2] || config.api.defaultBucket
  const bucketIcon = categoryOptions.find(item => item.value === bucket)?.icon

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (endpoint === 'search' || endpoint === 'keyword')
    keywords = unSlugifyKeyword(bucket)

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
      router.push(`/search/${slugifyKeyword(queryString)}`)
    else
      router.push('/')
  }, [searchParams, router])

  const onKeyDown = useCallback((e: any) => {
    if (e.key === 'Enter') {
      // @ts-ignore
      const keywordText = searchInputRef?.current?.value.trim()

      if (keywordText && keywordText.length > 3)
        router.push(`/search/${slugifyKeyword(keywordText)}`)
      else
        router.push('/')
    }
  }, [searchInputRef, router])

  if (keywords) {
    return (
      <div className='flex py-4 px-5 pr-3 dark:bg-gray-800 dark:bg-opacity-60 rounded items-center'>
        <span className='mr-3 items-center hidden md:flex'>
          <i className='fad fa-search mr-3'></i>
          Search:
        </span>
        {keywords.split(',').map((keyword: string, index: number) => (
          <div
            className='keyword cursor-pointer mr-2 flex items-center max-w-[90%] truncate'
            title="Remove filter for keyword"
            onClick={removeKeywordFilter}
            key={index}>
            <i className='fad fa-window-close mr-2 text-gray-800 dark:text-gray-200' />
            {keyword}
          </div>
        ))}
        <span className={`${!totalResults ? 'hidden' : ''} ml-auto mr-2 flex items-center`}>
          <i className='fad fa-books mr-2'></i>
          {totalResults}
          <span className='hidden md:flex ml-2'>results</span>
        </span>
      </div>
    )
  } else {
    return (
      <div className='relative flex py-3 px-5 pr-3 dark:bg-gray-800 dark:bg-opacity-60 rounded items-center text-lg'>
        <div className='flex items-center'>
          <Link className='group flex items-center' href={`/`} prefetch={false}>
            <i className={`fad fa-fire-alt ${!endpoint ? 'mr-3' : 'lg:mr-3'} text-[20px]`}></i>
            <span className={`${!endpoint ? 'underline flex' : 'hidden lg:flex'} group-hover:underline`}>Top</span>
          </Link>
          <span className='ml-3 mr-3'>|</span>
        </div>

        <div className="relative inline-block text-left">
          <div className='flex items-center'>
            <button className="group flex w-full justify-center gap-x-1.5 rounded items-center"
              onClick={() => { setIsMenuOpen((current: boolean) => !current) }}>
              {endpoint === 'section' &&
                <span className='flex items-center'>
                  <i className={`fad ${bucketIcon} mr-3 ${bucketIcon !== 'fa-user-chart' ? 'text-[17px]' : ''} ${(bucketIcon === 'fa-landmark' || bucketIcon === 'fa-football-ball') ? 'mt-[2px]' : 'mt-[1px]'}`} />
                  <span className='underline'>{capitalize(bucket)}</span>
                </span>
              }
              {!endpoint &&
                <span className='group-hover:underline'>more</span>
              }
              <svg className={`${(isMenuOpen) ? 'rotate-180' : ''} h-5 w-5 text-gray-400`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className={`${!isMenuOpen ? 'hidden' : ''} absolute left-[50%] -ml-[95px] r-auto z-10 mt-4 md:mt-5 w-44 rounded bg-gray-200 dark:bg-black`}>
            <div className='dark:bg-gray-800 dark:bg-opacity-60 py-1 rounded'>
              {categoryOptions.map((option: any, index: number) => (
                <Link className={`group w-full py-1.5 flex items-center justify-left pl-6`}
                  href={`/section/${option.value}`}
                  prefetch={false}
                  key={index}>
                  <i className={`fad ${option.icon} ${(option.icon === 'fa-user-chart' || option.icon === 'fa-alien-monster') ? '-ml-[5px]' : ''} mr-3 text-[17px]`}></i>
                  <span className={`${endpoint === 'section' && bucket === option.value ? 'underline' : ''} group-hover:underline`}>{option.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={`ml-auto bg-gray-100 dark:bg-black flex items-center justify-center rounded min-h-[35px] min-w-[40px]`}>
          <input ref={searchInputRef} type='text' placeholder='Search' className='bg-transparent focus:outline-none p-1 px-3 hidden md:flex md:max-w-[231px]' onKeyDown={onKeyDown} />
          <i className='fad fa-search md:mr-3' />
        </div>
      </div>
    )
  }
}

//  <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->


/*

  torek 7:30 - laboratorij
  četrtek 8:00 - referenčna ambulanta


  */