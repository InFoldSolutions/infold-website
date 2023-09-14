'use client'

import { useEffect, useMemo, useState } from 'react';

import Keyword from '@/components/keyword';

export default function Keywords({ keywords }: { keywords: any }) {

  let [showMore, setShowMore] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [pageSize] = useState(6);

  const moreKeywords = useMemo(() => keywords && keywords.length > pageSize * currentPage, [keywords, currentPage, pageSize]);

  useEffect(() => {
    if (currentPage > 1 && moreKeywords)
      setShowMore(true);
    else
      setShowMore(false);
  }, [keywords, currentPage, pageSize, moreKeywords]);

  return (
    <ul>
      {currentPage === 1 && (keywords && keywords.length > 0) && keywords.slice(0, pageSize).map((keyword: any, index: number) => (
        <Keyword keyword={keyword} key={index} />
      ))}
      {currentPage > 1 &&
        keywords.slice(pageSize * (currentPage - 1), pageSize * currentPage).map((keyword: any, index: number) => (
          <Keyword keyword={keyword} key={index} />
        ))
      }
      <div className='flex'>
        {!showMore && moreKeywords &&
          <span className='cursor-pointer text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center' onClick={() => { setShowMore(true); setCurrentPage(current => current + 1) }}>
            Show more <i className='fad fa-long-arrow-alt-right ml-2 mt-px' />
          </span>
        }
        {currentPage > 1 &&
          <span className='cursor-pointer text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center' onClick={() => setCurrentPage(current => current - 1)}>
            <i className='fad fa-long-arrow-alt-left mr-2 mt-px' /> {'Back'}
          </span>
        }
        {currentPage > 1 && moreKeywords &&
          <span className='cursor-pointer text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center ml-1.5 pl-1.5 border-gray-300 border-l-2 border-dashed dark:border-gray-800 dark:border-opacity-80' onClick={() => setCurrentPage(current => current + 1)}>
            {'MoreN'} <i className='fad fa-long-arrow-alt-right ml-2 mt-px' />
          </span>
        }
      </div>
    </ul>
  )
}