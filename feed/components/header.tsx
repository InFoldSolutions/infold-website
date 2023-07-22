'use client'

import Image from 'next/image'

export default function Header() {

  let browserLink = "https://chrome.google.com/webstore/detail/infoldai/dfmmanoiegndhgdjendeidcakajifnlb?hl=en";

  if (navigator.userAgent.match(/firefox|fxios/i))
    browserLink = "https://addons.mozilla.org/en-US/firefox/addon/infold/";

  return (
    <header className="flex my-5 py-5 mb-8 border-b-2 border-dashed border-white dark:border-neutral-600">
      <div className="relative w-full flex items-center justify-between flex">
        <div className='w-auto'>
          <a href="/" className="navbar-logo flex items-center w-full">
            <Image src="/assets/images/logo-infold-black.png" alt="InFold - logo" width={45} height={45} className="mr-2" />
            <span className='text-2xl'>InFold</span>
          </a>
        </div>
        <div className='text-sm mx-auto w-auto flex justify-center'>we aggregate news</div>
        <div className="w-auto items-center justify-end flex">
          <button className="absolute right-4 top-1/2 block -translate-y-1/2 px-3 py-[6px] ring-primary focus:ring-2 lg:hidden">
            <span className="relative my-[6px] block h-[2px] w-[30px]"></span>
            <span className="relative my-[6px] block h-[2px] w-[30px]"></span>
            <span className="relative my-[6px] block h-[2px] w-[30px]"></span>
          </button>
          <nav>
            <ul className="ml-auto w-auto flex">
              <li className="mr-2">
                <a href="https://infold.medium.com/a-lot-of-knowledge-is-a-dangerous-thing-6a4d2560cc83" target="_blank"
                  className="h-full text-center flex hover:underline">
                  How it works
                </a>
              </li>
              <li>|</li>
              <li className='ml-2'>
                <a href={browserLink} target="_blank"
                  className="h-full text-center flex hover:underline">
                  Extension
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}