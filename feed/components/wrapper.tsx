
'use client'

import { useState, useEffect, UIEvent, useRef, useMemo, useCallback } from 'react'

import { useSearchParams, usePathname } from 'next/navigation'
import Link from 'next/link'

import Container from '@/components/container'
import Filters from '@/components/filters'
import Feed from '@/components/feed'
import Spinner from '@/components/spinner'
import Interests from '@/components/interests'

import { getFeed, getSearchFeed, getTopKeywords, getInterestsFeed } from '@/helpers/api'
import config from '@/config'

let backButtonWasClicked = false;

export default function Wrapper({ initialFeedData, topKeywords, totalResults }: { initialFeedData: any, topKeywords: [], totalResults: number }) {

  const [topKeywordsData, setTopKeywordsData] = useState(topKeywords)
  const [feedData, setFeedData] = useState(initialFeedData || [])
  const [offset, setOffset] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [endOfFeed, setEndOfFeed] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTotalResults, setSearchTotalResults] = useState(totalResults)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isSelectScreen = useMemo(() => { // do we display interests screen ?
    const keywords = searchParams.get('keywords')
    const endpoint = searchParams.get('sort')
    return selectedInterests.length === 0 && (!pathname || pathname === '/') && !keywords && !endpoint && loaded
  }, [feedData, selectedInterests, pathname, searchParams])

  const onScrollHandler = useCallback((e: UIEvent) => {
    if (isSelectScreen)
      return

    const scrollHeight = document.body.scrollHeight
    const innerHeight = window.innerHeight
    const scrollTop = window.scrollY
    const isBottom = scrollTop + innerHeight + 50 >= scrollHeight

    if (scrollHeight <= innerHeight)
      return

    if (isBottom && !isLoadMore)
      setOffset((old: number) => old + 1)

  }, [isSelectScreen, feedData, isLoadMore])

  useEffect(() => {
    // @ts-ignore
    setSelectedInterests(localStorage.getItem("interests") ? JSON.parse(localStorage.getItem("interests")) : [])

    // router navigation back
    window.addEventListener("popstate", (e) => {
      console.log('popstate', e.state, document.location)
      if (!backButtonWasClicked) {
        document.body.style.overflowY = 'scroll' // enable scrolling when modal is closed
        backButtonWasClicked = true
      }
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
  }, [])

  useEffect(() => {
    // @ts-ignore
    document.addEventListener('scroll', onScrollHandler);

    return function () {
      // @ts-ignore
      document.removeEventListener('scroll', onScrollHandler);
    }
  }, [onScrollHandler]);

  // interests change
  useEffect(() => {
    if (selectedInterests.length === 0 || feedData?.length > 0)
      return

    setIsLoading(true)

    const fetchInterestFeedData = async () => {
      let res: any = await getInterestsFeed(selectedInterests)

      const newTopKeywords = await getTopKeywords(config.api.defaultBucket)
      setTopKeywordsData(newTopKeywords)

      setIsLoading(false);

      if (res.data && res.meta?.total_results > 0) {
        setFeedData(res.data);
        setSearchTotalResults(res.meta.total_results)
      }
    }

    fetchInterestFeedData()
      .catch(console.error)
  }, [selectedInterests])

  // query params and path change
  useEffect(() => {
    if (backButtonWasClicked) {
      backButtonWasClicked = false
      return
    }

    if (pathname.includes('/topics/'))
      return

    if (!loaded) {
      setLoaded(true)
      return
    }

    setOffset(1)
    setEndOfFeed(false)
    setIsMenuOpen(false)

    setIsLoading(true)

    const fetchFeedData = async () => {
      let res: any;

      setFeedData([])

      const keywords = searchParams.get('keywords')
      const endpoint = searchParams.get('sort')
      const bucket = searchParams.get('time') || config.api.defaultBucket

      if (keywords)
        res = await getSearchFeed(keywords.split(','))
      else if (endpoint)
        res = await getFeed(endpoint, config.api.defaultLimit, bucket)
      else if (selectedInterests.length > 0)
        res = await getInterestsFeed(selectedInterests)

      if (res?.data && res?.meta?.total_results > 0) {
        setFeedData(res.data);
        setSearchTotalResults(res.meta.total_results)
      }

      const newTopKeywords = await getTopKeywords(bucket)
      setTopKeywordsData(newTopKeywords)
    }

    fetchFeedData()
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [pathname, searchParams])

  // load more
  useEffect(() => {
    if (offset > 1 && !endOfFeed) {
      setIsLoadMore(true)

      const fetchMoreData = async () => {
        let res: any;

        const keywords = searchParams.get('keywords')
        const endpoint = searchParams.get('sort')

        if (keywords) {
          res = await getSearchFeed(keywords.split(','), offset)
        } else if (endpoint) {
          const bucket = searchParams.get('time') || config.api.defaultBucket
          res = await getFeed(endpoint, config.api.defaultLimit, bucket, offset)
        } else if (selectedInterests.length > 0) {
          res = await getInterestsFeed(selectedInterests, offset)
        }

        if (res?.data?.length > 0)
          setFeedData((prevData: any) => [...prevData, ...res.data])
        else
          setEndOfFeed(true)
      }

      fetchMoreData()
        .catch(console.error)
        .finally(() => setIsLoadMore(false))
    }
  }, [offset])

  function saveInterests(interests: string[]) {
    if (interests.length < 4)
      return

    localStorage.setItem("interests", JSON.stringify(interests));

    // @ts-ignore
    setSelectedInterests(interests)
  }

  return (
    <Container>

      <div
        className='sticky top-[87px] md:top-[91px] z-40 bg-gray-200 dark:bg-black mb-2 -mt-[3px] lg:mb-3 rounded text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
        <Filters isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} totalResults={searchTotalResults} />
      </div>

      <div className='flex items-start flex-row'>
        <div className={`flex md:mr-auto ${isSelectScreen || feedData.length === 0 ? 'm-auto flex-row' : 'flex-col'} min-h-[70vh] w-full max-w-full pb-4 max-w-[900px] lg:w-[900px] overflow-x-hidden`}>
          {isLoading && !isSelectScreen &&
            <div className='w-full justify-center my-auto flex items-center'>
              <Spinner />Loading ...
            </div>
          }

          {isSelectScreen &&
            <Interests interests={config.interests} saveInterests={saveInterests} />
          }

          {feedData?.length > 0 && !isLoading &&
            <Feed data={feedData} />
          }

          {!isSelectScreen && feedData.length === 0 && !isLoading && loaded &&
            <div className='my-auto pl-2 text-center text-2xl w-full'>No topics found.</div>
          }

          {isLoadMore && loaded &&
            <div className='w-full justify-center mt-3 pt-2 flex items-center'><Spinner />Loading more ...</div>
          }
        </div>

        <div className={`sticky top-[168px] h-auto w-[280px] p-4 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col rounded ${isSelectScreen || feedData.length === 0 ? 'lg:hidden' : ''} `}>
          <h3 className='mb-5 text-2xl font-bold flex items-center'>
            <i className='fad fa-rocket-launch mr-3 text-xl'></i>
            Trending
          </h3>
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
    </Container>
  )
}