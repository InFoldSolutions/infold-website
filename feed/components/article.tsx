import Image from 'next/image'
import TimeAgo from 'react-timeago'

interface IRelatedArticle {
  item: any,
  children?: string, 
}

export default function RelatedArticle({ item }: IRelatedArticle) {
  return (
    <li className='mb-1 p-4 last:mb-0 list-none border-bottom-2 border-bottom-white border-dashed cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-60 rounded-md'
      onClick={() => window.open(item.articles[0].url, '_blank')}
      title={item.title}>
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
        <span className={`${item.articles[0].sentimentBg} text-white rounded text-xs p-1 flex items-center justify-center ml-auto opacity-80`}>
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
  )
}