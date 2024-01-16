
'use client'

import { useState, useCallback, Suspense } from 'react'

import Container from '@/components/layout/container'
import ActionsBar from '@/components/layout/actionsbar'
import Feed from '@/components/feed/feed'
import config from '@/config'

export default function Wrapper() {
  const [showToTop, setShowToTop] = useState(false)
  const [totalResults, setTotalResults] = useState(0)

  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <Container>
      <div className='flex items-start flex-row'>
        <ActionsBar />

        <div className='flex'>
          <Suspense>
            {config.defaultFeeds.map((feed: any, index: number) => 
              <Feed setShowToTop={setShowToTop} 
                    showToTop={showToTop} 
                    setTotalResults={setTotalResults} 
                    meta={feed}
                    key={index} />)}
          </Suspense>
        </div>
      </div>
    </Container >
  )
}