import Wrapper from '@/components/wrapper'

import { getFeed, getSearchFeed, getTopKeywords } from '@/helpers/api'

export default async function Home({ params, searchParams }: { params: any, searchParams: any }) {
  const keywords = searchParams ? searchParams.keywords : ''

  let res: any = null

  if (keywords)
    res = await getSearchFeed(keywords.split(','))
  /*else if (endpoint)
    res = await getFeed(endpoint, config.api.defaultLimit, bucket)*/

  const topKeywords = await getTopKeywords('week')
  const totalResults = res?.meta?.total_results || 0

  return (
    <Wrapper initialFeedData={res?.data} topKeywords={topKeywords} totalResults={totalResults} />
  )
}