'use client'

import { useState, useEffect, MouseEventHandler } from "react"

import Image from "next/image"

import TimeAgo from 'react-timeago'

import Timeline from "@/components/timeline"

import { findParentByDataset } from '@/helpers/utils'

export default function TopicWrapper({ data, modal = false }: { data: any, modal?: boolean }) {

  const [expanded, setExpanded] = useState(false)
  const [sentiment, setSentiment] = useState<any>('')
  const [filteredData, setFilteredData] = useState<any>(false)

  function toggleExpanded() {
    setExpanded(!expanded)
  }

  useEffect(() => {
    setFilteredData(() => {
      if (!sentiment) {
        return {
          sources: data.sources,
          social: data.social
        }
      } else {
        return {
          sources: data.sources.filter((source: any) => source.articles[0].sentimentName === sentiment),
          social: data.social.filter((social: any) => social.sentiment === sentiment)
        }
      }
    })
  }, [sentiment])

  function sentimentClick(e: MouseEventHandler<HTMLLIElement>) {
    // @ts-ignore
    const element = e.target as HTMLElement

    if (!element) return console.warn('TopicWrapper: sentimentClick: element not found')
    const parent = findParentByDataset(element, 'sentiment')

    if (!parent) return console.warn('TopicWrapper: sentimentClick: parent not found')

    if (parent.classList.contains('bg-gray-200')) {
      parent.classList.remove('bg-gray-200')
      return setSentiment('')
    }

    const wrapper = parent.parentElement

    if (!wrapper) return console.warn('TopicWrapper: sentimentClick: wrapper not found')

    const items = wrapper?.querySelectorAll('li') || []

    items.forEach((item: any) => {
      item.classList.remove('bg-gray-200')
    })

    parent.classList.add('bg-gray-200')

    const sentiment = parent.dataset.sentiment

    if (!sentiment) return console.warn('TopicWrapper: sentimentClick: sentiment not found')

    setSentiment(sentiment)
  }

  return (
    <article>
      <h3 className={`${modal ? 'mr-4' : ''} mb-4 text-3xl font-bold`}>
        <span>{data.title}</span><br />
        <small className='text-sm'>Topic summarized from {data.sources.length} sources.</small>
      </h3>

      <div className='text-left'>
        <ul className='list-inside list-disc'>
          {data.outline.slice(0, 2).map((outline: string, index: number) => (
            <li className='mb-4 last:mb-0' key={index}>
              {outline}
              {(index == 1 && !expanded) && <span className={`text-blue-500 underline ml-2 cursor-pointer`} onClick={toggleExpanded}>more..</span>}
            </li>
          ))}
        </ul>

        {expanded &&
          <ul className='list-inside list-disc mt-4'>
            {data.outline.slice(2).map((outline: string, index: number) => (
              <li className='mb-4 last:mb-0' key={index}>
                {outline}
                {(index + 3 == data.outline.length && expanded) && <span className={`text-blue-500 underline ml-2 cursor-pointer`} onClick={toggleExpanded}>less..</span>}
              </li>
            ))}
          </ul>
        }
      </div>

      <h3 className='text-2xl font-bold text-left mt-6'>Social</h3>
      <Timeline data={filteredData} />

      <span className='hidden bg-green-500 bg-red-500 bg-slate-400 bg-green-600 bg-red-600 bg-slate-500'>&nbsp;</span>

      <div>
        <div className='mt-6 flex items-center -mb-9'>
          <ul className='flex ml-auto w-auto'>
            <li className='flex items-center mr-2 cursor-pointer border-2 p-1 px-2 select-none' title='Toggle display' data-sentiment="positive" onClick={sentimentClick}>
              <span>
                <b className='text-green-600'>56</b>
                <i className='far text-green-600 fa-smile ml-2'></i>
                <span className='hidden md:inline-block ml-2'>Positive</span>
              </span>
            </li>
            <li className='flex items-center mr-2 cursor-pointer border-2 p-1 px-2 select-none' title='Toggle display' data-sentiment="negative" onClick={sentimentClick}>
              <span>
                <b className='text-red-600'>23</b>
                <i className='far fa-frown text-red-600 ml-2'></i>
                <span className='hidden md:inline-block ml-2'>Negative</span>
              </span>
            </li>
            <li className='flex items-center cursor-pointer border-2 p-1 px-2 select-none' title='Toggle display' data-sentiment="neutral" onClick={sentimentClick}>
              <span>
                <b className='text-slate-500'>10</b>
                <i className='far fa-meh text-slate-500 ml-2'></i>
                <span className='hidden md:inline-block ml-2'>Neutral</span>
              </span>
            </li>
          </ul>
        </div>
        <h3 className='text-2xl font-bold text-left mb-6'>Articles</h3>
        <ul className='list-inside list-disc -m-2 -mx-4'>
          {filteredData && filteredData.sources.slice(0, 8).map((item: any, index: number) => (
            <li className='mb-1 p-4 last:mb-0 list-none border-bottom-2 border-bottom-white border-dashed cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-60 rounded-md'
              onClick={() => window.open(item.articles[0].url, '_blank')}
              title={item.title}
              key={index}>
              <div className="flex items-center mb-3">
                <span>
                  <Image src={item.source.logo} alt={item.source.name} width={80} height={80} className='w-8 h-8 max-w-none mr-2 border-2 border-transparent group-hover:border-white' />
                </span>
                <span className='font-bold mr-1 max-w-[110px] md:max-w-[200px]'>{item.source.name}</span>
                <span className="mr-1 text-gray-600">-</span>
                <span className="text-gray-600 dark:text-gray-300 text-xs">
                  <TimeAgo
                    date={new Date(item.articles[0].added_at).getTime()}
                    title={item.articles[0].title}
                  />
                </span>
                <span className={`${item.articles[0].sentimentBg} text-white rounded text-xs p-1 flex items-center justify-center ml-auto opacity-60`}>
                  <i className={`far ${item.articles[0].sentimentIcon} text-white`} />
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold">
                {item.articles[0].title}
              </h3>
              <div className="text-sm truncate-2-lines">
                {item.articles[0].summary}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}