import { FeedMeta } from '@/types/feedmeta'

export default function FeedHeader({ meta }: { meta: FeedMeta }) {
  return (
    <div className='relative flex py-3 px-4 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-60 border-b-2 border-gray-200 dark:border-gray-800 items-center z-40'>
      <div
        className='text-xl text-body-color flex items-center'>

        <i className={`${meta.icon} ${meta.iconColor} text-xl mr-4`}></i>

        <span className={`group-hover:underline relative`}>
          {meta.keyword}
        </span>
      </div>

      <div className="flex ml-auto items-center">
        {meta.live &&
          <div className="mr-4 text-red-400 flex items-center">
            <span className="flex relative h-3 w-3 mr-2 rounded-full">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Live
          </div>
        }

        <i className='fad fa-sliders-h cursor-pointer' />
      </div>

      <i className='hidden w-0 h-0 overflow-hidden absolute top-0 right-0 text-white text-orange-500 text-yellow-600 text-blue-400 text-gray-400 text-green-400' />
    </div>
  )
}