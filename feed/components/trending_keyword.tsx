'use client'

import { useEffect, useCallback, useState } from 'react';

import Link from 'next/link'

import Keyword from '@/components/keyword';

import { getInterests, addInterest, removeInterest } from '@/helpers/localstorage';

export default function TrendingKeyword({ keyword }: { keyword: any }) {
  const [interests, setInterests] = useState<string[]>([])

  const toggleInterest = useCallback((interest: string) => {
    if (interests.includes(interest)) {
      removeInterest(interest)
      setInterests((current: string[]) => current.filter((item) => item !== interest))
    } else {
      addInterest(interest)
      setInterests((current: string[]) => [...current, interest])
    }
  }, [interests, setInterests])

  useEffect(() => {
    setInterests(getInterests())
  }, [])

  return (
    <li className='pb-2 mb-3 last:pb-0 last:mb-0 flex items-center group/item border-b-2 border-transparent border-dashed hover:border-gray-100 dark:hover:border-gray-800 dark:hover:border-opacity-80'>
      <div className='mr-2'>
        <Keyword keyword={keyword.keyword} analyzed={keyword.analyzed} iconOnly={true} />
      </div>

      <Link href={`/?keywords=${keyword.keyword}`} prefetch={false} className='group/link' target='_blank'>
        <span>
          <span className='font-bold block leading-4 group-hover/link:underline'>{keyword.keyword}</span>
          <span className='flex text-xs'>
            {keyword.topics || 4} Topics
          </span>
        </span>
      </Link>

      <div className='ml-auto cursor-pointer transition opacity-30 group-hover/item:opacity-100 flex items-center group/follow'
        title={`${interests.includes(keyword.keyword) ? 'Unfollow keyword' : 'Follow keyword'}`} onClick={() => toggleInterest(keyword.keyword)}>
        <span className={`opacity-50 border-2 border-transparent group-hover/follow:opacity-100 group-hover/follow:border-blue-500 group-hover/follow:text-blue-500 rounded-md ${interests.includes(keyword.keyword) ? 'opacity-100 text-blue-500' : ''}`}>
          <i className={`fad ${interests.includes(keyword.keyword) ? 'fa-layer-group group-hover/follow:fa-layer-minus' : 'fa-layer-plus'}  p-1`} />
        </span>
      </div>
    </li>
  )
}