
import { getRandomInt } from '@/helpers/utils'
import Image from 'next/image'
import TimeAgo from 'react-timeago'

export default function RelatedItem({ item, index }: { item: any, index: number }) {
  switch (item.type) {
    case 'social':
      return (
        <li className='mr-4 min-w-[250px] group select-none cursor-pointer relative items-center relative before:content-[""] before:absolute before:rounded before:-bottom-[17px] before:left-[70px] before:w-3 before:h-3 before:bg-white before:border-[50%]'
          onClick={() => window.open(item.url, '_blank')}
          title={item.title}
          key={index} >
          <div className='bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 p-4 rounded-md text-sm'>
            <span className='truncate-4-lines box-border min-h-[80px]'>
              {item.summary}
            </span>
          </div>
          <div className='flex overflow-x-hidden items-center text-sm mt-3 ml-3'>
            <span className='mr-2'>
              <Image src={item.logo} alt={item.name} width={35} height={35} className='h-[30px] w-auto max-w-none' />
            </span>
            <span>
              <span className='leading-4'>{item.handle}</span>
              <span className='block leading-4'>
                <TimeAgo
                  date={new Date(item.added_at).getTime()}
                  className='text-gray-600 dark:text-gray-300 text-xs'
                  title={item.title}
                />
              </span>
            </span>
            <span className='ml-auto mr-2 text-xs flex flex-col'>
              <span className='leading-4 text-right'><b>{item.likes}</b> likes </span>
              <span className='leading-4 text-right'><b>{item.views}</b> views</span>
            </span>
          </div>
        </li>
      )
    default:
      return (
        <li className='mr-4 group select-none flex cursor-pointer relative items-center h-[50px] top-[75px] relative before:content-[""] before:absolute before:rounded before:-top-[15px] before:left-[10px] before:w-3 before:h-3 before:bg-neutral-200 dark:before:bg-neutral-400 before:border-[50%]'
          onClick={() => window.open(item.articles[0].url, '_blank')}
          title={item.articles[0].title}
          key={index} >
          <Image src={item.source.logo} alt={item.source.name} width={80} height={80} className='w-11 h-11 max-w-none rounded-full mr-2 border-2 border-transparent group-hover:border-white' />
          <div className='flex flex-col min-w-[130px] overflow-x-hidden relative top-4'>
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