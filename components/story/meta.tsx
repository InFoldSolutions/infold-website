import { Suspense } from 'react'

import TimeAgo from 'react-timeago'

export default function StoryMeta({ data, time = false }: { data: any, time?: boolean }) {
  return (
    <div className='flex items-center text-gray-600 dark:text-gray-300 mt-2 text-sm font-bold'>
      <span>
        <i className='fad fa-newspaper mr-2'></i>
        {`${data.meta.articles} articles`}
      </span>
      <span className='ml-auto flex-row flex items-center'>
        {time &&
          <span className='items-center md:mr-3'>
            <i className='fad fa-clock mr-2'></i>
            <Suspense fallback={null}>
              <TimeAgo
                date={new Date(data.updated_at).getTime()}
              />
            </Suspense>
          </span>
        }
        {data.meta.sources > 0 &&
          <span className="hidden md:inline-block items-center mr-3">
            <i className='fad fa-newspaper mr-2'></i>
            {data.meta.sources}
            <span className='ml-2'>Sources</span>
          </span>
        }
        {data.meta.social > 0 &&
          <span className="hidden md:inline-block items-center">
            <i className='fad fa-comments mr-2'></i>
            {data.meta.social}
            <span className='ml-2'>Comments</span>
          </span>
        }
      </span>
    </div>
  )
}