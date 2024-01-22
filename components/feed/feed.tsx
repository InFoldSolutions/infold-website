'use client'

import { useState, useEffect, useRef, useCallback, ReactNode, useMemo, useReducer } from 'react'

import { usePathname } from 'next/navigation'

import { closeAllWebSockets } from '@/apis/websocket'

import { feedDataReducer, loadFeedData } from '@/reducers/feedData'

import Loading from '@/components/helpers/loading'
import Skeleton from '@/components/feed/skeleton'
import FeedHeader from '@/components/feed/header'
import RenderCard from '@/components/feed/cards/renderCard'

import type { FeedMeta } from '@/types/feedmeta'
import type { APIResponse } from '@/types/response'

export default function Feed({ meta, removeFeed, setMeta }: { meta: FeedMeta, removeFeed: any, setMeta: any }): ReactNode {
  const pathname = usePathname()

  const [data, dispatchData] = useReducer(feedDataReducer, []);
  const [offset, setOffset] = useState<number>(1)
  const [lastId, setLastId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [endOfFeed, setEndOfFeed] = useState(false)

  const scrollParent = useRef<HTMLDivElement | null>(null)

  const fetchInitialData = async () => {
    setIsLoading(true)

    const res: APIResponse = await loadFeedData(meta, offset, lastId)

    if (res.meta.success && res.data.length > 0)
      dispatchData({
        type: 'load',
        data: res.data
      })
    else {
      dispatchData({
        type: 'clear',
        data: []
      })

      setEndOfFeed(true)
    }

    setIsLoading(false)
  }

  const fetchMoreData = async () => {
    setIsLoadingMore(true)
    const res: APIResponse = await loadFeedData(meta, offset, lastId)

    if (res.meta.success && res.data.length > 0) {
      dispatchData({
        type: 'more',
        data: res.data
      })
    } else
      setEndOfFeed(true)

    setIsLoadingMore(false)
  }

  const onScrollHandler = useCallback((e: Event) => {
    const scrollElement = scrollParent?.current;
    const scrollHeight = scrollElement?.scrollHeight || 0
    const innerHeight = scrollElement?.clientHeight || 0
    const scrollTop = scrollElement?.scrollTop || 0

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
    const isBottom = Math.abs(scrollHeight - innerHeight - scrollTop) < 1

    if (isBottom && !isLoadingMore && !isLoading && !endOfFeed) {
      if (meta.type === 'subreddit' && data.length > 0)
        setLastId(data[data.length - 1].id)
      else
        setOffset((old: number) => old + 1)
    }
  }, [scrollParent, isLoadingMore, isLoading, endOfFeed, meta, data])

  // pathname changed
  useEffect(() => {
    closeAllWebSockets()
  }, [pathname])

  // meta changed
  useEffect(() => {
    if (!meta.keyword && data.length > 0) {
      dispatchData({
        type: 'clear',
        data: []
      })
    } else if ((meta.keyword && !isLoading)) {
      setOffset(1)
      setLastId('')
      setEndOfFeed(false)

      fetchInitialData()
        .catch(console.error)
    }
  }, [meta])

  // initial load
  useEffect(() => {
    if (!meta.keyword) {
      setIsLoading(false)
      setEndOfFeed(true)
      return
    }

    fetchInitialData()
      .catch(console.error)
  }, [])

  // load more
  useEffect(() => {
    if ((offset > 1 || lastId !== '') && !endOfFeed && !isLoading) {
      fetchMoreData()
        .catch(console.error)
    } else if (endOfFeed)
      setIsLoadingMore(false)
  }, [offset, lastId, endOfFeed, isLoading])

  useEffect(() => {
    if (scrollParent.current)
      scrollParent.current.addEventListener('scroll', onScrollHandler)

    return () => {
      if (scrollParent.current)
        scrollParent.current.removeEventListener('scroll', onScrollHandler)
    }
  }, [scrollParent]);

  return (
    <div className='overflow-hidden min-h-[70vh] w-full max-w-full min-w-[89vw] md:min-w-[370px] border-r-2 border-gray-200 dark:border-gray-800'>
      <FeedHeader meta={meta} removeFeed={removeFeed} setMeta={setMeta} />

      <div className={`max-h-[94.5vh] pb-8 overflow-y-auto ${(isLoading) ? 'overflow-y-hidden' : ''}`} ref={scrollParent}>
        <div className={`flex md:mr-auto flex-col`}>
          {isLoading &&
            <Skeleton />
          }

          {!isLoading && data.length === 0 &&
            <div className='flex items-center justify-center w-full h-full min-h-[90vh]'>
              <span className='text-center w-full'>
                No stories found ..
              </span>
            </div>
          }

          <ul className='mb-2'>
            {data.map((item: any, index: number) => (
              <RenderCard item={item} type={meta.type} key={index} />
            ))}
          </ul>

          {isLoadingMore &&
            <Loading />
          }
        </div>
      </div>
    </div>
  )
}