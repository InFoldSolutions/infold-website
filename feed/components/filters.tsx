'use client';

import { useSearchParams } from 'next/navigation'

export default function Filters({ onClick, removeKeywordFilter }: { onClick: any, removeKeywordFilter: any }) {
  const searchParams: any = useSearchParams()
  const keywords = searchParams.get('keywords') || '';

  if (keywords) {
    return (
      <div>
        <span className='mr-2'>Keywords:</span>
        {keywords.split(',').map((keyword: string, index: number) => (
          <span
            className='keyword bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 py-1 px-2 cursor-pointer dark:text-white dark:bg-neutral-950 dark:hover:bg-neutral-800 mr-2'
            title="Remove filter for keyword"
            onClick={removeKeywordFilter}
            key={index}>
            <span className='mr-2 text-xl'>&times;</span>
            {keyword}
          </span>
        ))}
      </div>
    )
  } else {
    return (
      <div onClick={onClick}>
        <span className='underline cursor-pointer filter hover:underline' data-endpoint='rising'>Latest</span> |
        <span className='ml-3 cursor-pointer filter hover:underline' data-endpoint='top' data-bucket='day'>Top 24h</span> |
        <span className='ml-3 cursor-pointer filter hover:underline' data-endpoint='top' data-bucket='week'>Top 7d</span> |
        <span className='ml-3 cursor-pointer filter hover:underline' data-endpoint='top' data-bucket='month'>Top 30d</span> |
        <span className='ml-3 cursor-pointer filter hover:underline' data-endpoint='top' data-bucket='year'>Top 365d</span>
      </div>
    )
  }
}