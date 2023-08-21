import TimeAgo from 'react-timeago'

import Image from 'next/image'

import config from '@/config'

const sentimentData: any = config.sentiment

export default function Column({ data, sentiment }: { data: any, sentiment: string }) {
  return (
    <div className='basis-1/2'>
      <div className={`${sentimentData[sentiment].textColor} flex p-2 px-3 items-center justify-center bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60`}>
        <i className={`far ${sentimentData[sentiment].icon} mr-2`} />
        {sentimentData[sentiment].name}
        <span className='ml-auto flex items-center'>
          <i className={`fad fa-chart-bar mr-2`} />
          {data.sources.length}
        </span>
      </div>
      <ul className='grow-0'>
        {data.sources.map((item: any, index: number) => {
          const itemSentiment = item.sentiment || item.articles[0].sentiment
          const url = item.url || item.articles[0].url

          return (
            <li className='flex dark:hover:bg-gray-800 dark:hover:bg-opacity-40 hover:bg-gray-200 hover:bg-opacity-70 p-4 px-2 relative cursor-pointer border-b-2 border-gray-200 border-dashed dark:border-neutral-600 last:border-b-0'
              onClick={() => window.open(url, '_blank')}
              key={index}>
              <Image src={item.logo || item.source.logo} alt="Logo" width={80} height={80} className='mr-3 h-11 w-11' />
              <span className='flex flex-col'>
                <span className='flex'>
                  <span className='max-w-[150px] truncate inline-flex'>{item.handle || item.source.name}</span>
                  <span className="text-gray-600 dark:text-gray-200 text-xs ml-auto">
                    <TimeAgo
                      date={new Date(item.added_at || item.articles[0].added_at).getTime()}
                    />
                  </span>
                </span>
                <span className='mr-1 truncate-3-lines text-sm text-gray-800 dark:text-gray-300'>
                  {item.summary || item.articles[0].title}
                </span>
              </span>
            </li>
          )
        }
        )}
      </ul>
    </div>
  )
}

// <span className={`${sentimentData[itemSentiment].bg} w-1 h-1 rounded p-1 ml-2`}></span>