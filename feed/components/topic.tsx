'use client'

import { useState } from 'react'

import ArticleList from '@/components/article_list'
import Outline from '@/components/outline'
import ChatBot from '@/components/chatbot'
import YTMedia from './ytmedia'

export default function TopicWrapper({ data, modal = false }: { data: any, modal?: boolean }) {
  const isBrowser = typeof window !== "undefined";

  const [latestArticles] = useState<any>(filterData(data.sources, data.social, 'latest'))
  const [popularArticles] = useState<any>(filterData(data.sources, data.social, 'popular'))
  const [initialCount] = useState(popularArticles.sources.length > 0 ? popularArticles.sources.length : 5)
  const [isDesktop, setIsDesktop] = useState((isBrowser) ? window.innerWidth > 820 : false)

  return (
    <article className='pb-2'>
      <h3 className={`${modal ? 'mr-4' : ''} mb-4 text-3xl font-bold`}>
        <span>{data.title}</span><br />
        <small className='text-sm'>Topic summarized from {data.sources.length} sources.</small>
      </h3>

      <Outline outlines={data.outline} />

      <ChatBot />

      {data.media && data.media.length > 0 &&
        <YTMedia data={data.media} />
      }

      <h3 className='mt-4 text-2xl font-bold'>News Coverage</h3>

      {popularArticles.sources.length > 0 && latestArticles.sources.length > 0 &&
        <div className='lg:flex'>
          <div className='lg:basis-1/2 lg:mr-4'>
            <div className={`p-2 px-3 mt-4 items-center justify-center bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 rounded hidden lg:flex`}>
              <i className='fad fa-comments mr-2' /> Popular

              <span className='ml-auto flex items-center'>
                <i className={`fad fa-chart-bar mr-2`} />
                {popularArticles.sources.length}
              </span>
            </div>

            <ArticleList sources={popularArticles.sources} initialCount={(isDesktop) ? initialCount : popularArticles.sources.length} />
          </div>

          <div className='lg:basis-1/2 lg:ml-4'>
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

    </article>
  )
}

function filterData(sources: any, social: any, sort: string = '') {
  switch (sort) {
    case 'latest':
      sources = sources.filter((source: any) => !source.social || source.social.length === 0)
      sources.sort((a: any, b: any) => new Date(b.articles[0].added_at).getTime() - new Date(a.articles[0].added_at).getTime())
      break;
    case 'popular':
      sources = sources.filter((source: any) => source.social?.length > 0)
      sources.sort((a: any, b: any) => b.social.length - a.social.length)
      break;
    default:
      break;
  }

  return {
    sources,
    social: social.sort((a: any, b: any) => {
      return b.score - a.score
    }),
    combined: sources.concat(social).sort((a: any, b: any) => {
      const aTime = a.added_at || a.articles[0].added_at
      const bTime = b.added_at || b.articles[0].added_at

      return new Date(bTime).getTime() - new Date(aTime).getTime()
    })
  }
} // move this somewhere