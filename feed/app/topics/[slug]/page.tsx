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
    <main className='relative overflow-hidden'>
      <div className='w-full max-h-screen font-mono overflow-y-auto overflow-x-hidden no-scrollbar'>
        <div className='mx-auto md:max-w-[740px] lg:max-w-[780px] px-4'>
          <Header />

          <article>
            <h3 className='mb-4 text-2xl font-bold'>
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
            
            <h3 className='text-2xl font-bold text-left'>Timeline</h3>
            <Timeline data={data} />

            {data.keywords.length > 0 && <div className='mt-6'>
              <h3 className='mb-4 text-2xl font-bold'>Relevant Keywords</h3>
              <Keywords item={data} />
            </div>}

            <div className='mt-6'>
              <h3 className='mb-4 text-2xl font-bold'>Detailed summary</h3>
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