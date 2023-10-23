import { Metadata } from 'next';
import Wrapper from '@/components/layout/wrapper'

import { getKeywordFeed, getSearchFeed, getTopKeywords } from '@/helpers/api'
import { unSlugifyKeyword } from '@/helpers/utils';

export async function generateMetadata(
  { params }: { params: { query: string } }
): Promise<Metadata> {

  const query = unSlugifyKeyword(params.query)

  return {
    title: `${query} Latest News, Stories, Videos | InFold`,
    description: `Get latest news, stories, and articles about ${query} all in one place.`
  }
}

export default async function Search({ params }: { params: { query: string } }) {
  let res: any = null
  
  const query = unSlugifyKeyword(params.query)

  if (query)
    res = await getSearchFeed(query)

  const topKeywords = await getTopKeywords()
  const totalResults = res?.meta?.total_results || 0

  return (
    <Wrapper initialFeedData={res?.data} topKeywords={topKeywords} totalResults={totalResults} />
  )
}