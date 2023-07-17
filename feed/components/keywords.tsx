
import config from '@/config'

import AnalyzedIcon from '@/components/icon'

export default function Keywords({ item, onKeywordClick }: { item: any, onKeywordClick: any }) {
  return (
    <div className='relative mt-6'>
      <ul className='max-w-screen-2xl flex flex-nowrap gap-x-2 overflow-x-scroll no-scrollbar' onClick={onKeywordClick}>
        {item.keywords.filter(filterKeywords).map((keyword: any, k: number) => (
          <li className='group w-auto flex items-center items-stretch whitespace-nowrap' key={k}>
            <AnalyzedIcon analyzed={keyword.analyzed} keyword={keyword.keyword} />
            <span className='keyword bg-neutral-100 hover:bg-neutral-200 py-1 px-2 cursor-pointer text-base dark:text-white dark:bg-neutral-800 dark:hover:bg-neutral-950' title="Apply filter for keyword">
              {keyword.keyword}
            </span>
          </li>
        ))}
      </ul>
    </div>)
}

// We filter some obvious false positives
function filterKeywords(data: any) {
  if (data.keyword.length < 3)
    return false;

  if (config.keywordsBlacklist.includes(data.keyword.toLowerCase()))
    return false;

  if (data.type === "person") { // check for type person to have at least two full words
    const words = data.keyword.split(" ");

    if (words.length < 2)
      return false;
  }

  return true;
}