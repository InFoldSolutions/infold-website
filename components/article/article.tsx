import { MouseEventHandler, Suspense, useCallback, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import TimeAgo from 'react-timeago'

import SocialComments from '@/components/article/comments';

interface IRelatedArticle {
  item: any,
  last?: boolean,
  popular?: boolean,
  children?: string,
  sourcesCount?: number
}

export default function RelatedArticle({ item, last, popular, sourcesCount }: IRelatedArticle) {
  const firstArticle: any = item.articles[0]
  const articleList = (popular) ? item.articles.filter((article: any) => article.social?.length > 0) : item.articles

  const [initialCount, setInitialCount] = useState((popular) ? articleList.length : 2)
  const [expandArticles, setExpandArticles] = useState(false)
  const toggleMoreArticles: MouseEventHandler = useCallback(
    (e) => {
      setExpandArticles(true)
    },
    [setExpandArticles]
  )

  useEffect(() => {
    if (expandArticles)
      setInitialCount(articleList.length)
  }, [expandArticles])

  return (
    <li className={`${last ? 'border-b-0' : 'border-b-2'} py-4 list-none rounded-md border-gray-200 dark:border-gray-800 dark:border-opacity-80 border-dashed last:border-b-0 last:mb-0 group`}
      title={item.title}>
      <div className="flex items-center">
        <span>
          <Image unoptimized src={item.source.logo} alt={item.source.name} width={80} height={80} className='w-8 h-8 max-w-none mr-2' />
        </span>
        <span className='font-bold mr-1'>{item.source.name}</span>
        <span className="text-gray-600 dark:text-gray-300 text-xs ml-auto">
          <span className='mr-2'>Latest</span>
          <Suspense fallback={null}>
            <TimeAgo
              date={new Date(firstArticle.added_at).getTime()}
              title={firstArticle.title}
            />
          </Suspense>
          <i className='fad fa-clock ml-2' />
        </span>
      </div>

      <ul className='flex w-auto flex-col'>
        {articleList.slice(0, initialCount + 1).map((article: any, index: number) => {
          if (index === initialCount && articleList.length > initialCount) {
            return (
              <li className={`${expandArticles ? 'hidden' : ''} w-[98%] mx-auto rounded-md flex items-center justify-center cursor-pointer hover:underline mt-5`}
                onClick={toggleMoreArticles}
                key={index}>
                <span className='py-1'>more articles..</span>
              </li>
            )
          } else {
            return (
              <li key={index} className='mt-3 group/article' >
                <Link className='text-xl font-bold flex-inline items-center hover:underline cursor-pointer truncate-3-lines' href={firstArticle.url} target='_blank' title={article.title}>
                  {article.title}
                </Link>

                {popular &&
                  <SocialComments data={article} expanded={(popular && sourcesCount === 1)} />
                }
              </li>
            )
          }
        })}
      </ul>
    </li>
  )
}