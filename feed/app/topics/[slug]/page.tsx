import { Metadata } from 'next';

import Header from '@/components/header';
import TopicWrapper from '@/components/topic';
import Footer from '@/components/footer';

import { getTopic } from '@/helpers/api'

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
  console.log('Topic: params', params)
  
  const data = await getTopic(params.slug);

  return (
    <main className='relative overflow-hidden'>
      <div className='w-full max-h-screen font-mono overflow-y-auto overflow-x-hidden no-scrollbar'>
        <div className='mx-auto md:max-w-[740px] lg:max-w-[780px] px-4'>
          <Header />

          <TopicWrapper data={data} />

          <Footer />
        </div>
      </div>
    </main>
  )
}