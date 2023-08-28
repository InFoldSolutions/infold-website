'use client'

import { useState, useCallback, MouseEventHandler } from 'react'

import Timeline from '@/components/timeline'
import Column from '@/components/article_column'
import Outline from '@/components/outline'
import ChatBot from '@/components/chatbot'

export default function TopicWrapper({ data, modal = false }: { data: any, modal?: boolean }) {
  const [expandedOutline, setExpandedOutline] = useState(false)
  const [expandArticles, setExpandArticles] = useState(false)
  const [filteredData] = useState<any>(filterData(data.sources, data.social))

  const toggleExpanded: MouseEventHandler = useCallback(() => {
    setExpandedOutline((expanded) => !expanded)
  }, [])

  const toggleExpandedArticles: MouseEventHandler = useCallback(() => {
    setExpandArticles((expanded) => !expanded)
  }, [])

  return (
    <article>
      <h3 className={`${modal ? 'mr-4' : ''} mb-4 text-3xl font-bold`}>
        <span>{data.title}</span><br />
        <small className='text-sm'>Topic summarized from {data.sources.length} sources.</small>
      </h3>

      <Outline outlines={data.outline} toggleExpanded={toggleExpanded} expanded={expandedOutline} />

      <ChatBot />

      <h3 className='text-2xl font-bold text-left mt-6'>
        Social Feedback
      </h3>

      <Timeline data={filteredData} />

      <h3 className='text-2xl font-bold text-left mt-6'>
        News Coverage
      </h3>

      <div className='flex space-x-4 mt-4 justify-stretch flex-col md:flex-row'>
        {data.sentimentAgg['positive'] > 0 && 
          <Column data={filterData(data.sources, data.social, 'positive')} 
                  sentiment='positive' 
                  expanded={expandArticles} />}

        {data.sentimentAgg['neutral'] > 0 && 
          <Column data={filterData(data.sources, data.social, 'neutral')} 
                  sentiment='neutral' 
                  expanded={expandArticles} />}
                  
        {data.sentimentAgg['negative'] > 0 && 
          <Column data={filterData(data.sources, data.social, 'negative')} 
                  sentiment='negative' 
                  expanded={expandArticles} />}
      </div>

      <div className={`${expandArticles ? 'hidden' : ''} w-[98%] mx-auto rounded-md -mb-2 flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-60`}
        onClick={toggleExpandedArticles}>
        <span className='py-3'>more articles..</span>
      </div>
    </article>
  )
}

function filterData(sources: any, social: any, sentiment: string = '') {
  if (sentiment) {
    sources = sources.filter((source: any) => source.articles[0].sentiment === sentiment)
    social = social.filter((social: any) => social.sentiment === sentiment)
  }

  return {
    sources,
    social,
    combined: sources.concat(social).sort((a: any, b: any) => {
      const aTime = a.added_at || a.articles[0].added_at
      const bTime = b.added_at || b.articles[0].added_at

      return new Date(bTime).getTime() - new Date(aTime).getTime()
    })
  }
} // move this somewhere