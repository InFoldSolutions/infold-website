import { Metadata } from 'next';

import Wrapper from '@/components/layout/wrapper'

import { getSectionFeed, getTopKeywords } from '@/helpers/api'
import { unSlugifyKeyword } from '@/helpers/utils';

import config from '@/config';

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
  
  const section = unSlugifyKeyword(params.section)

  if (section)
    res = await getSectionFeed(config.api.defaultBucket, section)

  const totalResults = res?.meta?.total_results || 0

  return (
    <Wrapper initialFeedData={res?.data} totalResults={totalResults} />
  )
}