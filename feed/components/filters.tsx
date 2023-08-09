'use client';

import config from '@/config';
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

const topOptions = [
  { label: 'Top 1h', value: 'hour' },
  { label: 'Top 24h', value: 'day' },
  { label: 'Top 7d', value: 'week' },
  { label: 'Top 30d', value: 'month' },
  { label: 'Top 365d', value: 'year' },
]

export default function Filters() {
  const router = useRouter()
  const searchParams: any = useSearchParams()

  const keywords = searchParams.get('keywords') || '';
  const endpoint = searchParams.get('sort') || config.api.defaultSort;
  const bucket = searchParams.get('time') || config.api.defaultBucket;

  function removeKeywordFilter(e: any) {
    e.preventDefault();

    let target = e.target;

    if (!target.classList.contains('keyword'))
      target = e.target.parentNode;

    const keywordText = target.innerText.replace('×', '').trim()
    const keywords = searchParams.get('keywords') || ''
    const keywordsArray = keywords.split(',')
    const queryString = keywordsArray.filter((keyword: string) => keyword !== keywordText).join(',')

    if (queryString)
      router.push(`/?keywords=${queryString}`)
    else
      router.push('/')
  }

  if (keywords) {
    return (
      <div>
        <span className='mr-2'>Keywords:</span>
        {keywords.split(',').map((keyword: string, index: number) => (
          <span
            className='keyword bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 py-1 px-2 cursor-pointer dark:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700 mr-2'
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
      <div className='relative max-w-screen-2xl overflow-x-scroll no-scrollbar'>
        <div className='flex flex-nowrap'>
          {topOptions.map((option: any, index: number) => (
            <span className='group min-w-[82px] md:min-w-[95px] mr-1 md:mr-2 cursor-pointer flex justify-center' key={index}>
              <Link className={`${(endpoint === 'top' && bucket === option.value) ? 'underline' : ''} group-hover:underline`} href={`?sort=top&time=${option.value}`}>{option.label}</Link>
              {(index + 1) < topOptions.length && <span className='ml-2'>|</span>}
            </span>
          ))}
        </div>
      </div>
    )
  }
}