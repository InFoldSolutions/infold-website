'use client'

import Image from 'next/image'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  return (
    <footer className="flex mt-6 pt-3 border-t-2 border-dashed border-white dark:border-neutral-600">
      <div className="relative w-full flex items-center justify-between flex">
        <div className='w-auto flex items-center'>
          <a href="/" className="flex items-center w-full mr-2">
            <Image src="/assets/images/logo-infold-black.png" alt="InFold - logo" width={25} height={25} className='rounded mr-2' />
            <span className='text-sm'>InFold</span>
          </a>
          {pathname !== '/privacy' &&
            <div className='text-sm -mt-[1px]'>
              <span >|</span>
              <Link href='/privacy' className='ml-2 hover:underline'>Privacy</Link>
            </div>
          }
        </div>
        <div className="w-auto items-center justify-end flex">
          <nav className='text-sm'>
            <ul className="ml-auto w-auto flex">
              <li className="mr-3">
                <a href="https://www.patreon.com/infold/" target="_blank"
                  className="h-full text-center flex items-center">
                  <Image src="/assets/images/patreon.png" width="19" height="19" alt='InFold on Patreon' className='mr-1' />
                  <span className='hidden md:inline-block'>Patreon</span>
                </a>
              </li>
              <li className="mr-3">
                <a href="https://www.twitter.com/infoldai/" target="_blank"
                  className="h-full text-center flex items-center">
                  <Image src="/assets/images/twitter.svg" width="19" height="19" alt="Follow InFold on Twitter" className='mr-1' />
                  <span className='hidden md:inline-block'>Follow us</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}