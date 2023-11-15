
'use client'

import { useState, useCallback, Suspense } from 'react'

import Container from '@/components/layout/container'
import Filters from '@/components/layout/filters'
import Feed from '@/components/layout/feed'
import Keywords from '@/components/sidebar/keywords'

export default function Wrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showToTop, setShowToTop] = useState(false)
  const [totalResults, setTotalResults] = useState(0)

  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <Container>

      <div className='bg-gray-300 dark:bg-black sticky top-0 z-40 mb-2 -mt-[5px] lg:mb-3 pt-2'>
        <div
          className='bg-gray-200 dark:bg-black rounded text-xl text-body-color'>
          <Filters isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} totalResults={totalResults} showToTop={showToTop} />
        </div>
      </div>

      <div className='flex items-start flex-row'>
        <Suspense>
          <Feed setShowToTop={setShowToTop} showToTop={showToTop} setTotalResults={setTotalResults} />
        </Suspense>

        <div className='sticky top-20'>
          <div className={`h-auto w-[280px] mb-4 p-4 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col rounded`}>
            <h3 className='mb-5 text-2xl font-bold flex items-center'>
              <i className='fad fa-user-friends mr-3 text-xl'></i>
              Trending
            </h3>
            <div className='pl-1'>
              <Keywords defaultSize={6} />
            </div>
          </div>
        </div>
      </div>

      {showToTop &&
        <div className='sticky bottom-16 ml-auto flex items-center justify-end cursor-pointer z-50 px-5 py-2 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 w-fit rounded' onClick={backToTop}>
          <i className={`fad fa-chevron-circle-up md:mr-3`} />
          <span className='hidden lg:flex'>Back to Top</span>
        </div>
      }
    </Container >
  )
}