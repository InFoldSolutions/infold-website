import { useState, useCallback, MouseEventHandler } from 'react'

import Spinner from '@/components/spinner'
import RelatedArticle from '@/components/article'

export default function ArticleList({ data }: { data: any }) {
  const [expandArticles, setExpandArticles] = useState(false)
  const toggleMoreArticles: MouseEventHandler = useCallback(
    (e) => {
      setExpandArticles(true)
    },
    [setExpandArticles]
  )

  const [sortedSources, setSortedSources] = useState(data.sources.sort((a: any, b: any) => {
    if (a.social && a.social.length > 0)
      return -1
    if (new Date(b.articles[0].added_at).getTime() - new Date(a.articles[0].added_at).getTime())
      return 0
    else
      return 1
  }) || [])

  return (
    <div className='flex mt-4 justify-stretch flex-col'>
      <ul className='list-inside list-disc min-h-[100px] border-t-2 border-gray-200 dark:border-gray-800 dark:border-opacity-80 border-dashed'>
        {!data || sortedSources.length === 0 && <li className='w-full justify-center mt-24 pl-2 pt-2 flex items-center justify-center'><Spinner /> Loading articles</li>}
        {data && sortedSources.slice(0, 10).map((item: any, index: number) => {
          if (index === 9 && sortedSources.length > 9)
            return (
              <li className={`${expandArticles ? 'hidden' : ''} w-[98%] mx-auto rounded-md flex items-center justify-center cursor-pointer hover:underline`}
                onClick={toggleMoreArticles}
                key={index}>
                <span className='py-3'>more articles..</span>
              </li>
            )

          return <RelatedArticle item={item} key={index} last={(index === 8)} />
        })}
      </ul>
      <ul className={`${!expandArticles ? 'hidden' : ''} list-inside list-disc -mx-2 border-t-2 border-gray-200 dark:border-gray-800 dark:border-opacity-80 border-dashed`}>
        {data && sortedSources.slice(9).map((item: any, index: number) => {
          return <RelatedArticle item={item} key={index} />
        })}
      </ul>
    </div>
  )
}

