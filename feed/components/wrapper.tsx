
'use client'

import { useState, useEffect, UIEvent, useRef } from 'react'

import { useSearchParams, usePathname } from 'next/navigation'
import Link from 'next/link'

import Container from '@/components/container'
import Filters from '@/components/filters'
import Feed from '@/components/feed'
import Footer from '@/components/footer'
import Spinner from '@/components/spinner'

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

  const loadingStateRef = useRef(isLoadMore) // this is crazy
  const backToTopRef = useRef(null)

  useEffect(() => {
    // router navigation back
    window.addEventListener("popstate", (e) => {
      document.body.style.overflowY = 'scroll' // enable scrolling when modal is closed
      backButtonWasClicked = true
    })

    // router navigation forward
    window.history.pushState = new Proxy(window.history.pushState, { // this is hacky, no pushstate event ?!
      apply: (target, thisArg: any, argArray: any) => {
        const url = (argArray && argArray[2]) ? argArray[2] : null

        if (url?.includes('/topics/'))
          document.body.style.overflowY = 'hidden' // disable scrolling when modal is open

        return target.apply(thisArg, argArray);
      },
    });

    window.addEventListener("scroll", onScrollHandler)
  }, [])

  // query params and path change
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

    const backToTop = (backToTopRef?.current) ? backToTopRef.current as HTMLElement : null

    if (backToTop) {
      if (!backToTop.classList.contains('hidden'))
        backToTop.classList.add('hidden')
    }

    const fetchFeedData = async () => {
      let data: any;
      const keywords = searchParams.get('keywords')

      if (keywords) {
        data = await getSearchFeed(keywords.split(','))
      } else {
        const endpoint = searchParams.get('sort') || config.api.defaultSort
        const bucket = searchParams.get('time') || config.api.defaultBucket

        data = await getFeed(endpoint, config.api.defaultLimit, bucket)

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

  // load more
  useEffect(() => {
    if (offset > 1 && !endOfFeed) {
      setIsLoadMore(true)
      loadingStateRef.current = true

      const fetchMoreData = async () => {
        let data: any;
        const keywords = searchParams.get('keywords')

        if (keywords) {
          data = await getSearchFeed(keywords.split(','), offset)
        } else {
          const endpoint = searchParams.get('sort') || config.api.defaultSort
          const bucket = searchParams.get('time') || config.api.defaultBucket

          data = await getFeed(endpoint, config.api.defaultLimit, bucket, offset)
        }

        setIsLoadMore(false)

        if (data && data.length > 0) {
          setFeedData((prevData: any) => [...prevData, ...data])
          loadingStateRef.current = false
        }
        else setEndOfFeed(true)
      }

      fetchMoreData()
        .catch(console.error)
    }
  }, [offset])

  function onScrollHandler(e: Event) {
    const backToTop = (backToTopRef?.current) ? backToTopRef.current as HTMLElement : null

    if (!backToTop)
      return

    const scrollHeight = document.body.scrollHeight
    const innerHeight = window.innerHeight
    const scrollTop = window.scrollY
    const isBottom = scrollTop + innerHeight + 5 >= scrollHeight

    if (scrollHeight <= innerHeight)
      return

    if (isBottom && !loadingStateRef.current) {
      loadingStateRef.current = true
      setOffset((old: number) => old + 1)
    }

    if (scrollTop > 100 && backToTop.classList.contains('hidden'))
      backToTop.classList.remove('hidden')
    else if (scrollTop <= 100 && !backToTop.classList.contains('hidden'))
      backToTop.classList.add('hidden')
  }

  function backToTopHandler(e: UIEvent<HTMLDivElement>) {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <Container>

      <div
        className='sticky top-[75px] md:top-[80px] z-40 bg-gray-200 dark:bg-black mb-2 lg:mt-0 lg:mb-3 rounded text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
        <Filters />
      </div>

      <div className='flex items-start'>
        <div className='md:mr-auto w-full max-w-full max-w-[900px] lg:w-[900px] overflow-x-hidden'>
          {isLoading && (<div className='w-full justify-center mt-3 pt-2 flex items-center justify-center'><Spinner />Loading ...</div>)}
          {!isLoading && (<Feed data={feedData} />)}
          {isLoadMore && (<div className='w-full justify-center mt-3 pt-2 flex items-center justify-center'><Spinner />Loading more ...</div>)}

          <Footer />
        </div>

        <div className='sticky top-[150px] h-auto w-[280px] p-4 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col rounded'>
          <h3 className='mb-5 text-2xl font-bold'>Trending</h3>
          <div className='pl-1'>
            <ul>
              {topKeywordsData.length > 0 && topKeywordsData.map((keyword: any, index: number) => (
                <li className='group cursor-pointer mb-2 last:mb-0' key={index}>
                  <Link href={`/?keywords=${keyword.keyword}`} className='pb-2 last:pb-0' prefetch={false}>
                    <span className='font-bold block leading-4 group-hover:underline'>{keyword.keyword}</span>
                    <small>{keyword.topics} Topics</small>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        ref={backToTopRef}
        className='fixed bottom-4 md:bottom-2 right-2 py-2 px-3 w-auto flex bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 font-mono hidden cursor-pointer'
        onClick={backToTopHandler}>
        Back to top
      </div>
    </Container>
  )
}