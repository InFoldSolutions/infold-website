import { Metadata } from 'next';

import Footer from '@/components/layout/footer';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'InFold - Privacy policy',
    description: 'Our privacy policy'
  }
}

export default async function Privacy() {
  return (
    <main className='relative overflow-hidden'>
      <div className='w-full max-h-screen font-mono overflow-y-auto overflow-x-hidden no-scrollbar'>
        <div className='mx-auto md:max-w-[740px] lg:max-w-[780px] px-4 pb-4 mt-8 md:mt-16'>
          <h1 className='mb-8 text-3xl font-bold leading-snug sm:text-4xl sm:leading-snug md:text-[45px] md:leading-snug'>
            Privacy Policy
          </h1>
          <p
            className='mx-auto mb-10 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
            Last updated: 28th June 2023
          </p>
          <h2 className='text-2xl mb-2 font-bold'>Personal data</h2>
          <p
            className='mx-auto mb-10 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
            InFold may collect browser version, platform name and display settings. This information is
            needed
            for decision on implementing new features, removing unused features or suggesting default settings for new
            users. It will happen only with your permission.
          </p>
          <h2 className='text-2xl mb-2 font-bold'>Third party services</h2>
          <p
            className='mx-auto mb-10 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
            InFold extension uses Chromium or WebExtensions Storage Sync API for storing user&apos;s settings.
          </p>
          <p
            className='mx-auto mb-10 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
            Donations are processed by Patreon and payment processors chosen by that organization.
          </p>
          <h2 className='text-2xl mb-2 font-bold'>Analytics</h2>
          <p
            className='mx-auto mb-10 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
            InFold uses analytics services, like Google Analytics, to aggregate information about traffic patterns
            and how our website and extension are used, for the sole purpose of improving our extension and website.
          </p>
          <h2 className='text-2xl mb-2 font-bold'>Changes and updates to this policy</h2>
          <p
            className='mx-auto mb-10 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
            InFold reserves the right to change this policy for any reason, and may make small, inconsequential
            changes to this policy with or without notice. Each time this policy is changed we will revise the
            &quot;Effective Date&quot; at the top of this page.
          </p>
          <h2 className='text-2xl mb-2 font-bold'>Contact</h2>
          <p
            className='mx-auto mb-10 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color'>
            You can always contact us with questions or feedback about our privacy policy, or anything else, at
            <a href='mailto:contact@infold.ai' className='text-underline ml-2' title='E-mail us'>contact@infold.ai</a>.
          </p>

          <Footer />
        </div>
      </div>
    </main>
  )
}