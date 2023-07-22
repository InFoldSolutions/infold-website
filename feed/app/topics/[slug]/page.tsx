import { Metadata } from 'next';

import Timeline from '@/components/timeline';
import Keywords from '@/components/keywords';
import Header from '@/components/header';

import { getTopic } from '@/helpers/api'
import Footer from '@/components/footer';

export async function generateMetadata(
  { params }: { params: any }
): Promise<Metadata> {
  // fetch data
  const data = await getTopic(params.slug);

  return {
    title: data.title,
    description: data.outline.slice(0, 2).join(' ')
  }
}

export default async function Topic({ params }: { params: { slug: string } }) {
  const data = await getTopic(params.slug);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between py-4'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm'>
        <div className='mx-auto md:max-w-[740px] lg:max-w-[780px] px-4'>
          <Header />

          <article>
            <h3 className='mb-4 text-3xl font-bold leading-snug text-left'>
              {data.title}<br />
              <small className='text-sm'>Topic summarized from {data.sources.length} sources.</small>
            </h3>
            <div className='text-left'>
              <ul className='list-inside list-disc'>
                {data.outline.slice(0, 2).map((outline: string, index: number) => (
                  <li className='mb-4' key={index}>
                    {outline}
                  </li>
                ))}
              </ul>
            </div>

            {data.keywords.length > 0 && <Keywords item={data} />}

            <Timeline data={data} />

            <div className='text-left mt-10'>
              <ul className='list-inside list-disc'>
                {data.outline.slice(2).map((outline: string, index: number) => (
                  <li className='mb-4' key={index}>
                    {outline}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <Footer />
        </div>
      </div>
    </main>
  )
}