'use client'

import { useEffect, useMemo, useState } from 'react';

import Keyword from '@/components/story/sidebar/keyword';

import { getTopKeywords } from '@/apis/infold';

export default function Keywords({ keywordData, defaultSize = 4 }: { keywordData?: any, defaultSize?: number }) {

  const [isLoading, setIsLoading] = useState(true);
  const [keywords, setKeywords] = useState<any>(null)
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(defaultSize);

  const moreKeywords = useMemo(() => keywords && keywords.length > pageSize * currentPage, [keywords, currentPage, pageSize]);

  useEffect(() => {
    if (keywordData) {
      setKeywords(keywordData)
      return
    }

    const fetchKeywords = async () => {
      const keywordDataRes = await getTopKeywords()

      if (keywordDataRes?.length > 0)
        setKeywords(keywordDataRes)

      setIsLoading(true)
    }

    fetchKeywords()
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, []);

  useEffect(() => {
    if (keywords)
      setIsLoading(false)
  }, [keywords])

  useEffect(() => {
    if (currentPage > 1 && moreKeywords)
      setShowMore(true);
    else
      setShowMore(false);
  }, [keywords, currentPage, pageSize, moreKeywords]);


  if (isLoading)
    return (<div className='w-auto text-small text-center py-6 mt-1 mb-3'>Loading ..</div>);
  else if (!keywords && !isLoading)
    return (<div className='w-auto text-small text-center py-6 mt-1 mb-3'>No data ..</div>);

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