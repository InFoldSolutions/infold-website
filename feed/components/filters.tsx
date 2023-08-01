'use client';

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Filters() {
  const router = useRouter()
  const searchParams: any = useSearchParams()
  
  const keywords = searchParams.get('keywords') || '';
  const endpoint = searchParams.get('sort') || 'rising';
  const bucket = searchParams.get('time') || null;

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
      <div>
        <Link className={`${(endpoint === 'rising') ? 'underline' : ''} cursor-pointer filter hover:underline`} href={`?sort=rising`}>Latest</Link> |
        <Link className={`${(endpoint === 'top' && bucket === 'day') ? 'underline' : ''} ml-3 cursor-pointer filter hover:underline`} href={`?sort=top&time=day`}>Top 24h</Link> |
        <Link className={`${(endpoint === 'top' && bucket === 'week') ? 'underline' : ''} ml-3 cursor-pointer filter hover:underline`} href={`?sort=top&time=week`}>Top 7d</Link> |
        <Link className={`${(endpoint === 'top' && bucket === 'month') ? 'underline' : ''} ml-3 cursor-pointer filter hover:underline`} href={`?sort=top&time=month`}>Top 30d</Link> |
        <Link className={`${(endpoint === 'top' && bucket === 'year') ? 'underline' : ''} ml-3 cursor-pointer filter hover:underline`} href={`?sort=top&time=year`}>Top 365d</Link>
      </div>
    )
  }
}