'use client'

import { useCallback, useEffect, useRef, useState } from 'react';

import { trackEvent } from '@/helpers/gtm';

import { submitEmail } from '@/apis/infold';

import Modal from '@/components/layout/modal';
import config from '@/config';

export default function Interests({ dispatchDigest }: { dispatchDigest: any }) {

  const [interests] = useState<string[]>(config.interests)
  const [selected, setSelected] = useState<string[]>([])
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const [canContinue, setCanContinue] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [submitMsg, setSubmitMsg] = useState<string>('Enter valid e-mail')

  const emailInput = useRef<HTMLInputElement>(null)

  const onContinueClick = useCallback(async () => {
    if (!canContinue) return
    if (!emailInput.current?.value) return
    
    if (isLoading) return

    setIsLoading(true)
    const res = await submitEmail(emailInput.current?.value, selected)
    setIsLoading(false)

    if (!res) return

    trackEvent({
      action: "interests",
      params: {
        name: 'continue'
      }
    })

    dispatchDigest({
      type: 'add',
      data: {
        email: emailInput.current?.value,
        interests: selected
      }
    })
  }, [selected, emailInput, canContinue])

  const onSkipClick = useCallback(() => {
    trackEvent({
      action: "interests",
      params: {
        name: 'skip'
      }
    })

    dispatchDigest({
      type: 'add',
      data: {
        email: 'skip',
        interests: ['skip']
      }
    })
  }, [])

  const selectInterest = useCallback((interest: string) => {
    if (selected.includes(interest))
      setSelected(selected.filter((item) => item !== interest))
    else
      setSelected([...selected, interest])
  }, [selected])

  const onEmailChange = useCallback(() => {
    setIsValidEmail(emailInput.current?.validity.valid || false)
  }, [emailInput])

  useEffect(() => {
    if (selected.length > 1 && isValidEmail)
      setCanContinue(true)
    else
      setCanContinue(false)

    if (!isValidEmail)
      setSubmitMsg('Enter valid e-mail')
    else if (selected.length < 2)
      setSubmitMsg(`Select ${2 - selected.length} more interest${selected.length < 1 ? 's' : ''}`)
    else
      setSubmitMsg('Subscribe to daily insights')
  }, [selected, isValidEmail])

  return (
    <Modal showClose={false}>
      <div className='max-w-full font-mono bg-white dark:bg-black flex flex-col my-auto p-4 pl-6 md:p-10 max-w-[680px] lg:w-[680px] flex items-start md:rounded-lg'>
        <div className={`w-full`}>
          <h3 className='text-2xl md:text-3xl font-bold mb-3 flex items-center'>
            <i className='fad fa-newspaper mr-4' />
            <span className='hidden md:flex'>Get your daily news digest</span>
            <span className='md:hidden flex'>Daily News Digest</span>
          </h3>
          <h4 className='flex mb-3'>Our AI agents read through 1000+ news sources and send you personalized insights directly to your inbox:</h4>
          <div className='flex flex-col mb-3 w-[95%] md:w-[98%]'>
            <input type='email' placeholder='Enter your email' className='rounded py-2 px-3 border-2 text-xl text-black' ref={emailInput} onChange={onEmailChange} />
          </div>
        </div>
        <h4 className='flex mb-3'>
          Select your interests to help us personalize the agent:
        </h4>
        <div className='flex flex-wrap'>
          {interests.map((interest: string, index: number) => (
            <button className={`rounded py-2 px-3 cursor-pointer mb-2 mr-2 text-xl ${selected.includes(interest) ? `bg-black text-white dark:bg-white dark:text-black` : `bg-gray-200 dark:bg-gray-600 dark:bg-opacity-40 hover:bg-gray-300 dark:hover:text-black`} `}
              onClick={() => selectInterest(interest)}
              key={index}>
              {interest}
            </button>
          ))}
        </div>
        <div className='flex flex-col w-full mt-2 w-[95%] md:w-[98%] border-b-2 dark:border-gray-800 dark:border-opacity-80'></div>
        <div className='mt-3 flex items-center'>
          <button className={`${canContinue ? 'bg-black dark:bg-white dark:text-black' : 'bg-gray-500 dark:bg-gray-500 dark:bg-opacity:80 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded mr-3 flex items-center`}
            onClick={onContinueClick}>
            Continue
            {isLoading && <i className='fad fa-spinner ml-2 animate-spin'></i>}
            {!isLoading && <i className={`fad ${canContinue ? 'fa-check-circle' : 'fa-ban'} ml-2`}></i>}
          </button>
          |
          <button className='ml-3 underline' onClick={onSkipClick}>Skip</button>
        </div>
        <span className={`text-sm mt-2`}>{submitMsg}</span>
      </div>
    </Modal>
  )
}