
export default function Skeleton({ number = 9 }: { number?: number }) {
  return (
    <div className="mt-4 ml-1">
      {Array(number).fill(0).map((el, index) => (
        <div key={index} className="mb-2">
          <div className='flex flex-row w-full items-center gap-4 p-2 rounded'>
            <div className='rounded bg-gray-400 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50 w-[180px] h-[108px] animate-pulse hidden md:flex'></div>
            <div className='flex flex-col gap-3 w-full'>
              <span className='w-11/12 bg-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-60 h-4 rounded animate-pulse'></span>
              <span className='w-10/12 bg-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-60 h-4 rounded animate-pulse'></span>
              <span className='w-9/12 bg-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-60 h-4 rounded animate-pulse'></span>

              <div className="flex">
                <span className="w-2/12 bg-gray-400 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50 h-4 rounded animate-pulse"></span>
                <span className="w-2/12 bg-gray-400 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50 h-4 rounded animate-pulse ml-3"></span>
                <span className="w-2/12 bg-gray-400 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50 h-4 rounded animate-pulse ml-3"></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}