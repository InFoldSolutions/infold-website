import { Metadata } from 'next';


import TopicWrapper from '@/components/topic';
import Footer from '@/components/footer';
import Container from '@/components/container';
import Sentiment from '@/components/sentiment';

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
    <Container>
      <div className='flex items-start mt-5'>
        <div className='md:mr-auto w-full max-w-full max-w-[680px] lg:w-[680px]'>
          <TopicWrapper data={data} />
          <Footer />
        </div>

        <div className='h-auto w-[270px] pt-4 px-4 bg-gray-200 dark:bg-gray-600 dark:bg-opacity-20 hidden lg:flex flex-col'>
          <h3 className='text-2xl font-bold'>Sentiment</h3>
          <Sentiment />
        </div>
      </div>
    </Container>
  )
}