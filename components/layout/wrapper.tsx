
'use client'

import { useState, useCallback, Suspense } from 'react'

import Image from 'next/image'

import Container from '@/components/layout/container'
import Feed from '@/components/feed/feed'
import ActionsBar from './actionsbar'

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
        
        <div className='flex items-start flex-row'>
          <Suspense>
            <Feed setShowToTop={setShowToTop} showToTop={showToTop} setTotalResults={setTotalResults} />
          </Suspense>
        </div>
      </div>
    </Container >
  )
}