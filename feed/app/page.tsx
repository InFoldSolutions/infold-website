import Wrapper from '@/components/wrapper'

import config from '@/config'

import { getFeed, getSearchFeed, getTopKeywords } from '@/helpers/api'

export default async function Home({ params, searchParams }: { params: any, searchParams: any }) {
  const keywords = searchParams ? searchParams.keywords : ''
  const endpoint = searchParams.sort || 'top'
  const bucket = searchParams.time || 'week'

  let data = null

  if (keywords)
    data = await getSearchFeed(keywords.split(','))
  else
    data = await getFeed(endpoint, config.api.defaultLimit, bucket)

  const topKeywords = await getTopKeywords(bucket)

  return (
    <Wrapper initialFeedData={data} topKeywords={topKeywords} />
  )
}