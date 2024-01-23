
import { Suspense } from 'react'

import TimeAgo from 'react-timeago'

import Link from 'next/link'

import Thumbs from '@/components/story/thumbs'

import { Topic } from '@/types/topic'
import { FeedMeta } from '@/types/feedmeta'

export default function TopicPost({ topic, meta }: { topic: Topic, meta: FeedMeta }) {
  return (
    <li className='relative no-highlight-tap border-gray-200 border-b-2 border-dashed dark:border-gray-800 dark:border-opacity-80 last:border-b-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-40 hover:bg-opacity-30'>
      <Link href={`/story/${topic.slug}`} prefetch={false} className='p-4 flex flex-col'>

        <div className='flex flex-col items-center mb-1'>
          {(topic.media?.length > 0) &&
            <Thumbs media={topic.media} />
          }
          <h3 className='text-xl leading-snug text-left'>
            {topic.title}
          </h3>
        </div>

        <div className='flex items-center text-gray-600 dark:text-gray-300 mt-2 text-sm font-bold'>
          {topic.meta?.articles &&
            <span>
              <i className='fad fa-newspaper mr-2'></i>
              {`${topic.meta?.articles} articles`}
            </span>
          }

          <span className='ml-auto flex-row flex items-center'>
            <span className='items-center md:mr-3'>
              <i className='fad fa-clock mr-2'></i>
              <Suspense fallback={null}>
                {topic.updated_at &&
                  <TimeAgo
                    date={new Date(topic.updated_at).getTime()}
                  />
                }
              </Suspense>
            </span>
            {topic.meta?.sources > 0 &&
              <span className="hidden md:inline-block items-center mr-3">
                <i className='fad fa-newspaper mr-2'></i>
                {topic.meta.sources}
                <span className='ml-2'>Sources</span>
              </span>
            }
            {topic.meta?.social > 0 &&
              <span className="hidden md:inline-block items-center">
                <i className='fad fa-comments mr-2'></i>
                {topic.meta.social}
                <span className='ml-2'>Comments</span>
              </span>
            }
          </span>
        </div>
      </Link>
    </li>
  )
}