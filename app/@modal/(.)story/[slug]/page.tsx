

import Modal from '@/components/layout/modal'
import StoryWrapper from '@/components/story/story'
import { TrendsChart } from '@/components/story/sidebar/trends'
import { Keywords } from '@/components/story/sidebar/keywords'
import { Related } from '@/components/story/sidebar/related'

import { getTopic } from '@/apis/infold'

export default async function StoryModal({ params }: { params: { slug: string } }) {

  const data = await getTopic(params.slug);

  return (
    <Modal>
      <main className='max-w-full font-mono bg-white dark:bg-black'>
        {data &&
          <div className='p-4 md:p-8 md:px-12 max-w-[1355px] lg:w-[1355px] lg:px-20 flex items-start'>

            <div className='md:mr-auto w-full lg:w-[860px]'>
              <StoryWrapper data={data} modal={true} />
            </div>

            <div className='sticky top-[32px] h-auto hidden lg:flex flex-col'>
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
                <Keywords keywordData={data.keywords} defaultSize={5} />
              </div>
            </div>
          </div>
        }
      </main>
    </Modal >
  )
}