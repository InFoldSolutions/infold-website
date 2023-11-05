import config from '@/config'

import { Metadata } from 'next';
import { notFound } from 'next/navigation'

import StoryWrapper from '@/components/story/story'
import Container from '@/components/layout/container'
import TagsChart from '@/components/sidebar/tags_chart'
import Keywords from '@/components/sidebar/keywords'
import Related from '@/components/sidebar/related'

import { getTopic, getTopicThumbUrl, handleRedirect } from '@/helpers/api'

export async function generateMetadata(
  { params }: { params: any }
): Promise<Metadata> {
  // fetch data
  const data = await getTopic(params.slug);

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
    <Container>
      <div className='flex items-start mt-4'>
        <div className='md:mr-auto w-full max-w-full lg:w-[860px]'>
          <StoryWrapper data={data} />
        </div>

        <div className='sticky top-4 h-auto hidden lg:flex flex-col'>
          {data.sentimentAgg &&
            <div className='h-auto w-[280px] p-5 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
              <h3 className='text-2xl font-bold mb-2'>Sentiment</h3>
              <TagsChart aggregation={data.sentimentAgg} />
            </div>
          }

          <div className='h-auto w-[280px] p-5 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
            <h3 className='text-2xl font-bold mb-4'>Related</h3>
            <Related slug={data.slug} />
          </div>

          <div className='h-auto w-[280px] p-5 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
            <h3 className='text-2xl font-bold mb-5'>Keywords</h3>
            <Keywords keywordData={data.keywords} />
          </div>
        </div>
      </div>
    </Container>
  )
}