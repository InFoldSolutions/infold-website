
'use client'

import { useState, useEffect, UIEvent, useCallback } from 'react'

import { usePathname } from 'next/navigation'

import { closeAllWebSockets } from '@/websocket'

import Thumbs from '@/components/story/thumbs'
import StoryMeta from '@/components/story/meta'
import Category from '@/components/story/category'
import Loading from '@/components/helpers/loading'
import Skeleton from '@/components/layout/skeleton'

import { Item, loadDataForPathname, loadMoreDataForPathname } from '@/helpers/api'
import Link from 'next/link'


export default function Feed({ setShowToTop, setTotalResults, showToTop }: { setShowToTop: any, setTotalResults: any, showToTop: boolean }) {
  const pathname = usePathname()

  const [data, setData] = useState<any>([])
  const [offset, setOffset] = useState<number>(1)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [endOfFeed, setEndOfFeed] = useState(false)

  const onScrollHandler = useCallback((e: UIEvent) => {
    const scrollHeight = document.body.scrollHeight
    const innerHeight = window.innerHeight
    const scrollTop = window.scrollY
    const isBottom = scrollTop + innerHeight >= scrollHeight

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
    <div className={`flex md:mr-auto flex-col min-h-[70vh] w-full max-w-full pb-1 max-w-[900px] lg:w-[900px] overflow-x-hidden`}>
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
          <li className='relative md:pt-5 py-4 pb-2 md:px-6 px-2 no-highlight-tap border-gray-200 border-b-2 border-dashed dark:border-gray-800 dark:border-opacity-80 rounded last:border-b-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-40 hover:bg-opacity-30'
            key={index}>
            <Link href={`/story/${item.slug}`}>

            {item.category &&
              <Category data={item} />
            }

            <span className='flex items-center my-2'>
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
  )
}