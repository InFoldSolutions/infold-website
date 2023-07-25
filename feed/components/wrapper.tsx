
'use client'

import { useRef, useState, useEffect, UIEvent } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'

import Header from '@/components/header'
import Filters from '@/components/filters'
import Feed from '@/components/feed'

import { getFeed, getSearchFeed } from '@/helpers/api'
import Footer from './footer'

let loaded = false;

export default function Wrapper({ initialData }: { initialData: any }) {
  const [feedData, setFeedData] = useState(initialData);
  const [offset, setOffset] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const pathname = usePathname()
  const searchParams: any = useSearchParams()

  useEffect(() => {
    if (!loaded) { // ignore on 1st load, server side rendering !TODO: this doesn't account for "back" navigation
      loaded = true;
      return
    }

    setOffset(1);

    const fetchFeedData = async () => {
      setIsLoading(true);

      let data: any;
      const keywords = searchParams.get('keywords');

      if (keywords) {
        data = await getSearchFeed(keywords.split(','))
      } else {
        const endpoint = searchParams.get('sort') || 'rising';
        const bucket = searchParams.get('time') || null;

        data = await getFeed(endpoint, 20, bucket)
      }

      setIsLoading(false);

      if (data)
        setFeedData(data);
    }

    fetchFeedData()
      .catch(console.error)
  }, [pathname, searchParams])

  useEffect(() => {
    if (offset > 1) {
      const fetchMoreData = async () => {
        setIsLoadMore(true)

        let data: any;
        const keywords = searchParams.get('keywords')

        if (keywords) {
          data = await getSearchFeed(keywords.split(','), offset)
        } else {
          const endpoint = searchParams.get('sort') || 'rising'
          const bucket = searchParams.get('time') || null

          data = await getFeed(endpoint, 20, bucket, offset)
        }

        setIsLoadMore(false);

        if (data)
          setFeedData((prevData: any) => [...prevData, ...data])
      }

      fetchMoreData()
        .catch(console.error)
    }
  }, [offset])

  function onScrollHandler(e: UIEvent<HTMLDivElement>) {
    const element = e.target as HTMLElement;
    const isBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 1;

    if (isBottom)
      setOffset(offset + 1);
  }

  return (
    <div className='w-full max-h-screen font-mono lg:flex overflow-y-auto' onScroll={onScrollHandler}>
      <div className='md:mx-auto max-w-[780px] lg:w-[780px] pl-4 md:pl-8'>
        <Header />

        <div
          className='mb-6 mt-8 lg:mt-0 lg:mb-8 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
          <Filters />
        </div>

        {isLoading && (`Loading ...`)}
        {!isLoading && (<Feed data={feedData} />)}

        {isLoadMore && (<div className='w-full justify-center m-2 p-2'>Loading more ...</div>)}

        <Footer />
      </div>
    </div>
  )
}