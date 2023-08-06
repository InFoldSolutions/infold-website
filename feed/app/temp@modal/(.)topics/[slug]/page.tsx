
'use client'

import { useState, useEffect } from 'react'

import Modal from '@/components/modal';
import TopicWrapper from '@/components/topic';

import { getTopic } from '@/helpers/api'

export default function TopicModal({ params }: { params: { slug: string } }) {

  let [isLoading, setIsLoading] = useState(true);
  let [data, setData] = useState(null);

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
            <div className='md:mx-auto max-w-[820px] lg:w-[820px] p-4 py-12 md:p-8 md:px-12 lg:px-16'>
              {data &&
                <TopicWrapper data={data} modal={true} />
              }
            </div>
          </div>
        </main>
      }
    </Modal>
  )
}