import { Metadata } from 'next';
import Wrapper from '@/components/layout/wrapper'

import { getKeywordFeed, getTopKeywords } from '@/helpers/api'
import { unSlugifyKeyword } from '@/helpers/utils';

export async function generateMetadata(
  { params }: { params: { section: string } }
): Promise<Metadata> {

  const section = unSlugifyKeyword(params.section)

  return {
    title: `${section} Latest News, Stories, Videos | InFold`,
    description: `Get latest news, stories, and articles about ${section} all in one place.`
  }
}

export default async function Section({ params }: { params: { section: string } }) {
  let res: any = null
  
  const keyword = unSlugifyKeyword(params.section)

  if (keyword)
    res = await getKeywordFeed(keyword)

  const topKeywords = await getTopKeywords('month')
  const totalResults = res?.meta?.total_results || 0

  return (
    <Wrapper initialFeedData={res?.data} topKeywords={topKeywords} totalResults={totalResults} />
  )
}