'use client'

import Image from "next/image"
import Link from "next/link"

import TimeAgo from 'react-timeago'

import Timeline from "@/components/timeline"

export default function TopicWrapper({ data, modal = false }: { data: any, modal?: boolean }) {
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
            </li>
          ))}
        </ul>
      </div>

      <h3 className='text-2xl font-bold text-left mt-6'>Social</h3>
      <Timeline data={data} />

      <span className='hidden bg-green-500 bg-red-500 bg-slate-400'>&nbsp;</span>

      <div>
        <div className='mt-6 flex items-center -mb-9'>
          <ul className='flex ml-auto w-auto'>
            <li className='flex items-center mr-2 cursor-pointer border-2 p-1 px-2 select-none' title='Toggle display'>
              <span>
                <b>56</b> 
                <span className='hidden md:inline-block ml-2'>Positive</span>
              </span>
            </li>
            <li className='opacity-50 hover:opacity-100 flex items-center mr-2 cursor-pointer border-2 p-1 px-2 select-none' title='Toggle display'>
              <span>
                <b>23</b> 
                <span className='hidden md:inline-block ml-2'>Negative</span>
              </span>
            </li>
            <li className='opacity-50 hover:opacity-100 flex items-center cursor-pointer border-2 p-1 px-2 select-none' title='Toggle display'>
              <span>
                <b>10</b> 
                <span className='hidden md:inline-block ml-2'>Neutral</span>
              </span>
            </li>
          </ul>
        </div>
        <h3 className='text-2xl font-bold text-left mb-6'>Articles</h3>
        <ul className='list-inside list-disc -m-2 -mx-4'>
          {data.sources.slice(0, 8).map((item: any, index: number) => (
            <li className='mb-1 p-4 last:mb-0 list-none border-bottom-2 border-bottom-white border-dashed cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-60 rounded-md'
              onClick={() => window.open(item.articles[0].url, '_blank')}
              title={item.title}
              key={index}>
              <div className="flex items-center mb-3">
                <span>
                  <Image src={item.source.logo} alt={item.source.name} width={80} height={80} className='w-8 h-8 max-w-none mr-2 border-2 border-transparent group-hover:border-white' />
                </span>
                <span className='font-bold mr-2 max-w-[110px] md:max-w-[200px]'>{item.source.name}</span>
                <span className={`${item.articles[0].sentimentClass} text-white rounded text-sm px-2`}>{item.articles[0].sentiment}</span>
                <span className="text-gray-600 dark:text-gray-300 text-xs ml-auto">
                  <TimeAgo
                    date={new Date(item.articles[0].added_at).getTime()}
                    title={item.articles[0].title}
                  />
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold">
                {item.articles[0].title}
              </h3>
              <div className="text-gray-600 dark:text-gray-400 truncate-2-lines">
                {item.articles[0].summary}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}