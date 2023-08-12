import { Metadata } from 'next';

import Link from 'next/link';

import TopicWrapper from '@/components/topic';
import Footer from '@/components/footer';
import Container from '@/components/container';
import Sentiment from '@/components/sentiment';

import { getTopic } from '@/helpers/api'

import { getRandomInt } from '@/helpers/utils';

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
      <div className='flex items-start mt-5'>
        <div className='md:mr-auto w-full max-w-full max-w-[760px] lg:w-[760px]'>
          {!data && <div className='w-auto text-center p-2 px-3'>Loading topic ..</div>}
          {data && <TopicWrapper data={data} />}
          <Footer />
        </div>

        <div className='sticky top-[100px] h-auto hidden lg:flex flex-col'>
          <div className='h-auto w-[280px] pt-4 px-4 bg-gray-200 dark:bg-gray-600 dark:bg-opacity-20 hidden lg:flex flex-col mb-4'>
            <h3 className='text-2xl font-bold'>Sentiment</h3>
            <Sentiment />
          </div>

          <div className='h-auto w-[280px] p-6 bg-gray-200 dark:bg-gray-600 dark:bg-opacity-20 hidden lg:flex flex-col'>
            <ul>
              {data.keywords.length > 0 && data.keywords.slice(0, 6).map((keyword: any, index: number) => (
                <li className='group cursor-pointer pb-2 mb-2 last:pb-0 last:mb-0' key={index}>
                  <Link href={`/?keywords=${keyword.keyword}`}>
                    <span className='font-bold block leading-4 group-hover:underline'>{keyword.keyword}</span>
                    <small>{getRandomInt(1, 100)} Topics</small>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  )
}