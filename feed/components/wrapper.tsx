
'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import Filters from '@/components/filters'
import Feed from '@/components/feed'

import { getFeed, getSearchFeed } from '@/helpers/api'

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

export default function Wrapper({ initialData }: { initialData: any }) {
  const [feedData, setFeedData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname()
  const searchParams: any = useSearchParams()
  const router = useRouter()

  // listen for URL changes
  useEffect(() => {
    if (searchParams.keywords) {
      const fetchSearchData = async () => {
        setIsLoading(true);
        const data = await getSearchFeed(searchParams.keywords.split(','));
        setIsLoading(false);

        if (data) setFeedData(data);
      }

      fetchSearchData()
        .catch(console.error)
    } else {
      const fetchFeedData = async () => {
        setIsLoading(true);
        const data = await getFeed();
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

  async function onClick(e: any) {
    e.preventDefault();

    if (!e.target.classList.contains('filter')) return;

    const filters = e.target.parentNode.querySelectorAll('.filter');
    filters.forEach((filter: any) => filter.classList.remove('underline'));

    e.target.classList.add('underline');

    setIsLoading(true);
    const data = await getFeed(e.target.dataset.endpoint, 20, e.target.dataset.bucket);
    setIsLoading(false);

    if (data) setFeedData(data);
  }

  async function onKeywordClick(e: any) {
    if (!e.target.classList.contains('keyword') || e.target.tagName === 'A' || e.target.parentNode.tagName === 'A') return;

    e.preventDefault();

    const keywords = searchParams.get('keywords') || '';
    const queryString = keywords ? `${keywords},${e.target.innerText}` : e.target.innerText;

    router.push('?' + createQueryString('keywords', queryString))
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
    <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
      <div className='mx-auto w-[780px] px-4'>
        <div
          className='mx-auto mb-8 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
          <Filters onClick={onClick} removeKeywordFilter={removeKeywordFilter} />
        </div>

        {isLoading && (`Loading ...`)}
        {!isLoading && (<Feed data={feedData} onKeywordClick={onKeywordClick} />)}
      </div>
    </div>
  )
}