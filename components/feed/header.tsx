export default function FeedHeader({ keyword, icon, live }: { keyword: string, icon: string, live: boolean }) {
  return (
    <div className='relative flex py-3 px-4 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-60 items-center z-40'>
      <div
        className='text-xl text-body-color'>

        <i className={`fad ${icon} text-xl mr-4`}></i>

        <span className={`group-hover:underline relative`}>
          {keyword}
        </span>
      </div>

      <div className="flex ml-auto items-center">
        {live &&
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
    </div>
  )
}