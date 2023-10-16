import { Metadata } from 'next';
import { permanentRedirect, notFound } from 'next/navigation'

import StoryWrapper from '@/components/story/story'
import Container from '@/components/layout/container'
import TagsChart from '@/components/sidebar/tags_chart'
import Keywords from '@/components/sidebar/keywords'
import Premium from '@/components/sidebar/premium'

import { getTopic, getTopicAffiliate, getTopicThumbUrl } from '@/helpers/api'
import config from '@/config';

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
    }
  }
}

export default async function Topic({ params }: { params: { slug: string } }) {
  const data = await getTopic(params.slug)

  if (!data || !data.slug)
    return notFound()
  if (data.slug !== params.slug)
    return permanentRedirect(`/story/${data.slug}`)

  const affiliate = await getTopicAffiliate(params.slug)

  return (
    <Container>
      <div className='flex items-start mt-4'>
        <div className='md:mr-auto w-full max-w-full lg:w-[860px]'>
          {!data && <div className='w-auto text-center p-2 px-3'>Loading topic ..</div>}
          {data && <StoryWrapper data={data} affiliate={affiliate} />}
        </div>

        <div className='sticky top-4 h-auto hidden lg:flex flex-col'>
          {data.sentimentAgg &&
            <div className='h-auto w-[280px] p-5 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
              <h3 className='text-2xl font-bold mb-2'>Sentiment</h3>
              <TagsChart aggregation={data.sentimentAgg} />
            </div>
          }

          {data.politicsAgg &&
            <div className='h-auto w-[280px] p-5 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
              <h3 className='text-2xl font-bold mb-2'>Politics</h3>
              <TagsChart aggregation={data.politicsAgg} />
            </div>
          }

          <div className='h-auto w-[280px] p-5 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
            <h3 className='text-2xl font-bold mb-5'>Keywords</h3>
            <Keywords keywords={data.keywords} />
          </div>

          <Premium isSelectScreen={false} />
        </div>
      </div>
    </Container>
  )
}