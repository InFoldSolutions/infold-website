import { Metadata } from 'next';
import Wrapper from '@/components/layout/wrapper'

import { getKeywordFeed, getTopKeywords } from '@/helpers/api'
import { unSlugifyKeyword } from '@/helpers/utils';

export async function generateMetadata(
  { params }: { params: { keyword: string } }
): Promise<Metadata> {

  const keyword = unSlugifyKeyword(params.keyword)

  return {
    title: `${keyword} Latest News, Stories, Videos | InFold`,
    description: `Get latest news, stories, and articles about ${keyword} all in one place.`
  }
}

export default async function Keyword({ params }: { params: { keyword: string } }) {
  let res: any = null
  
  const keyword = unSlugifyKeyword(params.keyword)

  if (keyword)
    res = await getKeywordFeed(keyword)

  const topKeywords = await getTopKeywords('month')
  const totalResults = res?.meta?.total_results || 0

  return (
    <Wrapper initialFeedData={res?.data} topKeywords={topKeywords} totalResults={totalResults} />
  )
}