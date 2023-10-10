import { Metadata } from 'next';
import Wrapper from '@/components/layout/wrapper'

import config from '@/config'

import { getFeed, getTopKeywords } from '@/helpers/api'

export async function generateMetadata(
  { params }: { params: { bucket: string } }
): Promise<Metadata> {

  const bucket = decodeURIComponent(params.bucket)

  let topListName = ''

  switch (bucket) {
    case 'hour':
      topListName = 'Hourly'
      break
    case 'day':
      topListName = 'Daily'
      break
    case 'week':
      topListName = 'Weekly'
      break
    case 'month':
      topListName = 'Monthly'
      break
    case 'year':
      topListName = 'Yearly'
      break
    default:
      topListName = 'Weekly'
      break
  }

  return {
    title: `Top ${topListName} Stories | InFold`,
    description: `Get latest news, stories, and articles all in one place.`
  }
}

export default async function Top({ params }: { params: { bucket: string } }) {
  const res: any = await getFeed('top', config.api.defaultLimit, params.bucket)
  const topKeywords = await getTopKeywords(params.bucket)
  const totalResults = res?.meta?.total_results || 0

  return (
    <Wrapper initialFeedData={res?.data} topKeywords={topKeywords} totalResults={totalResults} />
  )
}