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

  return (
    <div>
      <ul className='list-inside list-disc -m-2 -mx-4 min-h-[100px]'>
        {!data || data.sources.length === 0 && <li className='w-full justify-center mt-24 pl-2 pt-2 flex items-center justify-center'><Spinner /> Loading articles</li>}
        {data && data.sources.slice(0, 8).map((item: any, index: number) => {
          if (index === 7 && data.sources.length > 7)
            return (
              <li className={`${expandArticles ? 'hidden' : ''} w-[98%] mx-auto rounded-md -mb-2 flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-60`}
                onClick={toggleMoreArticles}
                key={index}>
                <span className='py-3'>more articles..</span>
              </li>
            )

          return <RelatedArticle item={item} key={index} />
        })}
      </ul>
      <ul className={`${!expandArticles ? 'hidden' : ''} list-inside list-disc -m-2 -mx-4`}>
        {data && data.sources.slice(7).map((item: any, index: number) => {
          return <RelatedArticle item={item} key={index} />
        })}
      </ul>
    </div>
  )
}

