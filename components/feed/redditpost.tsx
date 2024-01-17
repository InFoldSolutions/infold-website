
import { Suspense, useCallback, useRef, UIEvent } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import TimeAgo from 'react-timeago'

import { RedditPost } from '@/types/redditpost'

export default function RedditPreview({ post }: { post: RedditPost }) {

  const video = useRef<HTMLVideoElement>(null)

  const onVideoClick = useCallback((e: UIEvent) => {
    console.log('video click', e)
    
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (video.current) {
      if (video.current.paused)
        video.current.play()
      else
        video.current.pause()
    }
  }, [video])

  return (
    <li className='relative no-highlight-tap border-gray-200 border-b-2 border-dashed dark:border-gray-800 dark:border-opacity-80 last:border-b-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:bg-opacity-40 hover:bg-opacity-30'>
      <Link href={`https://www.reddit.com${post.permalink}`} prefetch={false} className='p-4 flex flex-col' target='_blank'>

        <div className='flex items-center text-gray-600 dark:text-gray-300 text-sm font-bold'>
          <span className='mb-1'>
            {post.subreddit_name_prefixed}
          </span>
        </div>
        <div className='flex flex-col items-center mb-1'>
          {post.post_hint === 'image' &&
            <Image unoptimized src={post.url_overridden_by_dest} alt={post.title} width={320} height={160} className='min-w-[180px]' />
          }
          {post.post_hint === 'hosted:video' &&
            <video style={{ width: post.media.reddit_video.width, height: 'auto' }} controls ref={video} onClick={onVideoClick}>
              <source src={post.media.reddit_video.fallback_url} />
            </video>
          }

          <h3 className='text-xl text-left w-full mt-2'>
            {post.title}
          </h3>
        </div>

        <div className='flex items-center text-gray-600 dark:text-gray-300 mt-2 text-sm font-bold'>
          <span className='items-center md:mr-3'>
            <i className='fad fa-clock mr-2'></i>
            <Suspense fallback={null}>
              <TimeAgo
                date={post.created * 1000}
              />
            </Suspense>
          </span>
          <span className='ml-auto flex-row flex items-center'>
            {post.num_comments && post.num_comments > 0 &&
              <span className="hidden md:inline-block items-center">
                <i className='fad fa-comments mr-2'></i>
                {post.num_comments}
                <span className='ml-2'>Comments</span>
              </span>
            }
          </span>
        </div>
      </Link>
    </li>
  )
}