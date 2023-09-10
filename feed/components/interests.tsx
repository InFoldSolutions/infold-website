'use client'

import { useState } from 'react';

export default function Interests({ interests, saveInterests }: { interests: string[], saveInterests: any }) {

  const [selected, setSelected] = useState<string[]>([])

  return (
    <div className='flex items-center flex-col my-auto py-8'>
      <h3 className='text-2xl md:text-3xl font-bold mb-6 flex justify-center text-center items-center'>
        <i className='fad fa-newspaper mr-6' /> Get The Full Story
      </h3>
      <h4 className='flex justify-center mb-4 text-center max-w-[80%]'>
        {`News is broken and driven by different agendas. We're here to help you get context, delve deeper, and learn more.`}
      </h4>
      <p className='mb-2 underline text-center cursor-pointer text-sm'>
        Read more
      </p>
      <p className='mt-4 w-[50%] border-b-2 border-gray-200 border-dashed dark:border-gray-800 dark:border-opacity-80'></p>
      <h3 className='text-2xl font-bold mt-6 mb-2 flex justify-center text-center'>
        Tell us what you like to read about
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
      <p className='mt-4 w-[50%] border-b-2 border-gray-200 border-dashed dark:border-gray-800 dark:border-opacity-80'></p>
      <button className={`${selected.length > 3 ? 'bg-black dark:bg-white dark:text-black' : 'bg-gray-500 dark:bg-gray-500 dark:bg-opacity:80 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded mt-5 flex items-center`} onClick={() => saveInterests(selected)}>
        Continue <i className={`fad ${selected.length > 3 ? 'fa-check-circle' : 'fa-ban'} ml-2`}></i>
      </button>
      <span className={`text-sm mt-2 ${selected.length > 3 ? 'hidden' : ''} `}>Select <b>{4 - selected.length}</b> more</span>
      <span className={`cursor-pointer text-sm mt-2 hover:underline ${selected.length > 3 ? '' : 'hidden'} `}>Show more</span>
    </div >
  )
}