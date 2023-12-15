'use client'

import Link from 'next/link'

export default function About() {
  return (
    <article className='max-w-[95%] flex mx-auto mt-[6%] h-full flex-col pb-4 md:pb-8'>
      <div className='w-full lg:max-w-[80%] mx-auto flex flex-col'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6 flex justify-center text-center items-center'>
          Discover The Full Story
        </h2>
        <h4 className='mb-4 text-lg leading-relaxed sm:text-xl sm:leading-relaxed text-center'>
          {`News is broken and driven by different agendas. We're here to help you get context, delve deeper, and learn more.`}
        </h4>
        <Link href={'https://infold.medium.com/a-lot-of-knowledge-is-a-dangerous-thing-6a4d2560cc83'}
          target={'blank'}
          className='underline cursor-pointer w-fit mx-auto flex items-center'
          title='A Lot of Knowledge is a Dangerous Thing - Read on Medium'>
          <i className='fab fa-medium mr-2 text-base' />
          read more..
        </Link>
        <p className='my-8 border-b-2 border-gray-200 border-dashed dark:border-gray-800 dark:border-opacity-80'></p>
      </div>

      <div className='flex flex-col'>
        <div className='flex w-full'>
          <div className='lg:max-w-[80%] mx-auto'>
            <div className='mx-auto max-w-[620px] text-center'>
              <span className='mb-2 block text-lg font-semibold'>
                Data aggregation
              </span>
              <h2 className='mb-4 font-bold text-3xl md:text-4xl'>
                Variety of sources
              </h2>
              <p className='text-lg leading-relaxed sm:text-xl sm:leading-relaxed'>
                Compare views from an ever expanding list of online sources and publishers.
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap'>
          <div
            className='mt-10 max-w-full flex mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='flex justify-center items-center'>
              <div className='text-center'>
                <div className='mx-auto z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center'>
                  <i className='fad fa-books text-6xl mx-auto' />
                </div>
                <h3 className='mb-3 text-xl font-bold text-dark'>Knowledge</h3>
                <p className='text-body-color'>Relevant keywords are cross referenced across multiple online libraries and knowledge bases.</p>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='text-center'>
                <div className='mx-auto z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center'>
                  <i className='fad fa-flask text-6xl mx-auto' />
                </div>
                <h3 className='mb-3 text-xl font-bold text-dark'>Science and Tech</h3>
                <p className='text-body-color'>Research, commentary about science and nature from scientific magazines and journals.</p>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='text-center'>
                <div className='mx-auto z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center'>
                  <i className='fad fa-newspaper text-6xl mx-auto' />
                </div>
                <h3 className='mb-3 text-xl font-bold text-dark'>Latest News</h3>
                <p className='text-body-color'>International news of recent events, business, entertainment from a variety of publishers.</p>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='text-center'>
                <div className='mx-auto z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center'>
                  <i className='fad fa-edit text-6xl' />
                </div>
                <h3 className='mb-3 text-xl font-bold text-dark'>Online publishing</h3>
                <p className='text-body-color'>Online publishing platforms and blog sites from individual contributors
                  and authors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}