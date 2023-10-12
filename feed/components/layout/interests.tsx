'use client'

import { useCallback, useState } from 'react';

import Link from 'next/link';
import { trackEvent } from '@/helpers/analytics';

export default function Interests({ interests, saveInterests, setSelectedInterests }: { interests: string[], saveInterests: any, setSelectedInterests: any }) {

  const [selected, setSelected] = useState<string[]>([])

  const onContinueClick = useCallback(() => {
    trackEvent({
      action: "interests",
      params: {
        name: 'continue'
      }
    })

    setSelectedInterests(selected)
    saveInterests(selected)
    window.open('/feed', '_self')
  }, [selected])

  return (
    <div className='flex items-center flex-col my-auto py-2 md:py-8'>
      <h3 className='text-2xl md:text-3xl font-bold mt-6 mb-2 flex justify-center text-center items-center max-w-[80%]'>
        <span className='hidden lg:flex'>
          <i className='fad fa-newspaper mr-4 md:mr-6' />
        </span> Tell us what you like to read about
      </h3>
      <h4 className='flex justify-center mb-6'>
        Select at least <b className='mx-2'>4</b> interests
      </h4>
      <ul className='flex flex-wrap text-xl justify-center'>
        {interests.map((interest: string, index: number) => (
          <li className={`rounded py-2 px-3 cursor-pointer m-2 ${selected.includes(interest) ? `bg-black text-white dark:bg-white dark:text-black` : `bg-gray-200 dark:bg-gray-600 dark:bg-opacity-40 hover:bg-gray-100 dark:hover:text-black`} `}
            onClick={() => setSelected((current) => {
              if (current.includes(interest))
                return current.filter((item) => item !== interest)
              else
                return [...current, interest]
            })}
            key={index}>
            {interest}
          </li>
        ))}
      </ul>
      <p className='mt-6 w-[50%] border-b-2 border-gray-200 border-dashed dark:border-gray-800 dark:border-opacity-80'></p>
      <button className={`${selected.length > 3 ? 'bg-black dark:bg-white dark:text-black' : 'bg-gray-500 dark:bg-gray-500 dark:bg-opacity:80 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded mt-5 flex items-center`} onClick={() => onContinueClick()}>
        Continue <i className={`fad ${selected.length > 3 ? 'fa-check-circle' : 'fa-ban'} ml-2`}></i>
      </button>
      <span className={`text-sm mt-2 ${selected.length > 3 ? 'hidden' : ''} `}>Select <b>{4 - selected.length}</b> more</span>
      <span className={`text-sm mt-2 ${selected.length > 3 ? '' : 'hidden'} `}>Get personal feed</span>
      <p className='my-6 w-[50%] border-b-2 border-gray-200 border-dashed dark:border-gray-800 dark:border-opacity-80'></p>
      <h3 className='text-2xl md:text-3xl font-bold mb-6 flex justify-center text-center items-center'>
        Get The Full Story
      </h3>
      <h4 className='mb-4 text-center max-w-[80%]'>
        {`News is broken and driven by different agendas. We're here to help you get context, delve deeper, and learn more.`}
      </h4>
      <Link href={'https://infold.medium.com/a-lot-of-knowledge-is-a-dangerous-thing-6a4d2560cc83'}
        target={'blank'}
        className='underline cursor-pointer w-fit text-center'
        title='A Lot of Knowledge is a Dangerous Thing - Read on Medium'>
        read more..
      </Link>
    </div >
  )
}