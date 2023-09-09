'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react';

export default function Interests({ interests, saveInterests }: { interests: string[], saveInterests: any }) {

  const [selected, setSelected] = useState<string[]>([])

  return (
    <div className='flex items-center flex-col my-auto'>
      <h3 className='text-2xl font-bold mt-6 mb-2 flex justify-center text-center'>What do you like to read about ?</h3>
      <h4 className='flex justify-center mb-6'>Select at least <b className='mx-2'>4</b> interests</h4>
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
      <button className={`${selected.length > 3 ? 'bg-black dark:bg-white dark:text-black' : 'bg-gray-500 dark:bg-gray-500 dark:bg-opacity:80 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded mt-6`} onClick={() => saveInterests(selected)}>
        Continue
      </button>
      <span className={`text-sm mt-2 ${selected.length > 3 ? 'hidden' : ''} `}>Select <b>{4 - selected.length}</b> more</span>
      <span className={`cursor-pointer text-sm mt-2 ${selected.length > 3 ? '' : 'hidden'} `}>Show more</span>
    </div >
  )
}