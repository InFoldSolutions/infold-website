
export default function Skeleton({ number = 9 }: { number?: number }) {
  return (
    <div className="mt-4">
      {Array(number).fill(0).map((el, index) => (
        <div key={index} className="mb-2">
          <div className='flex flex-row w-full items-center gap-3 p-2 rounded'>
            <div className='rounded bg-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-60 w-[180px] h-[100px] animate-pulse hidden md:flex'></div>
            <div className='flex flex-col gap-2 w-full'>
              <span className='w-11/12 bg-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-60 h-4 rounded-full animate-pulse'></span>
              <span className='w-10/12 bg-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-60 h-4 rounded-full animate-pulse'></span>
              <span className='w-9/12 bg-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-60 h-4 rounded-full animate-pulse'></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}