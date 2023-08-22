'use client'

import { useState, useEffect, useCallback, MouseEventHandler } from 'react'

import Timeline from '@/components/timeline'
import Column from '@/components/article_column'
/*import SentimentFilter from '@/components/sentiment_filter'
import ArticleList from '@/components/article_list'*/

import Outline from '@/components/outline'

import { findParentByDataset } from '@/helpers/utils'


export default function TopicWrapper({ data, modal = false }: { data: any, modal?: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const [sentiment, setSentiment] = useState<any>('')
  const [filteredData, setFilteredData] = useState<any>(filterData(data.sources, data.social, sentiment))

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        const newColorScheme = event.matches ? 'dark' : 'light';
        const prevBgColor = newColorScheme === 'dark' ? 'bg-gray-200' : 'bg-gray-800'
        const bgColor = newColorScheme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'

        const elements = document.querySelectorAll(`li.${prevBgColor}`)

        elements.forEach((element: any) => {
          element.classList.remove(prevBgColor)
          element.classList.add(bgColor)
        })
      });
  }, [])

  useEffect(() => {
    setFilteredData(() => filterData(data.sources, data.social, sentiment))
  }, [sentiment])

  const toggleExpanded: MouseEventHandler = useCallback(() => {
    setExpanded((expanded) => !expanded)
  }, [])

  const sentimentClick: MouseEventHandler = useCallback((e) => {
    // @ts-ignore
    const element = e.target as HTMLElement
    const currentColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const bgColor = currentColorScheme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'

    if (!element) return console.warn('TopicWrapper: sentimentClick: element not found')
    const parent = findParentByDataset(element, 'sentiment')

    if (!parent) return console.warn('TopicWrapper: sentimentClick: parent not found')

    if (parent.classList.contains(bgColor)) {
      parent.classList.remove(bgColor)
      return setSentiment('')
    }

    const wrapper = parent.parentElement

    if (!wrapper) return console.warn('TopicWrapper: sentimentClick: wrapper not found')

    const items = wrapper?.querySelectorAll('li') || []

    items.forEach((item: any) => {
      item.classList.remove(bgColor)
    })

    parent.classList.add(bgColor)

    const sentiment = parent.dataset.sentiment

    if (!sentiment) return console.warn('TopicWrapper: sentimentClick: sentiment not found')

    setSentiment(sentiment)
  }, [])

  return (
    <article>
      <h3 className={`${modal ? 'mr-4' : ''} mb-4 text-3xl font-bold`}>
        <span>{data.title}</span><br />
        <small className='text-sm'>Topic summarized from {data.sources.length} sources.</small>
      </h3>

      <Outline outlines={data.outline} toggleExpanded={toggleExpanded} expanded={expanded} />

      <h3 className='text-2xl font-bold text-left mt-6'>Social Feedback</h3>
      <Timeline data={filteredData} />

      <h3 className='text-2xl font-bold text-left mt-6'>News Coverage</h3>
      <div className='flex space-x-4 mt-4 justify-stretch flex-col md:flex-row'>
        {data.sentimentAgg['positive'] > 0 && <Column data={filterData(data.sources, data.social, 'positive')} sentiment='positive' />}
        {data.sentimentAgg['neutral'] > 0 && <Column data={filterData(data.sources, data.social, 'neutral')} sentiment='neutral' />}
        {data.sentimentAgg['negative'] > 0 && <Column data={filterData(data.sources, data.social, 'negative')} sentiment='negative' />}
      </div>
    </article>
  )
}

function filterData(sources: any, social: any, sentiment: string) {
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

/**
 * 
  <h3 className='text-2xl font-bold text-left mt-6'>Social</h3>
  <Timeline data={filteredData} />

  <span className='hidden hover:bg-green-500 bg-green-500 hover:bg-red-500 bg-red-500 hover:bg-slate-400 bg-slate-400 hover:bg-green-600 bg-green-600 hover:bg-red-600 bg-red-600 hover:bg-slate-500 bg-slate-500'>&nbsp;</span>

  <div>
    <SentimentFilter sentimentClick={sentimentClick} />

    <h3 className='text-2xl font-bold text-left mb-6'>Articles</h3>
    <ArticleList data={filteredData} />
  </div>
 */