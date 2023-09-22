import Wrapper from '@/components/wrapper'

import config from '@/config'

import { getFeed, getTopKeywords } from '@/helpers/api'

export default async function Top({ params }: { params: { bucket: string } }) {
  const res: any = await getFeed('top', config.api.defaultLimit, params.bucket)
  const topKeywords = await getTopKeywords(params.bucket)
  const totalResults = res?.meta?.total_results || 0

  return (
    <Wrapper initialFeedData={res?.data} topKeywords={topKeywords} totalResults={totalResults} />
  )
}