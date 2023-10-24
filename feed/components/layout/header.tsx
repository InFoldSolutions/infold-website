'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {

  const [browserLink, setBrowserLink] = useState("https://chrome.google.com/webstore/detail/infoldai/dfmmanoiegndhgdjendeidcakajifnlb?hl=en") // default
  const pathname = usePathname()

  useEffect(() => {
    const isFirefox = navigator?.userAgent.match(/firefox|fxios/i);

    if (isFirefox)
      setBrowserLink("https://addons.mozilla.org/en-US/firefox/addon/infold/");
  }, [])

  return (
    <header className="border-b-2 border-dashed bg-gray-300 dark:bg-black dark:border-gray-800 dark:border-opacity-80 pt-6 pb-4 px-2 pl-1">
      <div className="relative w-full flex items-center justify-between flex">
        <div className='w-auto'>
          <Link href={`/`} prefetch={false} className="navbar-logo flex items-center w-full">
            <Image src="/assets/images/logo-infold-black.png" alt="InFold - logo" width={42} height={42} className="rounded mr-3 dark:-ml-1" />
            <span className='text-2xl'>InFold</span>
          </Link>
        </div>
        <div className="w-auto items-center justify-end flex text-sm">
          <ul className="ml-auto w-auto flex">
            <li className='hidden md:flex mr-2'>
              <Link href='/about' target="_self"
                title='About InFold'
                className={`h-full text-center items-center flex group items-center`}>
                <i className='fad fa-question mr-2' />
                <span className={`group-hover:underline ${pathname === '/about' ? 'underline' : ''}`}>
                  About
                </span>
              </Link>
            </li>
            <li className='hidden md:flex mr-2'>|</li>
            <li className='hidden md:flex mr-2'>
              <a href={browserLink} target="_blank"
                title='Download our Browser Extension'
                className="h-full text-center items-center flex group items-center">
                <i className='fad fa-sliders-h mr-2' />
                <span className='group-hover:underline'>
                  Extension
                </span>
              </a>
            </li>
            <li className='hidden md:flex mr-2'>|</li>
            <li>
              <a href="https://infold.medium.com/a-lot-of-knowledge-is-a-dangerous-thing-6a4d2560cc83" target="_blank"
                title='Read an article on Medium'
                className="h-full text-center flex group items-center">
                <i className='fad fa-book mr-2 text-base' />
                <span className='group-hover:underline'>
                  How it works
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}