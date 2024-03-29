'use client'

import Modal from '@/components/layout/modal'
import StoryWrapper from '@/components/story/story'
import TagsChart from '@/components/story/sidebar/tags_chart'
import Keywords from '@/components/story/sidebar/keywords'
import Related from '@/components/story/sidebar/related'

export default function StoryModalWrapper({ data }: { data: any }) {
  return (
    <Modal>
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

              <div className='h-auto w-[280px] p-5 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
                <h3 className='text-2xl font-bold mb-4'>Related</h3>
                <Related slug={data.slug} />
              </div>

              <div className='h-auto w-[280px] p-5 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col mb-4 rounded'>
                <h3 className='text-2xl font-bold mb-5'>Keywords</h3>
                <Keywords keywordData={data.keywords} defaultSize={5} />
              </div>
            </div>
          </div>
        }
      </main>
    </Modal >
  )
}