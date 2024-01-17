import config from "@/config"

const sentimentData = Object.keys(config.sentiment).map((key: string) => {
  // @ts-ignore
  const sentimentItem: any = config.sentiment[key]

  return {
    label: sentimentItem.name,
    textColor: sentimentItem.textColor,
    sentiment: key,
    count: 6
  }
})

export default function SentimentFilter({ sentimentClick }: { sentimentClick: any }) {
  return (
    <div className='mt-6 flex items-center -mb-9'>
      <ul className='flex ml-auto w-auto'>
        {sentimentData.map((option, index) => {
          return (
            <li className='flex items-center mr-2 cursor-pointer border-dashed border-2 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 p-1 px-2 select-none'
              title='Toggle display'
              data-sentiment={option.sentiment}
              onClick={sentimentClick}
              key={index}>
              <span className='flex items-center'>
                <b className={option.textColor}>{option.count}</b>
                <i className={`far ${option.textColor} fa-smile ml-2`}></i>
                <span className='hidden md:inline-block ml-2 text-sm'>{option.label}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}