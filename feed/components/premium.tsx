export default function Premium() {
  return (
    <div className={`h-auto w-[280px] p-5 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 hidden lg:flex flex-col rounded`}>
      <div className='flex items-center justify-center'>
        <i className='fad fa-shield text-3xl mr-4' />
        <p className='text-xl mr-4'>
          InFold Premium
        </p>
      </div>
      <div className='flex items-center justify-center text-sm mt-2'>
        The best InFold experience.
      </div>
      <button className='rounded-md bg-black text-white dark:bg-white dark:text-black p-2 w-full text-center mt-3'>Try Now</button>
    </div>
  )
}