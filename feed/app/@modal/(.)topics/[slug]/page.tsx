
'use client'

import { useState, useEffect } from 'react'

import Modal from '@/components/modal'
import TopicWrapper from '@/components/topic'
import TagsChart from '@/components/tags_chart'
import Spinner from '@/components/spinner'
import TopicKeywords from '@/components/topic_keywords'

import { getTopic } from '@/helpers/api'

export default function TopicModal({ params }: { params: { slug: string } }) {

  let [isLoading, setIsLoading] = useState(true);
  let [data, setData] = useState<any>(null);


  useEffect(() => {
    const fetchTopicData = async () => {
      const topic = await getTopic(params.slug);

      if (topic)
        setData(topic);

      setIsLoading(false);
    }

    fetchTopicData()
      .catch(console.error)
  }, [params.slug]);

  return (
    <Modal isLoading={isLoading}>
      {isLoading &&
        <div className='flex relative top-[50vh] -mt-6 h-12 items-center justify-center font-mono w-auto px-6 bg-gray-300 dark:bg-black border-2 border-black border-dashed dark:border-gray-400 dark:text-gray-400'>
          <Spinner />
          Loading topic ..
        </div>
      }

      {!isLoading &&
        <main className='max-w-full font-mono bg-gray-300 dark:bg-black'>
          {data &&
            <div className='p-4 md:p-8 md:px-12 max-w-[1355px] lg:w-[1355px] lg:px-20 flex items-start'>

              <div className='md:mr-auto w-full lg:w-[860px]'>
                <TopicWrapper data={data} modal={true} />
              </div>

              <div className='sticky top-[32px] h-auto hidden lg:flex flex-col'>
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
          }
        </main>
      }
    </Modal >
  )
}