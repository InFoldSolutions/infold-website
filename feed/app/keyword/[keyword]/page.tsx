import Wrapper from '@/components/wrapper'

import { getSearchFeed, getTopKeywords } from '@/helpers/api'

export default async function Keyword({ params }: { params: { keyword: string } }) {
  let res: any = null

  if (params.keyword)
    res = await getSearchFeed(decodeURIComponent(params.keyword).split(','))

  const topKeywords = await getTopKeywords('week')
  const totalResults = res?.meta?.total_results || 0

  return (
    <Wrapper initialFeedData={res?.data} topKeywords={topKeywords} totalResults={totalResults} />
  )
}