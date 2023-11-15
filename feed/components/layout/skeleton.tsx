
export default function Skeleton({ number = 9 }: { number?: number }) {
  return (
    <div className="mt-2 ml-1">
      {Array(number).fill(0).map((el, index) => (
        <div key={index} className="py-4 border-gray-200 border-opacity-70 border-b-2 border-dashed dark:border-gray-800 dark:border-opacity-40 rounded last:border-b-0 animate-pulse w-[96.5%]">
          <div className='flex flex-row w-full items-center gap-4 p-2 rounded'>
            <div className='rounded bg-gray-400 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50 w-[180px] h-[108px] hidden md:flex'></div>
            <div className='flex flex-col gap-3 w-full'>
              <span className='w-12/12 bg-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-60 h-4 rounded'></span>
              <span className='w-11/12 bg-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-60 h-4 rounded'></span>
              <span className='w-10/12 bg-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-60 h-4 rounded'></span>

              <div className="flex">
                <span className="w-2/12 bg-gray-400 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50 h-4 rounded"></span>
                <span className="w-2/12 bg-gray-400 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50 h-4 rounded ml-3"></span>
                <span className="w-2/12 bg-gray-400 bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-50 h-4 rounded ml-3"></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}