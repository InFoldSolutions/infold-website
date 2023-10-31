
'use client'

import { useState, useEffect, UIEvent, useMemo, useCallback, Suspense } from 'react'

import { usePathname } from 'next/navigation'

import Container from '@/components/layout/container'
import Filters from '@/components/layout/filters'
import Feed from '@/components/layout/feed'
import Loading from '@/components/helpers/loading'
import Spinner from '@/components/helpers/spinner'
import Keywords from '@/components/sidebar/keywords'
import Premium from '@/components/sidebar/premium'

import { getInterestsFeed, getKeywordFeed, getSearchFeed, getSectionFeed, getTopFeed } from '@/helpers/api'
import { getInterests } from '@/helpers/localstorage'
import { isBrowser } from '@/helpers/utils'

import { closeAllWebSockets } from '@/websocket'

import config from '@/config'

export default function Wrapper({ initialFeedData, totalResults }: { initialFeedData: any, totalResults: number }) {
  const pathname = usePathname()

  const [feedData, setFeedData] = useState(initialFeedData || [])
  const [offset, setOffset] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [endOfFeed, setEndOfFeed] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState((isBrowser) ? getInterests() : [])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showToTop, setShowToTop] = useState(false)

  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const onScrollHandler = useCallback((e: UIEvent) => {
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
  }, [isLoadMore, showToTop, setShowToTop, setOffset, setIsLoadMore])

  // for scrollHandler
  useEffect(() => {
    // @ts-ignore
    document.addEventListener('scroll', onScrollHandler);

    return () => {
      // @ts-ignore
      document.removeEventListener('scroll', onScrollHandler);
    }
  }, [onScrollHandler]);

  // pathname changed
  useEffect(() => {
    if (pathname.startsWith('/story/')) { // going to a story
      document.body.style.overflowY = 'hidden' // disable scrolling when modal is open
    } else if (document.body.style.overflowY === 'hidden') { // comming from a story
      document.body.style.overflowY = 'scroll' // enable scrolling when modal is closed
      closeAllWebSockets()
    }
  }, [pathname])

  // load more
  useEffect(() => {
    if (offset > 1 && !endOfFeed) {
      setIsLoadMore(true)

      const fetchMoreData = async () => {
        let res: any;

        const pathnameParts = pathname.split('/')
        const endpoint = pathnameParts[1]
        const param = pathnameParts[2]

        if (endpoint === 'keyword')
          res = await getKeywordFeed(param, offset)
        else if (endpoint === 'search')
          res = await getSearchFeed(param, offset)
        else if (endpoint === 'section')
          res = await getSectionFeed(config.api.defaultBucket, param, offset)
        else if (selectedInterests.length > 0)
          res = await getInterestsFeed(selectedInterests, offset)
        else
          res = await getTopFeed(config.api.defaultBucket, offset)

        if (res?.data?.length > 0)
          setFeedData((prevData: any) => [...prevData, ...res.data])
        else
          setEndOfFeed(true)

        setIsLoadMore(false)
      }

      fetchMoreData()
        .catch(console.error)
        .finally(() => setIsLoadMore(false))
    } else if (endOfFeed)
      setIsLoadMore(false)

  }, [offset, endOfFeed, setIsLoadMore])

  return (
    <Container>

      <div className='bg-gray-300 dark:bg-black sticky top-0 z-40 mb-2 -mt-[5px] lg:mb-3 pt-2'>
        <div
          className='bg-gray-200 dark:bg-black rounded text-xl text-body-color'>
          <Filters isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} totalResults={totalResults} showToTop={showToTop} />
        </div>
      </div>

      <div className='flex items-start flex-row'>
        <div className={`flex md:mr-auto ${feedData.length === 0 ? 'm-auto flex-row' : 'flex-col'} min-h-[70vh] w-full max-w-full pb-1 max-w-[900px] lg:w-[900px] overflow-x-hidden`}>
          {isLoading && feedData.length === 0 &&
            <Loading />
          }

          <Suspense fallback={<Loading />}>
            <Feed data={feedData} />
          </Suspense>

          {feedData.length === 0 && !isLoading &&
            <div className='my-auto pl-2 text-center text-2xl w-full'>No topics found</div>
          }

          {isLoadMore &&
            <div className='w-full justify-center mt-4 pt-2 flex items-center'><Spinner />Loading more ...</div>
          }
        </div>

        <div className='sticky top-20'>
          <div className={`h-auto w-[280px] mb-4 p-4 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col rounded`}>
            <h3 className='mb-5 text-2xl font-bold flex items-center'>
              <i className='fad fa-rocket-launch mr-3 text-xl'></i>
              Trending
            </h3>
            <div className='pl-1'>
              <Keywords defaultSize={6} />
            </div>
          </div>

          <Premium isSelectScreen={false} />
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