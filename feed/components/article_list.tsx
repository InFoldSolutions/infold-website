import { useState, useCallback, MouseEventHandler } from 'react'

import Spinner from '@/components/spinner'
import RelatedArticle from '@/components/article'

export default function ArticleList({ sources, initialCount = 4 }: { sources: any, initialCount?: number }) {
  const [expandArticles, setExpandArticles] = useState(false)
  const toggleMoreArticles: MouseEventHandler = useCallback(
    (e) => {
      setExpandArticles(true)
    },
    [setExpandArticles]
  )

  return (
    <div className='flex justify-stretch flex-col'>
      <ul className='list-inside list-disc min-h-[100px]'>
        {sources.length === 0 && <li className='w-full justify-center mt-24 pl-2 pt-2 flex items-center justify-center'><Spinner /> Loading articles</li>}
        {sources.slice(0, initialCount + 1).map((item: any, index: number) => {
          if (index === initialCount && sources.length > initialCount)
            return (
              <li className={`${expandArticles ? 'hidden' : ''} w-[98%] mx-auto rounded-md flex items-center justify-center cursor-pointer hover:underline`}
                onClick={toggleMoreArticles}
                key={index}>
                <span className='py-3'>more articles..</span>
              </li>
            )

          return <RelatedArticle item={item} key={index} last={index === initialCount - 1} />
        })}
      </ul>
      <ul className={`${!expandArticles ? 'hidden' : ''} list-inside list-disc -mx-2 border-t-2 border-gray-200 dark:border-gray-800 dark:border-opacity-80 border-dashed`}>
        {sources.slice(initialCount).map((item: any, index: number) => {
          return <RelatedArticle item={item} key={index} />
        })}
      </ul>
    </div>
  )
}

