import { Metadata } from 'next';
import Wrapper from '@/components/wrapper'

import config from '@/config'

import { getFeed, getTopKeywords } from '@/helpers/api'

export async function generateMetadata(
  { params }: { params: { keyword: string } }
): Promise<Metadata> {

  const keyword = decodeURIComponent(params.keyword)

  return {
    title: `Top Rising Stories | InFold`,
    description: `Get latest news, stories, and articles about ${keyword} all in one place.`
  }
}

export default async function Rising() {
  const res: any = await getFeed('rising', config.api.defaultLimit)
  const topKeywords = await getTopKeywords('week')
  const totalResults = res?.meta?.total_results || 0

  return (
    <Wrapper initialFeedData={res?.data} topKeywords={topKeywords} totalResults={totalResults} />
  )
}