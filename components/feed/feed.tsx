
'use client'

import { useState, useEffect, useRef, UIEvent, useCallback } from 'react'

import { usePathname } from 'next/navigation'

import { closeAllWebSockets } from '@/websocket'

import Thumbs from '@/components/story/thumbs'
import StoryMeta from '@/components/story/meta'
import Category from '@/components/story/category'
import Loading from '@/components/helpers/loading'
import Skeleton from '@/components/feed/skeleton'

import { Item, loadDataForPathname, loadMoreDataForPathname } from '@/helpers/api'
import Link from 'next/link'
import FeedHeader from './header'


export default function Feed({ setShowToTop, setTotalResults, showToTop }: { setShowToTop: any, setTotalResults: any, showToTop: boolean }) {
  const pathname = usePathname()

  const [data, setData] = useState<any>([])
  const [offset, setOffset] = useState<number>(1)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [endOfFeed, setEndOfFeed] = useState(false)

  const scrollParent = useRef<HTMLDivElement | null>(null)

  const onScrollHandler = useCallback((e: UIEvent) => {

    const scrollElement = scrollParent?.current;
    const scrollHeight = scrollElement?.scrollHeight || 0
    const innerHeight = scrollElement?.clientHeight || 0
    const scrollTop = scrollElement?.scrollTop || 0

    // Check if bottom
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
    const isBottom = Math.abs(scrollHeight - innerHeight - scrollTop) < 1;

    if (scrollTop > 90 && !showToTop)
      setShowToTop(true)
    else if (scrollTop <= 90 && showToTop)
      setShowToTop(false)

    if (scrollHeight <= innerHeight)
      return

    if (isBottom && !isLoadMore && !isLoading) {
      setIsLoadMore(true)
      setOffset((old: number) => old + 1)
    }
  }, [isLoadMore, showToTop, setShowToTop, setOffset, setIsLoadMore])

  // for scrollHandler
  useEffect(() => {
    // @ts-ignore
    scrollParent.current.addEventListener('scroll', onScrollHandler);

    return () => {
      // @ts-ignore
      scrollParent.current.removeEventListener('scroll', onScrollHandler);
    }
  }, [onScrollHandler]);

  // pathname changed
  useEffect(() => {
    closeAllWebSockets()
  }, [pathname])

  // load data on load
  useEffect(() => {
    const fetchInitialData = async () => {
      const res = await loadDataForPathname(pathname)

      if (res?.data?.length > 0)
        setData(res.data)
      else
        setEndOfFeed(true)

      setTotalResults(res?.meta?.total_results || 0)
    }

    fetchInitialData()
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  // load more
  useEffect(() => {
    if (offset > 1 && !endOfFeed && !isLoading) {
      setIsLoadMore(true)

      const fetchMoreData = async () => {
        const res = await loadMoreDataForPathname(pathname, offset)

        if (res?.data?.length > 0)
          setData((prevData: any) => [...prevData, ...res.data])
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
    <div className='overflow-hidden min-h-[70vh] w-full max-w-full max-w-[500px] lg:w-[500px]'>
      <FeedHeader />

      <div className={`max-h-[94.5vh] overflow-y-auto pb-1 ${(isLoading) ? 'overflow-y-hidden' : ''}`} ref={scrollParent}>
        <div className={`flex md:mr-auto flex-col`}>
          {isLoading &&
            <Skeleton />
          }

          {!isLoading && data.length === 0 &&
            <div className='flex items-center justify-center w-full h-full min-h-[70vh]'>
              <span className='text-center w-full'>
                No stories found ..
              </span>
            </div>
          }

          <ul className='mb-2'>
            {data.map((item: Item, index: number) => (
              <li className='relative p-4 no-highlight-tap border-gray-200 border-b-2 border-dashed dark:border-gray-800 dark:border-opacity-80 last:border-b-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-40 hover:bg-opacity-30'
                key={index}>
                <Link href={`/story/${item.slug}`} prefetch={false}>

                  {item.category &&
                    <Category data={item} />
                  }

                  <span className='flex items-center mb-2'>
                    {(item.media?.length > 0) &&
                      <Thumbs media={item.media} />
                    }
                    <h3 className='text-3xl font-bold leading-snug text-left md:truncate-2-lines'>
                      {item.title}
                    </h3>
                  </span>

                  <span className='text-left'>
                    {item.outline.slice(0, 1).map((outline: any, index: number) => (
                      <p className='text-base text-gray-600 dark:text-gray-300 truncate-2-lines' key={index}>
                        {outline}
                      </p>
                    ))}
                  </span>

                  <StoryMeta data={item} time={true} />
                </Link>
              </li>
            ))}
          </ul>

          {isLoadMore &&
            <Loading />
          }
        </div>
      </div>
    </div>
  )
}