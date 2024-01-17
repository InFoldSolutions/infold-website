'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { slugifyKeyword, unSlugifyKeyword } from '@/helpers/utils';

export default function Keyword({ keyword }: { keyword: any, interests: string[], toggleInterest: any }) {
  const pathname = usePathname()
  const pathnameParts = pathname.split('/')
  const paramKeyword = pathnameParts[2] ? unSlugifyKeyword(pathnameParts[2]) : null
  const target = '_self'

  let latestAnalyzed = null, icon, label, url, padding;

  if (keyword.analyzed)
    latestAnalyzed = keyword.analyzed.find((item: any) => item.url);

  if (latestAnalyzed && latestAnalyzed.url) {
    url = latestAnalyzed.url;

    if (latestAnalyzed.source === "investopedia.com") {
      icon = "data:image/png;base64,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";
      label = "Investopedia";
      padding = 'p-0';
    } else {
      icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Wikipedia%27s_W.svg/1024px-Wikipedia%27s_W.svg.png";
      label = "Wikipedia";
      padding = 'p-px';
    }
  } else {
    url = `https://www.google.com/search?q=${keyword.keyword}`;
    icon = "https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png";
    label = "Google";
    padding = 'p-0.5';
  }

  return (
    <li className='pb-2 mb-2 last:pb-0 last:mb-0 flex items-center group/item'>
      <div className='mr-2'>
        <Link
          href={url}
          title={`Lookup on ${label}`}
          target='_blank'
          prefetch={false}
          className='group/image'>
          <span className='group-hover/image:border-gray-400 border-2 bg-white dark:border-gray-600 dark:bg-gray-200 opacity:60 group-hover/image:dark:border-gray-200 p-px flex items-center justify-center h-8 w-8 rounded relative'>
            <Image unoptimized src={icon} alt={label} fill={true} className={`h-8 w-8 rounded ${padding}`} />
          </span>
        </Link>
      </div>

      <Link href={`/keyword/${slugifyKeyword(keyword.keyword)}`} prefetch={false} className='group/link w-full' target={target}>
        <span>
          <span className={`font-bold block leading-4 group-hover/link:underline ${paramKeyword && paramKeyword === keyword.keyword ? 'underline' : ''}`}>{keyword.keyword}</span>
          <span className='flex text-xs'>
            {keyword.topics || 4} Topics
          </span>
        </span>
      </Link>
    </li>
  )
}