
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'

import Header from '@/components/header'
import Filters from '@/components/filters'
import Feed from '@/components/feed'

import { getFeed, getSearchFeed } from '@/helpers/api'
import Footer from './footer'

let loaded = false;

export default function Wrapper({ initialData }: { initialData: any }) {
  const [feedData, setFeedData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname()
  const searchParams: any = useSearchParams()

  // listen for URL changes
  useEffect(() => {
    if (!loaded) { // ignore on 1st load, server side rendering
      loaded = true;
      return
    }

    const keywords = searchParams.get('keywords');

    if (keywords) {
      const fetchSearchData = async () => {
        setIsLoading(true);
        const data = await getSearchFeed(keywords.split(','));
        setIsLoading(false);

        if (data) setFeedData(data);
      }

      fetchSearchData()
        .catch(console.error)
    } else {
      const endpoint = searchParams.get('sort') || 'rising';
      const bucket = searchParams.get('time') || null;

      const fetchFeedData = async () => {
        setIsLoading(true);
        const data = await getFeed(endpoint, 20, bucket);
        setIsLoading(false);

        if (data) setFeedData(data);
      }

      fetchFeedData()
        .catch(console.error)
    }
  }, [pathname, searchParams])

  return (
    <div className='md:mx-auto max-w-[780px] lg:w-[780px] pl-4 md:pl-8'>
      <Header />

      <div
        className='mb-6 mt-8 lg:mt-0 lg:mb-8 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
        <Filters />
      </div>

      {isLoading && (`Loading ...`)}
      {!isLoading && (<Feed data={feedData} />)}

      <Footer />
    </div>
  )
}