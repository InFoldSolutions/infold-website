'use client'

import { useEffect, useState, useCallback, MouseEventHandler } from 'react'

import { usePathname } from 'next/navigation'

import ReconnectingWebSocket from 'reconnecting-websocket'

import config from '@/config';

import Timeline from '@/components/timeline'
import Column from '@/components/article_column'
import Outline from '@/components/outline'
import ChatBot from '@/components/chatbot'

export default function TopicWrapper({ data, modal = false }: { data: any, modal?: boolean }) {
  const [expandedOutline, setExpandedOutline] = useState(false)
  const [expandArticles, setExpandArticles] = useState(false)
  const [chatMessages, setChatMessages] = useState<any>([])
  const [filteredData] = useState<any>(filterData(data.sources, data.social))

  const pathname = usePathname()
  const topicName = pathname.split('/').pop()

  let webSocket: any = null;

  useEffect((): any => {
    const socketURL = `${config.ws.chat}/${config.ws.path}/${topicName}`;

    webSocket = new ReconnectingWebSocket(socketURL);
    webSocket.onmessage = (event: any) => {
      setChatMessages((messages: any) => {
        messages[messages.length - 1].message = event.data
        return [...messages]
      })
    };
  }, [])

  const toggleExpanded: MouseEventHandler = useCallback(() => {
    setExpandedOutline((expanded) => !expanded)
  }, [])

  const toggleExpandedArticles: MouseEventHandler = useCallback(() => {
    setExpandArticles((expanded) => !expanded)
  }, [])

  const onSubmit: MouseEventHandler = useCallback((e) => {
    if (!webSocket) return;

    setChatMessages((messages: any) => [...messages, {
      user: 'me',
      message: e
    }, {
      user: 'bot',
      message: ''
    }])

    webSocket.send(e);
  }, [])

  return (
    <article>
      <h3 className={`${modal ? 'mr-4' : ''} mb-4 text-3xl font-bold`}>
        <span>{data.title}</span><br />
        <small className='text-sm'>Topic summarized from {data.sources.length} sources.</small>
      </h3>

      <Outline outlines={data.outline} toggleExpanded={toggleExpanded} expanded={expandedOutline} />

      <ChatBot onSubmit={onSubmit} chatMessages={chatMessages} />

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