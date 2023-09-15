'use client'

import { useEffect, useState, useCallback, MouseEventHandler } from 'react'

import { usePathname } from 'next/navigation'

import ReconnectingWebSocket from 'reconnecting-websocket'

import config from '@/config';

import ArticleList from '@/components/article_list'
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

    if (webSocket)
      webSocket.close();

    webSocket = new ReconnectingWebSocket(socketURL);
    webSocket.onmessage = (event: any) => {
      setChatMessages((messages: any) => {
        messages[messages.length - 1].message = event.data
        return [...messages]
      })
    };

    return () => {
      webSocket.close();
    }
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
  }, [webSocket])

  return (
    <article className='pb-2'>
      <h3 className={`${modal ? 'mr-4' : ''} mb-4 text-3xl font-bold`}>
        <span>{data.title}</span><br />
        <small className='text-sm'>Topic summarized from {data.sources.length} sources.</small>
      </h3>

      <Outline outlines={data.outline} toggleExpanded={toggleExpanded} expanded={expandedOutline} />

      <ChatBot onSubmit={onSubmit} chatMessages={chatMessages} />

      <ArticleList data={filteredData} />
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