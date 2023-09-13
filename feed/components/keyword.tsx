'use client'

import { useEffect, useCallback, useState } from 'react';

import Link from 'next/link'
import Image from 'next/image'

import { getInterests, addInterest, removeInterest } from '@/helpers/localstorage';
import Tooltip from '@/components/tooltip';

export default function Keyword({ keyword }: { keyword: any }) {
  const latestAnalyzed = (keyword.analyzed) ? keyword.analyzed[0] : null;

  let icon, label, url;

  if (latestAnalyzed && latestAnalyzed.url) {
    url = latestAnalyzed.url;

    if (latestAnalyzed.source === "investopedia") {
      icon = "https://www.investopedia.com/thmb/XIM2KrGGvPZgAQJMsOG3hU7_fI0=/857x482/smart/filters:no_upscale()/investopedia_icon-4f30abcdb0cd455b9c740b7d09a07a47.png";
      label = "Investopedia";
    } else {
      icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Wikipedia%27s_W.svg/1024px-Wikipedia%27s_W.svg.png";
      label = "Wikipedia";
    }
  } else {
    url = `https://www.google.com/search?q=${keyword}`;
    icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png";
    label = "Google";
  }

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
        <Link
          href={url}
          title={`Lookup on ${label}`}
          target='_blank'
          prefetch={false}
          className='group/image'>
          <span className='group-hover/image:border-gray-400 border-2 bg-gray-100 dark:border-gray-600 dark:bg-gray-200 opacity:60 group-hover/image:dark:border-gray-200 p-1 flex items-center justify-center w-8 rounded-md'>
            <Image src={icon} alt={label} width={22} height={22} className={`${label === 'Google' ? 'w-5' : ''} h-auto`} />
          </span>
        </Link>
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
        onClick={() => toggleInterest(keyword.keyword)}>
        <Tooltip message={`${interests.includes(keyword.keyword) ? 'Unfollow' : 'Follow'}`} bottom={1} left={10} padding={1}>
          <span className={`opacity-50 border-2 border-transparent group-hover/follow:opacity-100 group-hover/follow:border-blue-500 group-hover/follow:text-blue-500 rounded-md ${interests.includes(keyword.keyword) ? 'opacity-100 text-blue-500' : ''}`}>
            <i className={`fad ${interests.includes(keyword.keyword) ? 'fa-layer-group' : 'fa-layer-plus'}  p-1`} />
          </span>
        </Tooltip>
      </div>
    </li>
  )
}