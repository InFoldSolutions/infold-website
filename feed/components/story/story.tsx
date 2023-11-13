'use client'

import { useState } from 'react'

import ArticleList from '@/components/article/article_list'
import Outline from '@/components/story/outline'
import ChatBot from '@/components/story/chatbot'
import YTMedia from '@/components/carousel/ytmedia'
import Affiliate from '@/components/carousel/affiliate'

import { isBrowser } from '@/helpers/utils'

import { filterData } from '@/transformers/story'

import StoryMeta from './meta'
import Category from './category'

export default function StoryWrapper({ data, modal = false }: { data: any, modal?: boolean }) {

  const [latestArticles] = useState<any>(filterData(data.sources, 'latest'))
  const [popularArticles] = useState<any>(filterData(data.sources, 'popular'))
  const [initialCount] = useState(popularArticles.sources.length > 0 ? popularArticles.sources.length : 5)
  const [isDesktop] = useState((isBrowser) ? window.innerWidth > 820 : false)

  return (
    <article className='pb-2'>
      {data.category &&
        <Category data={data} />
      }
      
      <h1 className={`${modal ? 'mr-4' : ''} mb-2 text-3xl font-bold group`}>
        {data.title}
      </h1>

      <StoryMeta data={data} time={true} />

      <Outline outlines={data.outline} />

      <ChatBot suggested={data.suggested} />

      {data.media?.length > 0 &&
        <YTMedia data={data.media} />
      }

      <Affiliate slug={data.slug} />

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