'use client'

import Timeline from "./timeline"
import Keywords from "./keywords"

export default function TopicWrapper({ data }: { data: any }) {
  return (
    <article>
      <h3 className='mb-4 text-2xl font-bold'>
        {data.title}<br />
        <small className='text-sm'>Topic summarized from {data.sources.length} sources.</small>
      </h3>

      <div className='text-left'>
        <ul className='list-inside list-disc'>
          {data.outline.slice(0, 2).map((outline: string, index: number) => (
            <li className='mb-4' key={index}>
              {outline}
            </li>
          ))}
        </ul>
      </div>

      <h3 className='text-2xl font-bold text-left'>Timeline</h3>
      <Timeline data={data} />

      {data.keywords.length > 0 &&
        <div className='mt-6'>
          <h3 className='mb-4 text-2xl font-bold'>Relevant Keywords</h3>
          <Keywords item={data} />
        </div>
      }

      <div className='mt-6'>
        <h3 className='mb-4 text-2xl font-bold'>Detailed summary</h3>
        <ul className='list-inside list-disc'>
          {data.outline.slice(2).map((outline: string, index: number) => (
            <li className='mb-4' key={index}>
              {outline}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}