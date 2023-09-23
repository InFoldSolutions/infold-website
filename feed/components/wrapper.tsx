
'use client'

import { useState, useEffect, UIEvent, useMemo, useCallback, use } from 'react'

import { Suspense } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'

import Container from '@/components/container'
import Filters from '@/components/filters'
import Feed from '@/components/feed'
import Loading from '@/components/loading'
import Spinner from '@/components/spinner'
import Interests from '@/components/interests'
import Keywords from '@/components/keywords'

import { getFeed, getSearchFeed, getInterestsFeed } from '@/helpers/api'
import { saveInterests, getInterests } from '@/helpers/localstorage'

import { closeWebsocket } from '@/websocket'

import config from '@/config'
import Premium from './premium'

export default function Wrapper({ initialFeedData, topKeywords, totalResults }: { initialFeedData: any, topKeywords: [], totalResults: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [feedData, setFeedData] = useState(initialFeedData || [])
  const [offset, setOffset] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [endOfFeed, setEndOfFeed] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showToTop, setShowToTop] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const isSelectScreen = useMemo(() => { // do we display interests screen ?
    const keywords = searchParams.get('keywords')
    return selectedInterests.length === 0 && (!pathname || pathname === '/') && !keywords
  }, [feedData, selectedInterests, pathname, searchParams])

  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const onScrollHandler = useCallback((e: UIEvent) => {
    if (isSelectScreen)
      return

    const scrollHeight = document.body.scrollHeight
    const innerHeight = window.innerHeight
    const scrollTop = window.scrollY
    const isBottom = scrollTop + innerHeight + 50 >= scrollHeight

    if (scrollTop > 90 && !showToTop)
      setShowToTop(true)
    else if (scrollTop <= 90 && showToTop)
      setShowToTop(false)

    if (scrollHeight <= innerHeight)
      return

    if (isBottom && !isLoadMore) {
      setIsLoadMore(true)
      setOffset((old: number) => old + 1)
    }
  }, [isSelectScreen, isLoadMore, showToTop, setShowToTop, setOffset, setIsLoadMore])

  // for scrollHandler
  useEffect(() => {
    // @ts-ignore
    document.addEventListener('scroll', onScrollHandler);

    return () => {
      // @ts-ignore
      document.removeEventListener('scroll', onScrollHandler);
    }
  }, [onScrollHandler]);

  // on initial load get interests from localstorage
  useEffect(() => {
    setIsLoaded(true)

    // @ts-ignore
    setSelectedInterests(getInterests())
  }, [])

  // selected interests changed
  useEffect(() => {
    if ((pathname && pathname !== '/'))
      return

    if (selectedInterests.length === 0 || feedData?.length > 0)
      return

    setIsLoading(true)

    const fetchInterestFeedData = async () => {
      let res: any = await getInterestsFeed(selectedInterests)

      if (res.data && res.meta?.total_results > 0) {
        setFeedData(res.data);
        setIsLoading(false);
      }
    }

    fetchInterestFeedData()
      .catch(console.error)
  }, [selectedInterests])

  // pathname changed
  useEffect(() => {
    if (pathname.startsWith('/topics/')) { // going to topic
      document.body.style.overflowY = 'hidden' // disable scrolling when modal is open
    } else if (document.body.style.overflowY === 'hidden') { // comming from topic
      document.body.style.overflowY = 'scroll' // enable scrolling when modal is closed
      closeWebsocket()
    }
  }, [pathname, searchParams])

  // load more
  useEffect(() => {
    if (offset > 1 && !endOfFeed) {
      setIsLoadMore(true)

      const fetchMoreData = async () => {
        let res: any;

        const keywords = searchParams.get('keywords')
        const pathnameParts = pathname.split('/')
        const endpoint = pathnameParts[1]
        const bucket = pathnameParts[2] || config.api.defaultBucket

        if (keywords)
          res = await getSearchFeed(keywords.split(','), offset)
        else if (endpoint)
          res = await getFeed(endpoint, config.api.defaultLimit, bucket, offset)
        else if (selectedInterests.length > 0)
          res = await getInterestsFeed(selectedInterests, offset)

        if (res?.data?.length > 0)
          setFeedData((prevData: any) => [...prevData, ...res.data])
        else
          setEndOfFeed(true)

        setIsLoadMore(false)
      }

      fetchMoreData()
        .catch(console.error)
        .finally(() => setIsLoadMore(false))
    }
  }, [offset])

  return (
    <Container>

      <div className='bg-gray-300 dark:bg-black sticky top-0 z-40 mb-2 -mt-[5px] lg:mb-3 pt-2'>
        <div
          className='bg-gray-200 dark:bg-black rounded text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
          <Filters isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} totalResults={totalResults} showToTop={showToTop} />
        </div>
      </div>

      <div className='flex items-start flex-row'>
        <div className={`flex md:mr-auto ${isSelectScreen || feedData.length === 0 ? 'm-auto flex-row' : 'flex-col'} min-h-[70vh] w-full max-w-full pb-4 max-w-[900px] lg:w-[900px] overflow-x-hidden`}>
          {!isLoaded && isLoading && !isSelectScreen && feedData.length === 0 &&
            <Loading />
          }

          {isSelectScreen && isLoaded &&
            <Interests interests={config.interests} saveInterests={saveInterests} setSelectedInterests={setSelectedInterests} />
          }

          <Suspense fallback={<Loading />}>
            <Feed data={feedData} />
          </Suspense>

          {!isSelectScreen && feedData.length === 0 && !isLoading &&
            <div className='my-auto pl-2 text-center text-2xl w-full'>No topics found</div>
          }

          {isLoadMore &&
            <div className='w-full justify-center mt-3 pt-2 flex items-center'><Spinner />Loading more ...</div>
          }
        </div>

        <div className='sticky top-20'>
          <div className={`h-auto w-[280px] mb-4 p-4 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col rounded ${isSelectScreen ? 'lg:hidden' : ''} `}>
            <h3 className='mb-5 text-2xl font-bold flex items-center'>
              <i className='fad fa-rocket-launch mr-3 text-xl'></i>
              Trending
            </h3>
            <div className='pl-1'>
              <Keywords keywords={topKeywords} />
            </div>
          </div>

          <Premium isSelectScreen={isSelectScreen} />
        </div>
      </div>

      {showToTop &&
        <div className='sticky bottom-16 ml-auto flex items-center justify-end cursor-pointer z-50 px-5 py-2 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 w-fit rounded' onClick={backToTop}>
          <i className={`fad fa-chevron-circle-up md:mr-3`} />
          <span className='hidden lg:flex'>Back to Top</span>
        </div>
      }
    </Container >
  )
}