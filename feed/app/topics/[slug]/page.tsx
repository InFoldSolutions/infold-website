import { Metadata } from 'next';

import TopicWrapper from '@/components/topic'
import Container from '@/components/container'
import TagsChart from '@/components/tags_chart'

import { getTopic } from '@/helpers/api'
import TopicKeywords from '@/components/topic_keywords';

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
    <Container>
      <div className='flex items-start mt-6'>
        <div className='md:mr-auto w-full max-w-full max-w-[860px] lg:w-[860px]'>
          {!data && <div className='w-auto text-center p-2 px-3'>Loading topic ..</div>}
          {data && <TopicWrapper data={data} />}
        </div>

        <div className='sticky top-4 h-auto hidden lg:flex flex-col'>
          <div className='h-auto w-[280px] p-6 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
            <h3 className='text-2xl font-bold mb-2'>Sentiment</h3>
            <TagsChart aggregation={data.sentimentAgg} />
          </div>

          {data.politicsAgg &&
            <div className='h-auto w-[280px] p-6 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
              <h3 className='text-2xl font-bold mb-2'>Politics</h3>
              <TagsChart aggregation={data.politicsAgg} />
            </div>
          }

          <div className='h-auto w-[280px] p-6 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col rounded'>
            <TopicKeywords data={data} />
          </div>
        </div>
      </div>
    </Container>
  )
}