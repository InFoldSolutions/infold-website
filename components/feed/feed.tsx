
'use client'

import { useState, useEffect, useRef, UIEvent, useCallback, ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { closeAllWebSockets } from '@/websocket'

import Thumbs from '@/components/story/thumbs'
import StoryMeta from '@/components/story/meta'
import Category from '@/components/story/category'
import Loading from '@/components/helpers/loading'
import Skeleton from '@/components/feed/skeleton'
import FeedHeader from '@/components/feed/header'

import { getKeywordFeed } from '@/helpers/api'

import type { FeedMeta } from '@/types/feedmeta'
import type { APIResponse } from '@/types/response'
import type { Topic } from '@/types/topic'

export default function Feed({ meta }: { meta: FeedMeta }): ReactNode {
  const pathname = usePathname()

  const [data, setData] = useState<any>([])
  const [offset, setOffset] = useState<number>(1)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [endOfFeed, setEndOfFeed] = useState(false)

  const scrollParent = useRef<HTMLDivElement | null>(null)

  // pathname changed
  useEffect(() => {
    closeAllWebSockets()
  }, [pathname])

  // load data on load
  useEffect(() => {
    const fetchInitialData = async () => {
      const res: APIResponse = await getKeywordFeed(meta.keyword)

      if (res.data.length > 0)
        setData(res.data)
      else
        setEndOfFeed(true)

      //setTotalResults(res.meta.total_results || 0)
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
        const res: APIResponse = await getKeywordFeed(meta.keyword, offset)

        if (res.data.length > 0)
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

  const onScrollHandler = useCallback((e: Event) => {

    const scrollElement = scrollParent?.current;
    const scrollHeight = scrollElement?.scrollHeight || 0
    const innerHeight = scrollElement?.clientHeight || 0
    const scrollTop = scrollElement?.scrollTop || 0

    // Check if bottom
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
    const isBottom = Math.abs(scrollHeight - innerHeight - scrollTop) < 1

    if (scrollHeight <= innerHeight)
      return

    if (isBottom && !isLoadMore && !isLoading) {
      setIsLoadMore(true)
      setOffset((old: number) => old + 1)
    }
  }, [isLoadMore, setOffset, setIsLoadMore])

  // for scrollHandler
  useEffect(() => {
    if (scrollParent.current)
      scrollParent.current.addEventListener('scroll', onScrollHandler)

    return () => {
      if (scrollParent.current)
        scrollParent.current.removeEventListener('scroll', onScrollHandler)
    }
  }, [onScrollHandler]);

  return (
    <div className='overflow-hidden min-h-[70vh] w-full max-w-full min-w-[360px] lg:w-[370px] border-r-2 border-gray-200 dark:border-gray-800'>
      <FeedHeader keyword={meta.keyword} live={meta.live} icon={meta.icon} />

      <div className={`max-h-[94.5vh] pb-4 overflow-y-auto ${(isLoading) ? 'overflow-y-hidden' : ''}`} ref={scrollParent}>
        <div className={`flex md:mr-auto flex-col`}>
          {isLoading &&
            <Skeleton />
          }

          {!isLoading && data.length === 0 &&
            <div className='flex items-center justify-center w-full h-full min-h-[92vh]'>
              <span className='text-center w-full'>
                No stories found ..
              </span>
            </div>
          }

          <ul className='mb-2'>
            {data.map((item: Topic, index: number) => (
              <li className='relative no-highlight-tap border-gray-200 border-b-2 border-dashed dark:border-gray-800 dark:border-opacity-80 last:border-b-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-40 hover:bg-opacity-30'
                key={index}>
                <Link href={`/story/${item.slug}`} prefetch={false} className='p-4 flex flex-col'>

                  {item.category &&
                    <Category data={item} />
                  }

                  <div className='flex flex-col items-center mb-1'>
                    {(item.media?.length > 0) &&
                      <Thumbs media={item.media} />
                    }
                    <h3 className='text-2xl font-bold leading-snug text-left md:truncate-2-lines'>
                      {item.title}
                    </h3>
                  </div>

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