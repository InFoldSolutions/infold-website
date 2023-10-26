
import { permanentRedirect } from 'next/navigation'
import { Metadata } from 'next'

import Wrapper from '@/components/layout/wrapper'

import { slugifyKeyword } from '@/helpers/utils'
import { getTopFeed, getTopKeywords } from '@/helpers/api'

export async function generateMetadata(
  { params }: { params: { section: string } }
): Promise<Metadata> {

  return {
    title: `Top Rising Stories | InFold`,
    description: 'News is broken and driven by different agendas. We\'re here to help you get context, delve deeper, and learn more.'
  }
}

export default async function Home({ searchParams }: { searchParams: any }) {

  if (searchParams.keywords)
    permanentRedirect(`/keyword/${slugifyKeyword(decodeURIComponent(searchParams.keywords))}`)

  const res: any = await getTopFeed()
  const topKeywords = await getTopKeywords()
  const totalResults = res?.meta?.total_results || 0

  return (
    <Wrapper initialFeedData={res?.data} topKeywords={topKeywords} totalResults={totalResults} />
  )
}