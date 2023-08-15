'use client'

import { useState, useEffect, useCallback, MouseEventHandler } from "react"

import Timeline from "@/components/timeline"
import Spinner from "@/components/spinner"
import RelatedArticle from "@/components/article"

import { findParentByDataset } from '@/helpers/utils'


let loaded = false

export default function TopicWrapper({ data, modal = false }: { data: any, modal?: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const [expandArticles, setExpandArticles] = useState(false)
  const [sentiment, setSentiment] = useState<any>('')
  const [filteredData, setFilteredData] = useState<any>({
    sources: data.sources.filter((source: any) => source.articles[0].sentimentName === sentiment),
    social: data.social.filter((social: any) => social.sentiment === sentiment)
  })

  const toggleMoreArticles: MouseEventHandler = useCallback(
    (e) => {
      setExpandArticles(true)
    },
    [setExpandArticles]
  )

  useEffect(() => {
    if (!loaded) {
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', event => {
          const newColorScheme = event.matches ? "dark" : "light";
          const prevBgColor = newColorScheme === 'dark' ? 'bg-gray-200' : 'bg-gray-800'
          const bgColor = newColorScheme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'

          const elements = document.querySelectorAll(`li.${prevBgColor}`)

          elements.forEach((element: any) => {
            element.classList.remove(prevBgColor)
            element.classList.add(bgColor)
          })
        });

      loaded = true
    }
  }, [])

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

  const toggleExpanded: MouseEventHandler = useCallback(() => {
    setExpanded((expanded) => !expanded)
  }, [])

  const sentimentClick: MouseEventHandler = useCallback((e) => {
    // @ts-ignore
    const element = e.target as HTMLElement
    const currentColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
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

      <span className='hidden hover:bg-green-500 bg-green-500 hover:bg-red-500 bg-red-500 hover:bg-slate-400 bg-slate-400 hover:bg-green-600 bg-green-600 hover:bg-red-600 bg-red-600 hover:bg-slate-500 bg-slate-500'>&nbsp;</span>

      <div>
        <div className='mt-6 flex items-center -mb-9'>
          <ul className='flex ml-auto w-auto'>
            <li className='flex items-center mr-2 cursor-pointer border-2 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 px-2 select-none' title='Toggle display' data-sentiment="positive" onClick={sentimentClick}>
              <span className="flex items-center">
                <b className='text-green-600'>56</b>
                <i className='far text-green-600 fa-smile ml-2'></i>
                <span className='hidden md:inline-block ml-2 text-sm'>Positive</span>
              </span>
            </li>
            <li className='flex items-center mr-2 cursor-pointer border-2 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 px-2 select-none' title='Toggle display' data-sentiment="negative" onClick={sentimentClick}>
              <span className="flex items-center">
                <b className='text-red-600'>23</b>
                <i className='far fa-frown text-red-600 ml-2'></i>
                <span className='hidden md:inline-block ml-2 text-sm'>Negative</span>
              </span>
            </li>
            <li className='flex items-center cursor-pointer border-2 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 px-2 select-none' title='Toggle display' data-sentiment="neutral" onClick={sentimentClick}>
              <span className="flex items-center">
                <b className='text-slate-500'>10</b>
                <i className='far fa-meh text-slate-500 ml-2'></i>
                <span className='hidden md:inline-block ml-2 text-sm'>Neutral</span>
              </span>
            </li>
          </ul>
        </div>
        <h3 className='text-2xl font-bold text-left mb-6'>Articles</h3>
        <ul className='list-inside list-disc -m-2 -mx-4 min-h-[100px]'>
          {!filteredData || filteredData.sources.length === 0 && <li className='w-full justify-center mt-24 pl-2 pt-2 flex items-center justify-center'><Spinner /> Loading articles</li>}
          {filteredData && filteredData.sources.slice(0, 8).map((item: any, index: number) => {
            if (index === 7 && filteredData.sources.length > 7)
              return (
                <li className={`${expandArticles ? 'hidden' : ''} w-[97%] mx-auto rounded-md -mb-2 flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-60`}
                  onClick={toggleMoreArticles}
                  key={index}>
                  <span className="py-3">more articles..</span>
                </li>
              )

            return <RelatedArticle item={item} key={index} />
          })}
        </ul>
        <ul className={`${!expandArticles ? 'hidden' : ''} list-inside list-disc -m-2 -mx-4`}>
          {filteredData && filteredData.sources.slice(7).map((item: any, index: number) => {
            return <RelatedArticle item={item} key={index} />
          })}
        </ul>
      </div>
    </article>
  )
}