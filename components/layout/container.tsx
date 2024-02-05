import { ReactNode } from 'react';

import Header from '@/components/layout/header';

export default function Container({ children, header = true }: { children: ReactNode, header: boolean }) {
  return (
    <div className='relative md:mx-auto h-full w-full max-w-full font-mono lg:max-w-[1212px] lg:w-[1212px] px-4'>
      {header && <Header />}

      {children}
    </div>
  )
}