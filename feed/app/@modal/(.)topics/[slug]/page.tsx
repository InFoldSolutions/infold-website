
'use client'

import { useState, useEffect } from 'react'

import Modal from '@/components/modal';
import TopicWrapper from '@/components/topic';
import Sentiment from '@/components/sentiment';

import { getTopic } from '@/helpers/api'
import { getRandomInt } from '@/helpers/utils';

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
      {isLoading && <div className='font-mono w-auto text-center p-2 px-3 bg-gray-300 dark:bg-black'>Loading topic ..</div>}
      {!isLoading &&
        <main className='relative overflow-hidden'>
          <div className='w-full max-h-screen font-mono overflow-y-auto overflow-x-hidden no-scrollbar'>
            {data &&
              <div className='p-4 py-12 md:p-8 md:px-12 max-w-[1260px] lg:w-[1260px] lg:px-20 flex items-start'>

                <div className='md:mr-auto w-full md:w-[680px] lg:w-[760px]'>
                  <TopicWrapper data={data} modal={true} />
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
                          <a href={`/?keywords=${keyword.keyword}`}>
                            <span className='font-bold block leading-4 group-hover:underline'>{keyword.keyword}</span>
                            <small>{getRandomInt(1, 100)} Topics</small>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            }
          </div>
        </main>
      }
    </Modal >
  )
}