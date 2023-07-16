
'use client'

import { useState } from 'react'

import Filters from '@/components/filters'
import Feed from '@/components/feed'

import { getFeed } from '@/helpers/api'

export default function Wrapper({ initialData }: { initialData: any }) {
  const [feedData, setFeedData] = useState(initialData);

  async function onClick(e: any) {
    e.preventDefault();

    if (!e.target.classList.contains('filter')) return;

    const filters = e.target.parentNode.querySelectorAll('.filter');
    filters.forEach((filter: any) => filter.classList.remove('underline'));

    e.target.classList.add('underline');

    try {
      const data = await getFeed(e.target.dataset.endpoint, 20, e.target.dataset.bucket);

      if (data) setFeedData(data);
    }
    catch (error) {
      console.log('error', error)
    }
  }

  async function onKeywordClick(e: any) {
    console.log('onKeywordClick')

    if (!e.target.classList.contains('keyword') || e.target.tagName === 'A' || e.target.parentNode.tagName === 'A') return;

    e.preventDefault();
  }

  return (
    <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
      <div className='mx-auto max-w-[780px] px-4'>
        <div
          className='mx-auto mb-8 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
          <Filters onClick={onClick} />
        </div>

        <Feed data={feedData} onKeywordClick={onKeywordClick} />
      </div>
    </div>
  )
}