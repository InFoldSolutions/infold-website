
'use client'

import config from '@/config'

import Link from 'next/link'

import { Item } from '@/helpers/api'

import AnalyzedIcon from '@/components/icon'

export default function Feed({ data, onKeywordClick }: { data: any, onKeywordClick: any }) {
  return (
    <ul>
      {data.topics.map((item: Item) => (
        <li className='mb-8' key={item.slug}>
          <h3 className='mb-4 text-3xl font-bold leading-snug text-left'>
            {item.title}<br />
            <small className='text-sm'>Summarized from {item.articles} articles.</small>
          </h3>
          <div className='text-left'>
            <ul className='list-inside list-disc'>
              {item.outline.slice(0, 2).map((outline: string, index: number) => (
                <li className='mb-4' key={index}>
                  {outline}
                  {index === 1 && <Link href={`/topics/${item.slug}`} className="text-blue-500 underline ml-2">more..</Link>}
                </li>
              ))}
            </ul>
          </div>
          <div className='relative mt-6'>
            <ul className='max-w-screen-2xl flex flex-nowrap gap-x-2 overflow-x-scroll no-scrollbar' onClick={onKeywordClick}>
              {item.keywords.filter(filterKeywords).map((keyword: any, k: number) => (
                <li className='group w-auto flex items-center items-stretch whitespace-nowrap' key={k}>
                  <AnalyzedIcon analyzed={keyword.analyzed} keyword={keyword.keyword} />
                  <span className='bg-neutral-100 hover:bg-neutral-200 py-1 px-2 cursor-pointer text-base dark:text-white dark:bg-neutral-950 dark:hover:bg-neutral-800' title="Apply filter for keyword">
                    {keyword.keyword}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  )
}

// We filter some obvious false positives
function filterKeywords(data: any) {
  if (data.keyword.length < 3)
    return false;

  if (config.keywordsBlacklist.includes(data.keyword.toLowerCase()))
    return false;

  if (data.type === "person") { // check for type person to have at least two full words
    const words = data.keyword.split(" ");

    if (words.length < 2)
      return false;
  }

  return true;
}