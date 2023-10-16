import { Metadata } from 'next';
import Wrapper from '@/components/layout/wrapper'

import config from '@/config'

import { getFeed, getTopKeywords } from '@/helpers/api'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Top Rising Stories | InFold`,
    description: `Get latest news, stories, and articles all in one place.`
  }
}

export default async function Rising() {
  const res: any = await getFeed('top', config.api.defaultLimit, 'month')
  const topKeywords = await getTopKeywords('month')
  const totalResults = res?.meta?.total_results || 0

  return (
    <Wrapper initialFeedData={res?.data} topKeywords={topKeywords} totalResults={totalResults} />
  )
}