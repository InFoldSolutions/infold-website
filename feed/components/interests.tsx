'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react';

export default function Interests({ interests, saveInterests }: { interests: string[], saveInterests: any }) {

  const [selected, setSelected] = useState<string[]>([])

  return (
    <div className='flex items-center flex-col'>
      <h3 className='text-2xl font-bold mt-6 mb-2 flex justify-center'>Select your interests</h3>
      <h4 className='flex justify-center mb-6'>Minimum 4 interests</h4>
      <ul className='flex flex-wrap text-xl justify-center'>
        {interests.map((interest: string, index: number) => (
          <li className={`py-2 px-3 cursor-pointer m-2 ${selected.includes(interest) ? `bg-white dark:bg-white dark:text-black` : `bg-gray-200 dark:bg-gray-600 dark:bg-opacity-40 hover:bg-gray-100 dark:hover:text-black`} `}
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
      <span className={`text-sm mt-2 ${selected.length > 3 ? 'hidden' : ''} `}>Select {4 - selected.length} more</span>
      <span className={`cursor-pointer text-sm mt-2 ${selected.length > 3 ? '' : 'hidden'} `}>Show more</span>
    </div >
  )
}