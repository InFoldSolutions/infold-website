import Link from 'next/link'

import Keyword from '@/components/keyword';
import { getRandomInt } from '@/helpers/utils';

export default function TrendingKeyword({ keyword }: { keyword: any }) {
  return (
    <li className='pb-2 mb-2 last:pb-0 last:mb-0 flex'>
      <Link href={`/?keywords=${keyword.keyword}`} prefetch={false} className='group' target='_blank'>
        <span>
          <span className='font-bold block leading-4 group-hover:underline'>{keyword.keyword}</span>
          <small>{getRandomInt(1, 100)} Topics</small>
        </span>
      </Link>

      <div className='ml-auto'>
        <Keyword keyword={keyword.keyword} analyzed={keyword.analyzed} iconOnly={true} />
      </div>
    </li>
  )
}