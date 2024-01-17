import config from '@/config'

import { Metadata } from 'next';
import { notFound } from 'next/navigation'

import StoryWrapper from '@/components/story/story'
import Container from '@/components/layout/container'
import { TrendsChart } from '@/components/story/sidebar/trends'
import { Keywords } from '@/components/story/sidebar/keywords'
import { Related } from '@/components/story/sidebar/related'

import { getTopic, getTopicThumbUrl, handleRedirect } from '@/apis/infold'

import { Topic } from '@/types/topic';

export async function generateMetadata(
  { params }: { params: any }
): Promise<Metadata> {
  // fetch data
  const data: Topic | null = await getTopic(params.slug);

  if (!data || !data.slug)
    return notFound()

  return {
    title: `${data.short_title} | InFold`,
    description: data.short_description,
    openGraph: {
      title: `${data.short_title} | InFold`,
      description: data.short_description,
      images: [
        {
          url: getTopicThumbUrl(params.slug),
          width: config.story.thumb.width,
          height: config.story.thumb.height,
          alt: data.short_title,
        },
      ],
    },
    alternates: {
      canonical: `${config.www.root}/story/${params.slug}`,
    }
  }
}

export default async function Topic({ params, searchParams }: { params: { slug: string }, searchParams: any }) {
  const data = await getTopic(params.slug)

  if (!data || !data.slug)
    return notFound()
  if (data.slug !== params.slug)
    return handleRedirect(data.slug, searchParams)

  return (
    <Container header={true}>
      <div className='flex items-start mt-4 md:mx-auto'>
        <div className='w-full max-w-full mr-10 md:max-w-[860px]'>
          <StoryWrapper data={data} />
        </div>

        <div className='sticky top-4 h-auto hidden lg:flex flex-col'>
          {data.sentimentAgg &&
            <div className='h-auto w-[280px] p-5 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
              <h3 className='text-2xl font-bold mb-4'>Trends</h3>
              <TrendsChart />
            </div>
          }

          <div className='h-auto w-[280px] p-5 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
            <h3 className='text-2xl font-bold mb-4'>Related</h3>
            <Related slug={data.slug} />
          </div>

          <div className='h-auto w-[280px] p-5 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
            <h3 className='text-2xl font-bold mb-5'>Keywords</h3>
            <Keywords keywordData={data.keywords} />
          </div>
        </div>
      </div>
    </Container>
  )
}