
'use client'

import { Suspense } from 'react'

import ActionsBar from '@/components/layout/actionsbar'
import Feed from '@/components/feed/feed'
import config from '@/config'

export default function Wrapper() {
  return (
    <div className='flex items-start flex-row font-mono overflow-y-hidden overflow-x-hidden md:overflow-x-scroll max-h-[100vh]'>
      <ActionsBar />

      <div className='flex relative z-0'>
        <Suspense>
          {config.defaultFeeds.map((feed: any, index: number) =>
            <Feed meta={feed}
              key={index} />)}
        </Suspense>
      </div>
    </div>
  )
}