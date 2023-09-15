import { MouseEventHandler, useCallback, useState } from 'react'

import Image from 'next/image'

import TimeAgo from 'react-timeago'

import config from '@/config';

const sentiment: any = config.sentiment

export default function SocialComments({ data }: { data: any }) {
  const [expandComments, setExpandComments] = useState(false)
  const toggleMoreComments: MouseEventHandler = useCallback(
    (e) => {
      setExpandComments(true)
    },
    [setExpandComments]
  )

  return (
    <div>
      <ul className='flex flex-col'>
        {data.social?.length > 0 && data.social.slice(0, 2).map((socialItem: any, index: number) => {
          if (index === 1 && data.social.length > 1)
            return (
              <li className={`${expandComments ? 'hidden' : ''} w-[98%] mx-auto rounded-md mt-5 flex items-center justify-center cursor-pointer hover:underline`}
                onClick={toggleMoreComments}
                key={index}>
                <span className='py-1'>expand {data.social.length - 1} more..</span>
              </li>
            )

          return (
            <Comment socialItem={socialItem} key={index} />
          )
        })
        }
      </ul>
      <ul className={`${!expandComments ? 'hidden' : 'flex flex-col'}`}>
        {data && data.social.slice(1).map((socialItem: any, index: number) => {
          return <Comment socialItem={socialItem} key={index} />
        })}
      </ul>
    </div>

  )
}

function Comment({ socialItem }: { socialItem: any }) {
  const sentimentData = (socialItem.sentiment && sentiment[socialItem.sentiment]) ? sentiment[socialItem.sentiment] : sentiment['neutral']
  return (
    <li className={`group rounded mt-3 group select-none cursor-pointer items-center`}
      onClick={() => window.open(socialItem.url, '_blank')} >
      <div className='relative overflow-x-hidden bg-gray-200 bg-opacity-60 dark:bg-gray-800 dark:bg-opacity-40 hover:bg-opacity-80 hover:dark:bg-opacity-60 p-3 rounded-md text-sm'>
        <div className='flex items-center mb-1'>
          <span className='mr-2'>
            <Image src={'/assets/images/reddit.svg'} alt={socialItem.name || socialItem.source.name} width={35} height={35} className='h-[20px] w-auto max-w-none' />
          </span>
          <span className='leading-4'>{`u/${socialItem.author}`}</span>
          <span className='leading-4 ml-2'>
            <TimeAgo
              date={new Date(socialItem.added_at).getTime()}
              className='text-gray-600 dark:text-gray-300 text-xs'
            />
          </span>
          <span className='ml-3 flex items-center text-xs'>
            <i className={`fas fa-arrow-alt-up text-gray-400 dark:text-gray-600 mr-1`} />
            {socialItem.score}
          </span>
        </div>
        <div className='truncate-4-lines w-full'>
          {socialItem.body}
        </div>
        
        <span className={`absolute top-2 right-2 ${sentimentData.bg} w-2 h-2 opacity-80 rounded`}></span>
      </div>
    </li>
  )
}