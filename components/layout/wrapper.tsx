
'use client'

import { useState, useCallback, Suspense } from 'react'

import Container from '@/components/layout/container'
import ActionsBar from '@/components/layout/actionsbar'
import Feed from '@/components/feed/feed'
import config from '@/config'

export default function Wrapper() {
  return (
    <Container>
      <div className='flex items-start flex-row overflow-y-hidden overflow-x-scroll max-h-[100vh]'>
        <ActionsBar />

        <div className='flex relative z-0'>
          <Suspense>
            {config.defaultFeeds.map((feed: any, index: number) => 
              <Feed meta={feed}
                    key={index} />)}
          </Suspense>
        </div>
      </div>
    </Container >
  )
}