'use client'

import { useCallback, useRef, useContext, useState } from 'react'

import Image from 'next/image'

import { AuthContext } from '@/context/auth'

import { signInWithLink, signInWithGoogle, signInWithTwitter } from '@/firebase/signIn'

import { isValidEmail } from '@/helpers/utils'

import Tooltip from '@/components/helpers/tooltip'
import { trackEvent } from '@/helpers/analytics'

export default function Premium({ isSelectScreen }: { isSelectScreen: boolean }) {

  const [login, setLogin] = useState(false)

  const emailRef = useRef(null)
  const { user } = useContext(AuthContext)

  const onKeyDown = useCallback((e: any) => {
    // @ts-ignore
    const emailValue = emailRef?.current?.value

    if (isValidEmail(emailValue) && e.key === 'Enter') {
      signInWithLink(emailValue)

      if (emailRef.current) {
        // @ts-ignore
        emailRef.current.value = ''
      }
    } else if (e.key === 'Enter')
      alert('Please enter a valid email address')
  }, [])

  const tryNowClick = useCallback(() => {
    trackEvent({
      action: "premium",
      params: {
        name: 'trynow'
      }
    })

    setLogin(true)
  }, [setLogin])

  return (
    <div className={`h-auto w-[280px] px-4 py-5 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col rounded ${isSelectScreen ? 'lg:hidden' : ''} `}>
      <div className='flex items-center justify-center'>
        <i className='fad fa-fingerprint text-3xl mr-4' />
        <p className='text-xl mr-4'>
          InFold Premium
        </p>
      </div>

      {!login &&
        <div>
          <div className='flex items-center justify-center text-sm mt-2 text-gray-600 dark:text-gray-400'>
            The best InFold experience.
          </div>

          <button className='rounded-md bg-black text-white dark:bg-white dark:text-black p-2 w-full text-center mt-3' onClick={() => tryNowClick()}>Try Now</button>
        </div>
      }

      {login &&
        <div className="flex flex-col items-center justify-center mt-1">
          <div className='text-sm mt-1 mb-3 text-gray-600 dark:text-gray-400 flex items-center'>
            <span className='group/nav cursor-pointer flex' onClick={() => setLogin(false)}>
              <i className='fad fa-long-arrow-alt-left mr-1 mt-px' />
            </span>
            <span className='pl-2 ml-1 border-gray-100 border-l-2 border-dashed dark:border-gray-800 dark:border-opacity-80'>
              Login to continue.
            </span>
          </div>
          <div className="flex w-full items-stretch">
            <Tooltip message={`Login with link`} top={12} left={4} padding={1}>
              <span className='shrink w-40 bg-gray-100 dark:bg-black rounded'>
                <input type="email" ref={emailRef} placeholder='Enter e-mail ..' className='bg-transparent hover:outline outline-2 outline-neutral-950 bg-gray-100 py-2 px-3 w-full h-full text-sm rounded' onKeyDown={onKeyDown} />
              </span>
            </Tooltip>
            <Tooltip message={`Google`} top={12} right={1} padding={1}>
              <span className='shrink-0 h-10 w-10 p-2 bg-gray-100 dark:bg-black ml-1 flex items-center justify-center cursor-pointer rounded hover:outline outline-2 outline-neutral-950' onClick={() => signInWithGoogle()}>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png" alt="Google" width={80} height={80} className='w-full h-auto' />
              </span>
            </Tooltip>
            <Tooltip message={`X.com`} top={12} right={1} padding={1}>
              <span className='shrink-0 h-10 w-10 p-2 bg-gray-100 dark:bg-black ml-1 flex items-center justify-center cursor-pointer rounded hover:outline outline-2 outline-neutral-950' onClick={() => signInWithTwitter()}>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-full h-auto fill-black dark:fill-white">
                  <g>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </g>
                </svg>
              </span>
            </Tooltip>
          </div>
        </div>
      }
    </div>
  )
}