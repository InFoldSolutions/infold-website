
'use client'

import { useState, useEffect, UIEvent, useCallback } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'

import Header from '@/components/header'
import Filters from '@/components/filters'
import Feed from '@/components/feed'
import Footer from '@/components/footer'

import { getFeed, getSearchFeed, getTopKeywords } from '@/helpers/api'
import config from '@/config'

let loaded = false, backButtonWasClicked = false;

export default function Wrapper({ initialFeedData, topKeywords }: { initialFeedData: any, topKeywords: [] }) {

  const [topKeywordsData, setTopKeywordsData] = useState(topKeywords)
  const [feedData, setFeedData] = useState(initialFeedData)
  const [offset, setOffset] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [endOfFeed, setEndOfFeed] = useState(false)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onScrollHandler = useCallback((e: Event) => {
    //console.log('onScrollHandler', isLoadMore)

    const backToTop = document.getElementById('back-to-top') as HTMLElement;
    const scrollHeight = document.body.scrollHeight
    const innerHeight = window.innerHeight
    const scrollTop = window.scrollY
    const isBottom = scrollTop + innerHeight + 5 >= scrollHeight

    //console.log('scrollTop, innerHeight, scrollHeight', scrollTop, innerHeight, scrollHeight)
    //console.log('isBottom', isBottom)

    if (scrollHeight <= innerHeight)
      return

    //console.log('isBottom, isLoadMore', isBottom, isLoadMore)

    if (isBottom && !isLoadMore) {
      //console.log('setOffset ?!?!')
      setIsLoadMore(true)
      setOffset((old: number) => old + 1);
    }

    if (scrollTop > 100 && backToTop.classList.contains('hidden'))
      backToTop.classList.remove('hidden')
    else if (scrollTop <= 100 && !backToTop.classList.contains('hidden'))
      backToTop.classList.add('hidden')
  }, [isLoadMore])

  useEffect(() => {
    if (!loaded) {
      window.addEventListener("popstate", (e) => {
        backButtonWasClicked = true
      })

      window.addEventListener("scroll", onScrollHandler)
    }
  }, [])

  useEffect(() => {
    if (!loaded) {
      loaded = true
      return
    }

    if (backButtonWasClicked) {
      backButtonWasClicked = false
      return
    }

    if (pathname.includes('/topics/'))
      return

    setIsLoading(true)

    setOffset(1)
    setEndOfFeed(false)

    const backToTop = document.getElementById('back-to-top') as HTMLElement;

    if (!backToTop.classList.contains('hidden'))
      backToTop.classList.add('hidden')

    const fetchFeedData = async () => {

      let data: any;
      const keywords = searchParams.get('keywords')

      if (keywords) {
        data = await getSearchFeed(keywords.split(','))
      } else {
        const endpoint = searchParams.get('sort') || 'rising'
        const bucket = searchParams.get('time') || undefined;

        data = await getFeed(endpoint, config.defaultLimit, bucket)

        const newTopKeywords = await getTopKeywords(bucket)
        setTopKeywordsData(newTopKeywords)
      }

      setIsLoading(false);

      if (data)
        setFeedData(data);
    }

    fetchFeedData()
      .catch(console.error)
  }, [pathname, searchParams])

  useEffect(() => {
    //console.log('useEffect offset', offset, isLoadMore, endOfFeed)

    if (offset > 1 && !endOfFeed) {
      setIsLoadMore(true);

      const fetchMoreData = async () => {

        let data: any;
        const keywords = searchParams.get('keywords')

        if (keywords) {
          data = await getSearchFeed(keywords.split(','), offset)
        } else {
          const endpoint = searchParams.get('sort') || 'rising'
          const bucket = searchParams.get('time') || null

          data = await getFeed(endpoint, config.defaultLimit, bucket, offset)
        }

        if (data && data.length > 0) {
          setFeedData((prevData: any) => [...prevData, ...data])
          setIsLoadMore(false);
        }
        else
          setEndOfFeed(true)
      }

      fetchMoreData()
        .catch(console.error)
    }
  }, [offset])

  function backToTopHandler(e: UIEvent<HTMLDivElement>) {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className='relative md:mx-auto w-full lg:max-w-[1060px] lg:w-[1060px] font-mono px-4 md:p-8 md:py-4'>
      <Header />

      <div
        className='sticky top-[82.5px] z-40 bg-gray-300 dark:bg-black mb-4 mt-4 lg:mt-0 lg:mb-4 py-2 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
        <Filters />
      </div>

      <div className='flex items-start'>
        <div className='md:mr-auto w-full max-w-[760px] lg:w-[720px]'>
          {isLoading && (`Loading ...`)}
          {!isLoading && (<Feed data={feedData} />)}

          {isLoadMore && (<div className='w-full justify-center mt-3 pt-2'>Loading more ...</div>)}

          <Footer />
        </div>

        <div className='sticky top-[130px] h-auto w-[240px] p-4 bg-gray-200 dark:bg-gray-900 hidden lg:flex flex-col'>
          <h3 className='mb-5 text-2xl font-bold'>Trending</h3>
          <div className='pl-1'>
            <ul>
              {topKeywordsData.length > 0 && topKeywordsData.map((keyword: any, index: number) => (
                <li className='group cursor-pointer pb-2 mb-2 last:pb-0 last:mb-0' key={index}>
                  <span className='font-bold block leading-4 group-hover:underline'>{keyword.keyword}</span>
                  <small>{keyword.topics} Topics</small>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <div
        id='back-to-top'
        className='fixed bottom-4 md:bottom-2 right-2 py-2 px-3 w-auto flex bg-gray-200 dark:bg-neutral-800 font-mono hidden cursor-pointer'
        onClick={backToTopHandler}>
        Back to top
      </div>
    </div>
  )
}