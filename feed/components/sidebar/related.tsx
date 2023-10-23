'use client'

import { useEffect, useMemo, useState } from 'react';

import RelatedItem from '@/components/sidebar/related_item';

export default function Related({ related }: { related: any }) {

  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);

  const moreKeywords = useMemo(() => related && related.length > pageSize * currentPage, [related, currentPage, pageSize]);

  useEffect(() => {
    if (currentPage > 1 && moreKeywords)
      setShowMore(true);
    else
      setShowMore(false);
  }, [related, currentPage, pageSize, moreKeywords]);

  return (
    <ul className='flex flex-col'>
      {currentPage === 1 && (related && related.length > 0) && related.slice(0, pageSize).map((story: any, index: number) => (
        <RelatedItem story={story} key={index} />
      ))}
      {currentPage > 1 &&
        related.slice(pageSize * (currentPage - 1), pageSize * currentPage).map((story: any, index: number) => (
          <RelatedItem story={story} key={index} />
        ))
      }

      <div className='flex'>
        {!showMore && moreKeywords &&
          <span className='select-none group/nav cursor-pointer text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center'
            onClick={() => { setShowMore(true); setCurrentPage(current => current + 1) }}>
            <span className='group-hover/nav:underline'>Show more</span>
            <i className='fad fa-long-arrow-alt-right ml-2 mt-px' />
          </span>
        }
        {currentPage > 1 &&
          <span className='select-none group/nav cursor-pointer text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center'
            onClick={() => setCurrentPage(current => current - 1)}>
            <i className='fad fa-long-arrow-alt-left mr-2 mt-px' />
            <span className='group-hover/nav:underline'>Back</span>
          </span>
        }
        {currentPage > 1 && moreKeywords &&
          <span className='select-none group/nav cursor-pointer text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center ml-2 pl-2 border-gray-100 border-l-2 border-dashed dark:border-gray-800 dark:border-opacity-80'
            onClick={() => setCurrentPage(current => current + 1)}>
            <span className='group-hover/nav:underline'>More</span>
            <i className='fad fa-long-arrow-alt-right ml-2 mt-px' />
          </span>
        }
      </div>
    </ul>
  )
}