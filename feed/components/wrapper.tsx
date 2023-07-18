
'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import Filters from '@/components/filters'
import Feed from '@/components/feed'

import { getFeed, getSearchFeed } from '@/helpers/api'

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

let loaded = false;

export default function Wrapper({ initialData }: { initialData: any }) {
  const [feedData, setFeedData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname()
  const searchParams: any = useSearchParams()
  const router = useRouter()

  // listen for URL changes
  useEffect(() => {
    if (!loaded) { // ignore on 1st load, server side rendering
      loaded = true;
      return
    }

    const keywords = searchParams.get('keywords');

    if (keywords) {
      const fetchSearchData = async () => {
        setIsLoading(true);
        const data = await getSearchFeed(keywords.split(','));
        setIsLoading(false);

        if (data) setFeedData(data);
      }

      fetchSearchData()
        .catch(console.error)
    } else {
      const endpoint = searchParams.get('sort') || 'rising';
      const bucket = searchParams.get('time') || null;

      const fetchFeedData = async () => {
        setIsLoading(true);
        const data = await getFeed(endpoint, 20, bucket);
        setIsLoading(false);

        if (data) setFeedData(data);
      }

      fetchFeedData()
        .catch(console.error)
    }
  }, [pathname, searchParams])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  async function onKeywordClick(e: any) {
    if (!e.target.classList.contains('keyword') || e.target.tagName === 'A' || e.target.parentNode.tagName === 'A') return;

    e.preventDefault();

    const keywords = searchParams.get('keywords') || '';
    const queryString = keywords ? `${keywords},${e.target.innerText}` : e.target.innerText;

    router.push(`?keywords=${queryString}`)
  }

  async function removeKeywordFilter(e: any) {
    e.preventDefault();

    let target = e.target;

    if (!target.classList.contains('keyword'))
      target = e.target.parentNode;

    const keywordText = target.innerText.replace('×', '').trim()
    const keywords = searchParams.get('keywords') || ''
    const keywordsArray = keywords.split(',')
    const queryString = keywordsArray.filter((keyword: string) => keyword !== keywordText).join(',')

    if (queryString)
      router.push('?' + createQueryString('keywords', queryString))
    else
      router.push('/')
  }

  return (
    <div className='md:mx-auto z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
      <div className='md:mx-auto max-w-[780px] lg:w-[780px] pl-4 md:pl-8'>
        <div
          className='mb-6 mt-8 lg:mt-0 lg:mb-8 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
          <Filters removeKeywordFilter={removeKeywordFilter} />
        </div>

        {isLoading && (`Loading ...`)}
        {!isLoading && (<Feed data={feedData} onKeywordClick={onKeywordClick} />)}
      </div>
    </div>
  )
}