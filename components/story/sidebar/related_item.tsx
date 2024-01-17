'use client'

import Link from 'next/link'
import { Suspense } from 'react'

import TimeAgo from 'react-timeago'

export default function RelatedItem({ story }: { story: any }) {
  return (
    <li className="pb-1 mb-1 last:pb-0 last:mb-0 flex items-center group/item">
      <Link href={`/story/${story.slug}`} prefetch={false} className="group/link" title={story.title}>
        <span className="font-bold block leading-4 truncate-2-lines group-hover/link:underline">{story.title}</span>
        <span className="text-xs">
          <Suspense fallback={null}>
            <TimeAgo
              date={new Date(story.updated_at).getTime()}
            />
          </Suspense>
        </span>
      </Link>
    </li>
  )
}