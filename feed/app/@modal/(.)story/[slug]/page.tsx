
'use client'

import { useState, useEffect } from 'react'

import Modal from '@/components/modal'
import StoryWrapper from '@/components/story'
import TagsChart from '@/components/tags_chart'
import Spinner from '@/components/spinner'
import Keywords from '@/components/keywords'
import Premium from '@/components/premium'

import { getTopic } from '@/helpers/api'

export default function StoryModal({ params }: { params: { slug: string } }) {

  let [isLoading, setIsLoading] = useState(true);
  let [data, setData] = useState<any>(null);


  useEffect(() => {
    const fetchStoryData = async () => {
      const story = await getTopic(params.slug);

      if (story)
        setData(story);

      setIsLoading(false);
    }

    fetchStoryData()
      .catch(console.error)
  }, [params.slug]);

  return (
    <Modal isLoading={isLoading}>
      {isLoading &&
        <div className='flex relative top-[50vh] -mt-6 h-12 items-center justify-center font-mono w-auto px-6 bg-gray-300 dark:bg-black border-2 border-black border-dashed dark:border-gray-400 dark:text-gray-400'>
          <Spinner />
          Loading story ..
        </div>
      }

      {!isLoading &&
        <main className='max-w-full font-mono bg-gray-300 dark:bg-black'>
          {data &&
            <div className='p-4 md:p-8 md:px-12 max-w-[1355px] lg:w-[1355px] lg:px-20 flex items-start'>

              <div className='md:mr-auto w-full lg:w-[860px]'>
                <StoryWrapper data={data} modal={true} />
              </div>

              <div className='sticky top-[32px] h-auto hidden lg:flex flex-col'>
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
          }
        </main>
      }
    </Modal >
  )
}