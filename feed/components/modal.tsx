'use client'

import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'

export default function Modal({ children, isLoading }: { children: React.ReactNode, isLoading: boolean }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current)
        if (onDismiss) onDismiss()
    },
    [onDismiss, overlay, wrapper]
  )

  const onCloseClick: MouseEventHandler = useCallback(
    () => {
      if (onDismiss) onDismiss()
    },
    [onDismiss]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className='fixed z-[999] left-0 right-0 top-0 bottom-0 mx-auto bg-black bg-opacity-80 overflow-y-scroll flex justify-center'
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className='md:mx-auto w-auto max-w-full min-h-full h-fit lg:max-w-[1160px] flex justify-center lg:w-[1160px]'
      >
        {!isLoading &&
          <div className='fixed top-4 md:top-7 right-7 md:right-7 p-1 w-8 md:w-10 z-20 cursor-pointer bg-gray-100' onClick={onCloseClick}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <g>
                <path
                  d='M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z'
                  className='fill-neutral-800' />
              </g>
            </svg>
          </div>
        }

        {children}
      </div>
    </div>
  )
}