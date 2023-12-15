import { Metadata } from 'next';

import Footer from '@/components/layout/footer';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'InFold - Contact',
    description: 'Contact us'
  }
}

export default async function Privacy() {
  return (
    <main className='relative overflow-hidden'>
      <div className='w-full max-h-screen font-mono overflow-y-auto overflow-x-hidden no-scrollbar'>
        <div className='mx-auto md:max-w-[740px] lg:max-w-[780px] px-4 pb-4 mt-8 md:mt-16'>          
          <h2 className='text-2xl mb-2 font-bold'>Contact</h2>
          <p
            className='mx-auto mb-10 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
            You can always contact us with questions or feedback at
            <a href='mailto:contact@infold.ai' className='text-underline ml-2' title='E-mail us'>contact@infold.ai</a>.
          </p>
        </div>
      </div>
    </main>
  )
}