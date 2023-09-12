import Link from 'next/link'

import Keyword from '@/components/keyword';

export default function TrendingKeyword({ keyword }: { keyword: any }) {
  return (
    <li className='pb-2 mb-3 last:pb-0 last:mb-0 flex items-center group/item'>
      <div className='mr-2'>
        <Keyword keyword={keyword.keyword} analyzed={keyword.analyzed} iconOnly={true} />
      </div>

      <Link href={`/?keywords=${keyword.keyword}`} prefetch={false} className='group/link' target='_blank'>
        <span>
          <span className='font-bold block leading-4 group-hover/link:underline'>{keyword.keyword}</span>
          <span className='flex text-xs'>
            {keyword.topics || 4} Topics
          </span>
        </span>
      </Link>

      <div className='ml-auto cursor-pointer transition text-blue-500 opacity-30 group-hover/item:opacity-100 flex items-center group/follow'
        title='Follow keyword'>
        <span className='opacity-50 border-2 border-transparent group-hover/follow:opacity-100 group-hover/follow:border-blue-500 rounded-md'>
          <i className='fad fa-layer-plus p-1' />
        </span>
      </div>
    </li>
  )
}