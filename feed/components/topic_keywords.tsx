'use client'

import { useState } from 'react';

import TrendingKeyword from '@/components/trending_keyword';

export default function TopicKeywords({ data }: { data: any }) {

  let [showMore, setShowMore] = useState(false);

  return (
    <ul>
      {!showMore && (data.keywords && data.keywords.length > 0) && data.keywords.slice(0, 6).map((keyword: any, index: number) => (
        <TrendingKeyword keyword={keyword} key={index} />
      ))}
      {!showMore &&
        <span className='cursor-pointer text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center' onClick={() => setShowMore(true)}>
          Show more <i className='fad fa-long-arrow-alt-right ml-2' />
        </span>
      }
      {showMore && (data.keywords && data.keywords.length > 6) &&
        data.keywords.slice(6, 12).map((keyword: any, index: number) => (
          <TrendingKeyword keyword={keyword} key={index} />
        ))
      }
      {showMore &&
        <span className='cursor-pointer text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center' onClick={() => setShowMore(false)}>
          <i className='fad fa-long-arrow-alt-left mr-2' /> {'Back'}
        </span>
      }
    </ul>
  )
}