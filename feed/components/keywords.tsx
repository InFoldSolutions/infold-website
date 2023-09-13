'use client'

import { useState } from 'react';

import Keyword from '@/components/keyword';

export default function Keywords({ keywords }: { keywords: any }) {

  let [showMore, setShowMore] = useState(false);

  return (
    <ul>
      {!showMore && (keywords && keywords.length > 0) && keywords.slice(0, 6).map((keyword: any, index: number) => (
        <Keyword keyword={keyword} key={index} />
      ))}
      {!showMore &&
        <span className='cursor-pointer text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center' onClick={() => setShowMore(true)}>
          Show more <i className='fad fa-long-arrow-alt-right ml-2 mt-px' />
        </span>
      }
      {showMore && (keywords && keywords.length > 6) &&
        keywords.slice(6).map((keyword: any, index: number) => (
          <Keyword keyword={keyword} key={index} />
        ))
      }
      {showMore &&
        <span className='cursor-pointer text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center' onClick={() => setShowMore(false)}>
          <i className='fad fa-long-arrow-alt-left mr-2 mt-px' /> {'Back'}
        </span>
      }
    </ul>
  )
}