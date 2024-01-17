
'use client'

import { useState, useEffect, useRef, useCallback, ReactNode } from 'react'

import { usePathname } from 'next/navigation'

import { closeAllWebSockets } from '@/websocket'

import Loading from '@/components/helpers/loading'
import Skeleton from '@/components/feed/skeleton'
import FeedHeader from '@/components/feed/header'
import TopicPost from '@/components/feed/topic'
import RedditPreview from '@/components/feed/redditpost'

import { loadFeed } from '@/apis/helpers'

import type { FeedMeta } from '@/types/feedmeta'
import type { APIResponse } from '@/types/response'
import type { Topic } from '@/types/topic'
import type { RedditPost } from '@/types/redditpost'

export default function Feed({ meta }: { meta: FeedMeta }): ReactNode {
  const pathname = usePathname()

  const [data, setData] = useState<any>([])
  const [offset, setOffset] = useState<number>(1)
  const [lastId, setLastId] = useState<string>('')
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [endOfFeed, setEndOfFeed] = useState(false)

  const scrollParent = useRef<HTMLDivElement | null>(null)

  const onScrollHandler = useCallback((e: Event) => {
    const scrollElement = scrollParent?.current;
    const scrollHeight = scrollElement?.scrollHeight || 0
    const innerHeight = scrollElement?.clientHeight || 0
    const scrollTop = scrollElement?.scrollTop || 0

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
    const isBottom = Math.abs(scrollHeight - innerHeight - scrollTop) < 1

    if (scrollHeight <= innerHeight)
      return

    if (isBottom && !isLoadMore && !isLoading) {
      setIsLoadMore(true)

      if (meta.type === 'subreddit')
        setLastId(data[data.length - 1].id)
      else
        setOffset((old: number) => old + 1)
    }
  }, [scrollParent, isLoadMore, isLoading, meta, setOffset, setLastId, setIsLoadMore])

  // pathname changed
  useEffect(() => {
    closeAllWebSockets()
  }, [pathname])

  // load data on load
  useEffect(() => {
    const fetchInitialData = async () => {
      const res: APIResponse = await loadFeed(meta, offset, lastId)

      if (res.meta.success)
        setData(res.data)
      else
        setEndOfFeed(true)
    }

    fetchInitialData()
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  // load more
  useEffect(() => {
    if ((offset > 1 || lastId !== '') && !endOfFeed && !isLoading) {
      setIsLoadMore(true)

      const fetchMoreData = async () => {
        const res: APIResponse = await loadFeed(meta, offset, lastId)

        if (res.meta.success)
          setData((prevData: any) => [...prevData, ...res.data])
        else
          setEndOfFeed(true)
      }

      fetchMoreData()
        .catch(console.error)
        .finally(() => setIsLoadMore(false))
    } else if (endOfFeed)
      setIsLoadMore(false)

  }, [offset, lastId, endOfFeed, meta, setIsLoadMore])

  useEffect(() => {
    if (scrollParent.current)
      scrollParent.current.addEventListener('scroll', onScrollHandler)

    return () => {
      if (scrollParent.current)
        scrollParent.current.removeEventListener('scroll', onScrollHandler)
    }
  }, [scrollParent, onScrollHandler]);


  function renderPost(postData: Topic | RedditPost, type: string, index: number) {
    switch (type) {
      case 'subreddit':
        return (
          <RedditPreview post={postData as RedditPost} key={index} />
        )
      default:
        return (
          <TopicPost topic={postData as Topic} key={index} />
        )
    }
  }

  return (
    <div className='overflow-hidden min-h-[70vh] w-full max-w-full min-w-[89vw] md:min-w-[370px] border-r-2 border-gray-200 dark:border-gray-800'>
      <FeedHeader meta={meta} />

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
            {data.map((item: Topic | RedditPost, index: number) => (
              renderPost(item, meta.type, index)
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