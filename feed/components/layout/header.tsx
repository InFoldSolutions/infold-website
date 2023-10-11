'use client'

import { useState, useEffect } from 'react';

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {

  let [browserLink, setBrowserLink] = useState("https://chrome.google.com/webstore/detail/infoldai/dfmmanoiegndhgdjendeidcakajifnlb?hl=en") // default

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
        <div className='text-sm mx-auto w-auto flex justify-center hidden md:flex'>navigate the noise</div>
        <div className="w-auto items-center justify-end flex text-sm">
          <ul className="ml-auto w-auto flex">
            <li className="mr-2">
              <a href="https://infold.medium.com/a-lot-of-knowledge-is-a-dangerous-thing-6a4d2560cc83" target="_blank"
                className="h-full text-center flex hover:underline">
                How it works
              </a>
            </li>
            <li className='hidden md:flex'>|</li>
            <li className='hidden md:flex ml-2'>
              <a href={browserLink} target="_blank"
                className="h-full text-center flex hover:underline">
                Extension
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}