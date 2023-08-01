
import Image from 'next/image'
import TimeAgo from 'react-timeago'

export default function RelatedItem({ item, index }: { item: any, index: number }) {
  switch (item.type) {
    case 'post':
      return (
        <li className='group timeline-item select-none flex cursor-pointer relative items-center h-[50px] top-[75px] even:top-[5px] relative before:content-[""] before:absolute before:rounded before:-top-[15px] before:left-[23px] before:w-3 before:h-3 before:bg-orange-600 before:border-[50%]'
          onClick={() => window.open(item.url, '_blank')}
          title={item.title}
          key={index} >
          <Image src='/assets/images/reddit.svg' alt={item.name} width={60} height={60} className='h-[36px] max-w-none mr-1' />
          <div className='flex flex-col min-w-[110px] overflow-x-hidden'>
            <span className='leading-4'>{item.handle}</span>
            <TimeAgo
              date={new Date(item.added_at).getTime()}
              className='text-gray-600 dark:text-gray-300 text-xs'
              title={item.title}
            />
          </div>
        </li>
      )
    case 'tweet':
      return (
        <li className='group timeline-item select-none flex cursor-pointer relative items-center h-[50px] top-[75px] even:top-[5px] relative before:content-[""] before:absolute before:rounded before:-top-[15px] before:left-[24px] before:w-3 before:h-3 before:bg-sky-500 before:border-[50%]'
          onClick={() => window.open(item.url, '_blank')}
          title={item.title}
          key={index} >
          <Image src='/assets/images/twitter.svg' alt={item.name} width={60} height={60} className='h-[36px] max-w-none mr-1' />
          <div className='flex flex-col min-w-[110px] overflow-x-hidden'>
            <span className='leading-4'>{item.handle}</span>
            <TimeAgo
              date={new Date(item.added_at).getTime()}
              className='text-gray-600 dark:text-gray-300 text-xs'
              title={item.title}
            />
          </div>
        </li>
      )
    default:
      return (
        <li className='group timeline-item select-none flex cursor-pointer relative items-center h-[50px] top-[75px] even:top-[5px] relative before:content-[""] before:absolute before:rounded before:-top-[15px] before:left-[16px] before:w-3 before:h-3 before:bg-neutral-800 dark:before:bg-neutral-400 before:border-[50%]'
          onClick={() => window.open(item.articles[0].url, '_blank')}
          title={item.articles[0].title}
          key={index} >
          <Image src={item.source.logo} alt={item.source.name} width={80} height={80} className='w-11 h-11 max-w-none rounded-full mr-2 border-2 border-transparent group-hover:border-white' />
          <div className='flex flex-col min-w-[110px] overflow-x-hidden'>
            <span className='leading-4'>{item.source.name}</span>
            <TimeAgo
              date={new Date(item.articles[0].added_at).getTime()}
              className='text-gray-600 dark:text-gray-300 text-xs'
              title={item.articles[0].title}
            />
          </div>
        </li>
      )
  }
}