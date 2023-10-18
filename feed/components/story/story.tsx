'use client'

import { Suspense, useContext, useState } from 'react'

import TimeAgo from 'react-timeago'

import ArticleList from '@/components/article/article_list'
import Outline from '@/components/story/outline'
import ChatBot from '@/components/story/chatbot'
import YTMedia from '@/components/carousel/ytmedia'
import Affiliate from '@/components/carousel/affiliate'

import { isBrowser } from '@/helpers/utils'
import { refreshTopicMeta } from '@/helpers/api'

import { filterData } from '@/transformers/story'

import { AuthContext } from '@/context/auth'

export default function StoryWrapper({ data, affiliate, modal = false }: { data: any, affiliate: any, modal?: boolean }) {

  const [latestArticles] = useState<any>(filterData(data.sources, 'latest'))
  const [popularArticles] = useState<any>(filterData(data.sources, 'popular'))
  const [initialCount] = useState(popularArticles.sources.length > 0 ? popularArticles.sources.length : 5)
  const [isDesktop] = useState((isBrowser) ? window.innerWidth > 820 : false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { user } = useContext(AuthContext)

  const refreshTopic = async () => {
    setIsRefreshing(true)
    await refreshTopicMeta(data.slug)
    setIsRefreshing(false)
  }

  return (
    <article className='pb-2'>
      <h1 className={`${modal ? 'mr-4' : ''} mb-2 text-3xl font-bold group`}>
        {data.title}
      </h1>

      <div className='flex items-center mb-4 text-sm font-bold'>
        <span className='ml-1'>
          {`Summarized from ${data.meta.sources} sources.`}

          {user &&
            <span className='hidden group-hover:inline-flex cursor-pointer'>
              <i className={`fad fa-sync ml-2 ${isRefreshing ? 'animate-spin' : ''}`} onClick={() => refreshTopic()} />
            </span>
          }
        </span>
        <span className='ml-auto flex-row flex items-center'>
          <span className='items-center md:mr-3'>
            <i className='fad fa-clock mr-2'></i>
            <Suspense fallback={null}>
              <TimeAgo
                date={new Date(data.updated_at).getTime()}
              />
            </Suspense>
          </span>
          <span className="hidden md:inline-block items-center mr-3">
            <i className='fad fa-newspaper mr-2'></i>
            {data.meta.articles}
            <span className='ml-2'>Articles</span>
          </span>
          {data.meta.social > 0 &&
            <span className="hidden md:inline-block items-center">
              <i className='fad fa-comments mr-2'></i>
              {data.meta.social}
              <span className='ml-2'>Comments</span>
            </span>
          }
        </span>
      </div>

      <Outline outlines={data.outline} />

      <ChatBot suggested={data.suggested} />

      {data.media?.length > 0 &&
        <YTMedia data={data.media} />
      }
      
      {affiliate?.length > 0 &&
        <Affiliate data={affiliate} />
      }

      <h3 className='mt-4 text-2xl font-bold'>News Coverage</h3>

      {popularArticles.sources.length > 0 && latestArticles.sources.length > 0 &&
        <div className='lg:flex'>
          <div className='lg:basis-1/2 lg:mr-4 shrink-1 lg:max-w-[50%]'>
            <div className={`p-2 px-3 mt-4 items-center justify-center bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 rounded hidden lg:flex`}>
              <i className='fad fa-comments mr-2' /> Popular

              <span className='ml-auto flex items-center'>
                <i className={`fad fa-chart-bar mr-2`} />
                {popularArticles.sources.length}
              </span>
            </div>

            <ArticleList sources={popularArticles.sources} initialCount={(isDesktop) ? initialCount : popularArticles.sources.length} popular={true} />
          </div>

          <div className='lg:basis-1/2 lg:ml-4 shrink-1 lg:max-w-[50%]'>
            <div className={`p-2 px-3 mt-4 items-center justify-center bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 rounded hidden lg:flex`}>
              <i className='fad fa-history mr-2' />Latest

              <span className='ml-auto flex items-center'>
                <i className={`fad fa-chart-bar mr-2`} />
                {latestArticles.sources.length}
              </span>
            </div>

            <ArticleList sources={latestArticles.sources} initialCount={initialCount * 2} />
          </div>
        </div>
      }

      {popularArticles.sources.length === 0 && latestArticles.sources.length > 0 &&
        <div>
          <ArticleList sources={latestArticles.sources} initialCount={initialCount * 2} />
        </div>
      }

      {popularArticles.sources.length === 0 && latestArticles.sources.length === 0 &&
        <div className='mt-4'>
          <p className='text-center'>No news coverage found.</p>
        </div>
      }

    </article>
  )
}