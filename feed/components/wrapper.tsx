
'use client'

import { useState, useEffect, UIEvent } from 'react'
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
  const [endOfFeed, setEndOfFeed] = useState(false);

  const pathname = usePathname()
  const searchParams: any = useSearchParams()

  useEffect(() => {

    if (!loaded) { // ignore on 1st load, server side rendering !TODO: this doesn't account for "back" navigation
      loaded = true;
      return
    }

    setIsLoading(true)

    setOffset(1);
    setEndOfFeed(false);

    const backToTop = document.getElementById('back-to-top') as HTMLElement;

    if (!backToTop.classList.contains('hidden'))
      backToTop.classList.add('hidden')

    const fetchFeedData = async () => {

      let data: any;
      const keywords = searchParams.get('keywords')

      if (keywords) {
        data = await getSearchFeed(keywords.split(','))
      } else {
        const endpoint = searchParams.get('sort') || 'rising'
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

    if (offset > 1 && !endOfFeed) {
      setIsLoadMore(true)

      const fetchMoreData = async () => {

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

        if (data && data.length > 0)
          setFeedData((prevData: any) => [...prevData, ...data])
        else
          setEndOfFeed(true)
      }

      fetchMoreData()
        .catch(console.error)
    }
  }, [offset])

  function onScrollHandler(e: UIEvent<HTMLDivElement>) {
    const element = e.target as HTMLElement
    const backToTop = element.nextElementSibling as HTMLElement
    const isBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 1

    if (element.scrollHeight <= document.body.clientHeight)
      return

    if (isBottom && !isLoadMore)
      setOffset(offset + 1);

    if (element.scrollTop > 100 && backToTop.classList.contains('hidden'))
      backToTop.classList.remove('hidden')
    else if (element.scrollTop <= 100 && !backToTop.classList.contains('hidden'))
      backToTop.classList.add('hidden')
  }

  function backToTopHandler(e: UIEvent<HTMLDivElement>) {
    const element = e.target as HTMLElement
    const scrollElement = element.previousElementSibling as HTMLElement

    if (!scrollElement) return console.warn('Wrapper: backToTopHandler: scrollElement not found')

    scrollElement.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className='relative overflow-hidden'>
      <div className='w-full max-h-screen font-mono lg:flex overflow-y-auto overflow-x-hidden no-scrollbar' onScroll={onScrollHandler}>
        <div className='md:mx-auto max-w-[780px] lg:w-[780px] px-4'>
          <Header />

          <div
            className='mb-4 mt-8 lg:mt-0 lg:mb-4 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
            <Filters />
          </div>

          {isLoading && (`Loading ...`)}
          {!isLoading && (<Feed data={feedData} />)}

          {isLoadMore && (<div className='w-full justify-center mt-3 pt-2'>Loading more ...</div>)}

          <Footer />
        </div>
      </div>

      <div
        id='back-to-top'
        className='absolute bottom-2 right-2 py-2 px-3 w-auto flex bg-transparent border-dashed border-2 border-white dark:border-neutral-600 hidden cursor-pointer'
        onClick={backToTopHandler}>
        Back to top
      </div>
    </div>
  )
}