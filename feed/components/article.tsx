import Image from 'next/image'
import TimeAgo from 'react-timeago'

import SocialComments from './comments';

interface IRelatedArticle {
  item: any,
  last?: boolean,
  children?: string,
}

export default function RelatedArticle({ item, last }: IRelatedArticle) {
  const firstArticle: any = item.articles[0]

  return (
    <li className={`${last ? 'border-b-0' : 'border-b-2'} py-5 list-none rounded-md border-gray-200 dark:border-gray-800 dark:border-opacity-80 border-dashed last:border-b-0 last:mb-0 group`}
      title={item.title}>
      <div className="flex items-center mb-3">
        <span>
          <Image src={item.source.logo} alt={item.source.name} width={80} height={80} className='w-8 h-8 max-w-none mr-2' />
        </span>
        <span className='font-bold mr-1'>{item.source.name}</span>
        <span className="text-gray-600 dark:text-gray-300 text-xs ml-auto">
          <TimeAgo
            date={new Date(firstArticle.added_at).getTime()}
            title={firstArticle.title}
          />
          <i className='fad fa-clock ml-2' />
        </span>
      </div>
      <h3 className="mb-2 text-xl font-bold flex-inline items-center">
        {firstArticle.title} <span className={`text-blue-500 hover:underline cursor-pointer text-base opacity-50 group-hover:opacity-100`} onClick={() => window.open(firstArticle.url, '_blank')}>more..</span>
      </h3>

      <div className="text-sm truncate-2-lines">
        {firstArticle.summary}
      </div>

      {item.social?.length > 0 &&
        <SocialComments data={item} />
      }
    </li >
  )
}